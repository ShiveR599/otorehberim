import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { ToolDescription } from "@/components/ToolDescription";
import { RelatedTools } from "@/components/RelatedTools";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/lastik-teknik")({
  head: () => ({
    meta: [
      { title: "Lastik Teknik | Ebat ve Basınç Rehberi | Oto Rehberim" },
      { name: "description", content: "Lastik ebadınıza göre önerilen basınç, PSI-Bar ve KM-Mil çevirici." },
      { property: "og:title", content: "Lastik Teknik | Oto Rehberim" },
      { property: "og:description", content: "Lastik basıncı, PSI–Bar, KM–Mil çevirici." },
      { property: "og:image", content: "/og-image.svg" },
      { property: "og:url", content: "/lastik-teknik" },
      { name: "twitter:image", content: "/og-image.svg" },
    ],
    links: [{ rel: "canonical", href: "/lastik-teknik" }],
  }),
  component: LastikPage,
});

const TIRE_SIZES = [
  "175/65 R14", "185/60 R14", "185/65 R15", "195/65 R15", "205/55 R16",
  "205/60 R16", "215/60 R16", "215/55 R17", "225/45 R17", "225/50 R17",
  "225/55 R18", "235/55 R18", "235/60 R18", "255/55 R19",
];

type Weight = "Küçük hatchback" | "Orta sedan / SUV" | "Büyük SUV / Ticari";
const PRESSURES: Record<Weight, { front: [number, number]; rear: [number, number] }> = {
  "Küçük hatchback": { front: [2.0, 2.2], rear: [2.0, 2.2] },
  "Orta sedan / SUV": { front: [2.2, 2.4], rear: [2.2, 2.5] },
  "Büyük SUV / Ticari": { front: [2.4, 2.7], rear: [2.6, 3.0] },
};

function LastikPage() {
  const [size, setSize] = useState<string>(TIRE_SIZES[3]);
  const [weight, setWeight] = useState<Weight>("Orta sedan / SUV");
  const p = PRESSURES[weight];

  return (
    <PageLayout
      title="Lastik Teknik"
      subtitle="Lastik ebadı, önerilen basınç ve pratik birim çeviriciler."
    >
      <div className="grid gap-6">
        <section className="panel-surface p-5">
          <h2 className="mb-4 text-base font-semibold">Lastik Ebadı / Basınç Hesaplayıcı</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>Lastik ebadı</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TIRE_SIZES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Araç kategorisi</Label>
              <Select value={weight} onValueChange={(v) => setWeight(v as Weight)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(PRESSURES) as Weight[]).map((w) => (
                    <SelectItem key={w} value={w}>{w}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <PressureCard label="Ön aks" bar={p.front} />
            <PressureCard label="Arka aks" bar={p.rear} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Değerler soğuk lastik ölçümüne göredir. Kesin değer için sürücü kapı çerçevesindeki üretici etiketini esas alın.
          </p>

          <RelatedTools items={[{ to: "/bakim", label: "Lastik ömrünü kontrol et" }]} />
        </section>

        <PsiBar />
        <KmMil />

        <ToolDescription
          title="Basınç ve Ebat Notları"
          items={[
            "Düşük basınç yakıt tüketimini artırır, yanal aşınmayı hızlandırır.",
            "Yüksek basınç merkez aşınmasına ve sert sürüş hissine neden olur.",
            "Uzun yol / dolu yükte tavsiye edilen basıncın üst sınırını kullanın.",
            "Ebat değişikliği hız göstergesi ve fren güvenliğini etkiler; üreticinin ± değerlerine sadık kalın.",
          ]}
        />
      </div>
    </PageLayout>
  );
}

function PressureCard({ label, bar }: { label: string; bar: [number, number] }) {
  const psi: [number, number] = [+(bar[0] * 14.5038).toFixed(1), +(bar[1] * 14.5038).toFixed(1)];
  return (
    <div className="rounded-lg border border-border/70 bg-background/40 p-4">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold text-primary">
        {bar[0]}–{bar[1]} bar
      </div>
      <div className="text-sm text-muted-foreground">≈ {psi[0]}–{psi[1]} PSI</div>
    </div>
  );
}

function PsiBar() {
  const [psi, setPsi] = useState("");
  const [bar, setBar] = useState("");
  return (
    <section className="panel-surface p-5">
      <h2 className="mb-4 text-base font-semibold">PSI ↔ Bar Çevirici</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label>PSI</Label>
          <Input type="number" step="0.1" value={psi}
            onChange={(e) => {
              setPsi(e.target.value);
              setBar(e.target.value ? (Number(e.target.value) / 14.5038).toFixed(3) : "");
            }} />
        </div>
        <div>
          <Label>Bar</Label>
          <Input type="number" step="0.01" value={bar}
            onChange={(e) => {
              setBar(e.target.value);
              setPsi(e.target.value ? (Number(e.target.value) * 14.5038).toFixed(2) : "");
            }} />
        </div>
      </div>
    </section>
  );
}

function KmMil() {
  const [km, setKm] = useState("");
  const [mil, setMil] = useState("");
  return (
    <section className="panel-surface p-5">
      <h2 className="mb-4 text-base font-semibold">KM ↔ Mil Çevirici</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label>Kilometre</Label>
          <Input type="number" step="0.01" value={km}
            onChange={(e) => {
              setKm(e.target.value);
              setMil(e.target.value ? (Number(e.target.value) * 0.621371).toFixed(3) : "");
            }} />
        </div>
        <div>
          <Label>Mil</Label>
          <Input type="number" step="0.01" value={mil}
            onChange={(e) => {
              setMil(e.target.value);
              setKm(e.target.value ? (Number(e.target.value) / 0.621371).toFixed(3) : "");
            }} />
        </div>
      </div>
    </section>
  );
}
