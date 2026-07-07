import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { ToolDescription } from "@/components/ToolDescription";
import { RelatedTools } from "@/components/RelatedTools";
import { Input } from "@/components/ui/input";
import { OBD_CODES, DASH_LIGHTS, type Severity } from "@/data/dashData";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

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

const SEVERITY_STYLES: Record<Severity, { border: string; bg: string; label: string; badge: string }> = {
  acil:     { border: "border-red-500/60",    bg: "bg-red-500/5",    label: "🔴 Acil — Hemen Dur",    badge: "bg-red-500/20 text-red-300" },
  kontrol:  { border: "border-yellow-500/60", bg: "bg-yellow-500/5", label: "🟡 Yakında Kontrol Et", badge: "bg-yellow-500/20 text-yellow-300" },
  bilgi:    { border: "border-emerald-500/50",bg: "bg-emerald-500/5",label: "🟢 Bilgi Amaçlı",       badge: "bg-emerald-500/20 text-emerald-300" },
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
          <h2 className="mb-3 text-lg font-semibold">Gösterge Işıkları ({lights.length})</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {lights.map((l) => {
              const s = SEVERITY_STYLES[l.severity];
              return (
                <article key={l.key} className={cn("rounded-xl border p-4", s.border, s.bg)}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl leading-none" aria-hidden>{l.icon}</span>
                    <h3 className="text-sm font-semibold">{l.name}</h3>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{l.meaning}</p>
                  <p className="mt-2 text-xs"><strong className="text-foreground">Ne yapmalı: </strong>{l.action}</p>
                  <span className={cn("mt-3 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold", s.badge)}>{s.label}</span>
                </article>
              );
            })}
            {lights.length === 0 && (
              <p className="text-sm text-muted-foreground">Bu aramayla eşleşen gösterge ışığı bulunamadı.</p>
            )}
          </div>
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
