import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { ToolDescription } from "@/components/ToolDescription";
import { RelatedTools } from "@/components/RelatedTools";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const OG = "https://otorehberim.lovable.app/og-image.svg";

export const Route = createFileRoute("/resmi-islemler")({
  head: () => ({
    meta: [
      { title: "Resmi İşlemler — Muayene, Ceza Puanı, Hasarsızlık" },
      { name: "description", content: "Muayene ve sigorta hatırlatıcı, trafik cezası puan takibi ve hasarsızlık kademe hesaplayıcı." },
      { property: "og:title", content: "Resmi İşlemler | Oto Rehberim" },
      { property: "og:description", content: "Muayene, sigorta, ceza puanı ve hasarsızlık." },
      { property: "og:url", content: "/resmi-islemler" },
      { property: "og:image", content: OG },
      { name: "twitter:image", content: OG },
    ],
    links: [{ rel: "canonical", href: "/resmi-islemler" }],
  }),
  component: ResmiPage,
});

function ResmiPage() {
  return (
    <PageLayout title="Resmi İşlemler & Hatırlatıcılar" subtitle="Muayene, sigorta, ceza puanı ve hasarsızlık" showInArticleAd>
      <div className="grid gap-6">
        <ExpiryReminder />
        <PenaltyPoints />
        <NoClaimDiscount />
        <ToolDescription
          title="Önemli Notlar"
          items={[
            "Trafik cezası puan sınırları ve muayene kuralları zamanla değişebilir; kesin bilgi için Emniyet/TÜVTÜRK gibi resmi kaynakları doğrulayın.",
            "Bu hesaplamalar tahmini bilgi amaçlıdır ve resmi belge yerine geçmez.",
            "Hasarsızlık indirimi kademesi sigorta şirketine göre değişebilir; teklif almadan kesin oranı öğrenemezsiniz.",
          ]}
        />
      </div>
    </PageLayout>
  );
}

function CountdownBadge({ days, label }: { days: number; label: string }) {
  const color =
    days < 0 ? "border-red-500 bg-red-500/10 text-red-300" :
    days <= 7 ? "border-red-500 bg-red-500/10 text-red-300" :
    days <= 30 ? "border-yellow-500 bg-yellow-500/10 text-yellow-300" :
    "border-emerald-500 bg-emerald-500/10 text-emerald-300";
  const text = days < 0 ? `${Math.abs(days)} gün geçmiş` : `${days} gün kaldı`;
  return (
    <div className={cn("rounded-lg border p-3 text-center", color)}>
      <div className="text-[11px] uppercase tracking-wider opacity-80">{label}</div>
      <div className="mt-1 text-lg font-bold">{text}</div>
    </div>
  );
}

function ExpiryReminder() {
  const [muayene, setM] = useState("");
  const [trafik, setT] = useState("");
  const [kasko, setK] = useState("");

  const days = (d: string) => {
    if (!d) return null;
    const diff = Math.round((new Date(d).getTime() - Date.now()) / 86400000);
    return diff;
  };

  return (
    <section className="panel-surface p-5">
      <h2 className="mb-4 text-base font-semibold">Muayene & Sigorta Bitiş Hatırlatıcı</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <div><Label>Muayene bitiş</Label><Input type="date" value={muayene} onChange={(e) => setM(e.target.value)} /></div>
        <div><Label>Trafik sigortası bitiş</Label><Input type="date" value={trafik} onChange={(e) => setT(e.target.value)} /></div>
        <div><Label>Kasko bitiş</Label><Input type="date" value={kasko} onChange={(e) => setK(e.target.value)} /></div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {days(muayene) !== null && <CountdownBadge days={days(muayene)!} label="Muayene" />}
        {days(trafik)  !== null && <CountdownBadge days={days(trafik)!}  label="Trafik Sigortası" />}
        {days(kasko)   !== null && <CountdownBadge days={days(kasko)!}   label="Kasko" />}
      </div>
      <RelatedTools items={[{ to: "/plaka", label: "Plaka il kodunu kontrol et" }]} />
    </section>
  );
}

const PENALTY_LIMIT = 100;
const OPTIONS = [
  { label: "Hız sınırı %10-30 aşımı", points: 10 },
  { label: "Hız sınırı %30-50 aşımı", points: 15 },
  { label: "Hız sınırı %50+ aşımı",   points: 20 },
  { label: "Kırmızı ışıkta geçmek",   points: 20 },
  { label: "Emniyet kemeri takmamak", points: 10 },
  { label: "Cep telefonu kullanmak",  points: 15 },
  { label: "Hatalı sollama",          points: 20 },
  { label: "Alkollü araç kullanma (1. kez)", points: 20 },
];

function PenaltyPoints() {
  const [items, setItems] = useState<number[]>([]);
  const [manual, setManual] = useState("");
  const total = items.reduce((s, x) => s + x, 0) + (Number(manual) || 0);
  const remaining = Math.max(0, PENALTY_LIMIT - total);
  const risk = total >= PENALTY_LIMIT ? "riskli" : total >= 70 ? "orta" : "iyi";
  const riskColor = { iyi: "text-emerald-400", orta: "text-yellow-400", riskli: "text-red-400" }[risk];

  return (
    <section className="panel-surface p-5">
      <h2 className="mb-1 text-base font-semibold">Trafik Cezası Puan / Ehliyet Riski</h2>
      <p className="mb-4 text-xs text-muted-foreground">
        Genel referans: 1 yıl içinde 100 puana ulaşan sürücülerin ehliyeti 2 ay geri alınır. Değerler değişebilir, resmi kaynağı teyit edin.
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {OPTIONS.map((o, i) => (
          <button
            key={i}
            onClick={() => setItems((prev) => [...prev, o.points])}
            className="rounded-full border border-border bg-panel/70 px-3 py-1 text-xs hover:border-primary/60"
          >
            + {o.label} ({o.points}p)
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="manual">Elle ek puan gir</Label>
          <Input id="manual" type="number" value={manual} onChange={(e) => setManual(e.target.value)} placeholder="0" />
        </div>
        <div className="flex items-end">
          <button
            onClick={() => { setItems([]); setManual(""); }}
            className="rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
          >Sıfırla</button>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-border/70 bg-background/40 p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            Toplam puan: <span className="text-foreground font-bold">{total}</span> / {PENALTY_LIMIT}
          </div>
          <div className={cn("font-semibold", riskColor)}>
            Kalan: {remaining}p · Durum: {risk}
          </div>
        </div>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full transition-all", total >= PENALTY_LIMIT ? "bg-red-500" : total >= 70 ? "bg-yellow-500" : "bg-emerald-500")}
            style={{ width: `${Math.min(100, (total / PENALTY_LIMIT) * 100)}%` }}
          />
        </div>
        {items.length > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">Eklenen ihlaller: {items.length}</p>
        )}
      </div>
      <RelatedTools items={[{ to: "/ariza", label: "Sürüş güvenliği için Arıza Rehberi'ni incele" }]} />
    </section>
  );
}

function NoClaimDiscount() {
  const [years, setYears] = useState("");
  const [accidents, setAccidents] = useState("");
  const y = Number(years) || 0;
  const a = Number(accidents) || 0;
  // Basitleştirilmiş kademe: her hasarsız yıl +1 basamak, her kaza -1 basamak, min 0 max 4
  const kademe = Math.min(4, Math.max(0, y - a));
  const rates = [0, 30, 40, 50, 60];
  const rate = rates[kademe];

  return (
    <section className="panel-surface p-5">
      <h2 className="mb-4 text-base font-semibold">Hasarsızlık İndirimi (Kademe) Hesaplayıcı</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div><Label>Hasarsız kullanım (yıl)</Label><Input type="number" min={0} value={years} onChange={(e) => setYears(e.target.value)} /></div>
        <div><Label>Yıl içindeki kaza sayısı</Label><Input type="number" min={0} value={accidents} onChange={(e) => setAccidents(e.target.value)} /></div>
      </div>

      {(years || accidents) && (
        <div className="mt-5 rounded-lg border border-border/70 bg-background/40 p-4">
          <div className="text-sm text-muted-foreground">Tahmini kademe: <span className="text-foreground font-bold">{kademe}. basamak</span></div>
          <div className="mt-1 text-2xl font-bold text-primary">%{rate} indirim</div>
          <p className="mt-2 text-xs text-yellow-300">
            Bu hesaplama tahmini bilgi amaçlıdır; kesin oran sigorta şirketine göre değişebilir.
          </p>
        </div>
      )}
      <RelatedTools items={[{ to: "/resmi-islemler", label: "Sigorta bitiş tarihini yukarıdaki hatırlatıcıya ekleyin" }]} />
    </section>
  );
}
