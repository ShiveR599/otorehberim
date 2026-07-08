import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { ToolDescription } from "@/components/ToolDescription";
import { RelatedTools } from "@/components/RelatedTools";
import { Input } from "@/components/ui/input";
import { OBD_CODES, DASH_LIGHTS, type Severity } from "@/data/dashData";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashLightIcon } from "@/components/DashLightIcon";

const OG = "https://otorehberim.lovable.app/og-image.svg";

export const Route = createFileRoute("/ariza")({
  head: () => ({
    meta: [
      { title: "Arıza Rehberi — OBD Kodları ve Gösterge Işıkları" },
      { name: "description", content: "OBD-II arıza kodu sözlüğü ve araç gösterge ışıkları anlamları. Ücretsiz Türkçe rehber." },
      { property: "og:title", content: "Arıza Rehberi | Oto Rehberim" },
      { property: "og:description", content: "OBD arıza kodları ve gösterge ışıkları rehberi." },
      { property: "og:url", content: "/ariza" },
      { property: "og:image", content: OG },
      { name: "twitter:image", content: OG },
    ],
    links: [{ rel: "canonical", href: "/ariza" }],
  }),
  component: ArizaPage,
});

const SEVERITY_STYLES: Record<Severity, { border: string; bg: string; label: string; badge: string; icon: string; ring: string }> = {
  acil:    { border: "border-red-500/60",     bg: "bg-red-500/5",     label: "🔴 Acil — Hemen Dur",    badge: "bg-red-500/20 text-red-300",       icon: "text-red-400",     ring: "ring-red-500/40" },
  kontrol: { border: "border-yellow-500/60",  bg: "bg-yellow-500/5",  label: "🟡 Yakında Kontrol Et", badge: "bg-yellow-500/20 text-yellow-300", icon: "text-yellow-300",  ring: "ring-yellow-500/40" },
  bilgi:   { border: "border-emerald-500/50", bg: "bg-emerald-500/5", label: "🟢 Bilgi Amaçlı",       badge: "bg-emerald-500/20 text-emerald-300", icon: "text-emerald-300", ring: "ring-emerald-500/40" },
};

const SEVERITY_ORDER: Severity[] = ["acil", "kontrol", "bilgi"];
const SEVERITY_HEADINGS: Record<Severity, string> = {
  acil: "🔴 Acil — Hemen Dur",
  kontrol: "🟡 Yakında Kontrol Et",
  bilgi: "🟢 Bilgi Amaçlı",
};

function ArizaPage() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const codes = useMemo(() => {
    if (!query) return OBD_CODES.slice(0, 30);
    return OBD_CODES.filter(
      (c) =>
        c.code.toLowerCase().includes(query) ||
        c.title.toLowerCase().includes(query) ||
        c.causes.some((x) => x.toLowerCase().includes(query)),
    );
  }, [query]);

  const lights = useMemo(() => {
    if (!query) return DASH_LIGHTS;
    return DASH_LIGHTS.filter(
      (l) =>
        l.name.toLowerCase().includes(query) ||
        l.aliases.some((a) => a.toLowerCase().includes(query)) ||
        l.meaning.toLowerCase().includes(query),
    );
  }, [query]);

  return (
    <PageLayout title="Arıza Rehberi" subtitle="OBD-II arıza kodları ve gösterge ışıkları" showInArticleAd>
      <div className="grid gap-6">
        <div className="panel-surface p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Kod (ör. P0300) veya kelime (ör. motor lambası, akü) ara…"
              className="pl-9"
              aria-label="Arıza rehberinde ara"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Arama sadece bu sekmedeki OBD kodları ve gösterge ışıkları verisinde çalışır.
          </p>
        </div>

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">Gösterge Işıkları ({lights.length})</h2>
            <p className="hidden text-xs text-muted-foreground sm:block">Detay için ışığın üzerine gelin veya dokunun.</p>
          </div>

          {lights.length === 0 && (
            <p className="text-sm text-muted-foreground">Bu aramayla eşleşen gösterge ışığı bulunamadı.</p>
          )}

          {SEVERITY_ORDER.map((sev) => {
            const group = lights.filter((l) => l.severity === sev);
            if (group.length === 0) return null;
            const s = SEVERITY_STYLES[sev];
            return (
              <div key={sev} className={cn("mb-5 rounded-2xl border p-4", s.border, s.bg)}>
                <div className="mb-3 flex items-center gap-2">
                  <span className={cn("inline-block rounded-full px-2.5 py-1 text-xs font-bold", s.badge)}>{SEVERITY_HEADINGS[sev]}</span>
                  <span className="text-xs text-muted-foreground">({group.length})</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {group.map((l) => (
                    <details
                      key={l.key}
                      className={cn(
                        "group rounded-xl border border-black/60 bg-neutral-950 p-3 shadow-inner transition hover:ring-2",
                        s.ring,
                      )}
                    >
                      <summary className="flex cursor-pointer list-none flex-col items-center gap-2 text-center [&::-webkit-details-marker]:hidden">
                        <div className={cn("grid h-14 w-14 place-items-center rounded-full bg-black/70 ring-1 ring-white/10", s.icon)}>
                          <DashLightIcon name={l.key} />
                        </div>
                        <span className="text-[11px] font-medium leading-tight text-foreground/90">{l.name}</span>
                      </summary>
                      <div className="mt-3 space-y-1 border-t border-white/5 pt-2 text-left text-[11px] text-muted-foreground">
                        <p>{l.meaning}</p>
                        <p><strong className="text-foreground">Ne yapmalı: </strong>{l.action}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </section>


        <section>
          <h2 className="mb-3 text-lg font-semibold">OBD-II Arıza Kodları {query && `(${codes.length})`}</h2>
          {!query && (
            <p className="mb-2 text-xs text-muted-foreground">
              İlk 30 kod gösteriliyor. Daha fazlası için arama yapın (toplam {OBD_CODES.length} kod).
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            {codes.map((c) => (
              <article key={c.code} className="panel-surface p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-mono text-base font-bold text-primary">{c.code}</h3>
                </div>
                <p className="mt-1 text-sm font-medium">{c.title}</p>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {c.causes.map((cause, i) => (
                    <li key={i} className="flex gap-2"><span className="text-primary">•</span>{cause}</li>
                  ))}
                </ul>
              </article>
            ))}
            {codes.length === 0 && (
              <p className="text-sm text-muted-foreground">Bu aramayla eşleşen OBD kodu bulunamadı.</p>
            )}
          </div>
        </section>

        <RelatedTools items={[
          { to: "/bakim", label: "Akü / lastik ömrü için Bakım'a git" },
          { to: "/resmi-islemler", label: "Muayene hatırlatıcısına git" },
        ]} />

        <ToolDescription
          title="Bu Sekme Nasıl Kullanılır?"
          items={[
            "OBD-II tarayıcı ile aracınızdan okuduğunuz kodu doğrudan arama kutusuna yazın.",
            "Motor arıza ışığı yandığında ilgili gösterge kartından aciliyet seviyesini kontrol edin.",
            "🔴 acil işaretli uyarılarda aracı güvenli yerde durdurup çekici çağırmayı düşünün.",
            "Bu bilgiler genel rehber niteliğindedir; kesin arıza tespiti için yetkili servise başvurun.",
          ]}
        />
      </div>
    </PageLayout>
  );
}
