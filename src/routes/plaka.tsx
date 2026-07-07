import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { ToolDescription } from "@/components/ToolDescription";
import { Input } from "@/components/ui/input";
import { PLATE_CODES, PLATE_ENTRIES } from "@/data/plateData";
import { MapPin } from "lucide-react";

const OG = "https://otorehberim.lovable.app/og-image.svg";

export const Route = createFileRoute("/plaka")({
  head: () => ({
    meta: [
      { title: "Plaka Sorgulama — Türkiye İl Kodu Rehberi (1-81)" },
      { name: "description", content: "Türkiye'nin 81 ilinin plaka kodunu iki yönlü sorgulayın: kod → il, il → kod." },
      { property: "og:title", content: "Plaka Sorgulama | Oto Rehberim" },
      { property: "og:description", content: "İl kodu ↔ il adı sorgulama." },
      { property: "og:url", content: "/plaka" },
      { property: "og:image", content: OG },
      { name: "twitter:image", content: OG },
    ],
    links: [{ rel: "canonical", href: "/plaka" }],
  }),
  component: PlakaPage,
});

function normalize(s: string) {
  return s.toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i").replaceAll("ş", "s").replaceAll("ç", "c")
    .replaceAll("ğ", "g").replaceAll("ö", "o").replaceAll("ü", "u");
}

function PlakaPage() {
  const [q, setQ] = useState("");
  const query = q.trim();

  const results = useMemo(() => {
    if (!query) return PLATE_ENTRIES;
    const n = Number(query);
    if (Number.isInteger(n) && n >= 1 && n <= 81) {
      return [{ code: n, city: PLATE_CODES[n] }];
    }
    const nq = normalize(query);
    return PLATE_ENTRIES.filter((e) => normalize(e.city).includes(nq));
  }, [query]);

  return (
    <PageLayout title="Plaka Sorgulama" subtitle="Türkiye il kodları (1-81) — iki yönlü arama" showInArticleAd>
      <div className="grid gap-6">
        <section className="panel-surface p-5">
          <label htmlFor="plate" className="text-sm font-medium">İl kodu veya il adı yazın</label>
          <div className="relative mt-2">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="plate"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ör: 34 veya İstanbul"
              className="pl-9"
              inputMode="text"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Sayı girerseniz o kodun ili, harf girerseniz eşleşen illerin kodu görüntülenir.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">
            Sonuçlar {query && `(${results.length})`}
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {results.map((e) => (
              <div
                key={e.code}
                className="panel-surface flex items-center gap-3 p-3"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/15 font-mono text-sm font-bold text-primary">
                  {String(e.code).padStart(2, "0")}
                </span>
                <span className="min-w-0 truncate text-sm font-medium">{e.city}</span>
              </div>
            ))}
            {results.length === 0 && (
              <p className="col-span-full text-sm text-muted-foreground">Eşleşen il bulunamadı.</p>
            )}
          </div>
        </section>

        <ToolDescription
          title="Kullanım İpuçları"
          items={[
            "Plaka kodunu bilmiyorsanız il adının bir kısmını yazın: 'anka' → Ankara.",
            "1-81 arası bir sayı girdiğinizde tam eşleşme sonucu görürsünüz.",
            "Türkçe karakter duyarlılığı yoktur; 'sanliurfa' araması Şanlıurfa'yı bulur.",
            "Bu liste resmî plaka kodlarına dayalıdır ancak değişiklikleri resmî kaynaklardan doğrulayın.",
          ]}
        />
      </div>
    </PageLayout>
  );
}
