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
import { useSelectedVehicle } from "@/lib/vehicle-store";

export const Route = createFileRoute("/yakit")({
  head: () => ({
    meta: [
      { title: "Yakıt & Maliyet — Km Başı Tüketim Hesaplama" },
      { name: "description", content: "Aracınızın km başına yakıt maliyetini ve ortalama tüketimini ücretsiz hesaplayın." },
      { property: "og:title", content: "Yakıt & Maliyet | Oto Rehberim" },
      { property: "og:description", content: "Yakıt tüketimi ve km başı maliyet hesaplayıcı." },
      { property: "og:image", content: "https://otorehberim.lovable.app/og-image.svg" },
      { property: "og:url", content: "/yakit" },
      { name: "twitter:image", content: "https://otorehberim.lovable.app/og-image.svg" },
    ],
    links: [{ rel: "canonical", href: "/yakit" }],
  }),
  component: YakitPage,
});

function YakitPage() {
  const { vehicle } = useSelectedVehicle();
  const [fuel, setFuel] = useState(vehicle?.fuel ?? "Benzin");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [km, setKm] = useState("");

  const liters = Number(amount) || 0;
  const totalCost = Number(price) || 0;
  const distance = Number(km) || 0;
  const consumption = distance > 0 ? (liters / distance) * 100 : 0;
  const costPerKm = distance > 0 ? totalCost / distance : 0;

  return (
    <PageLayout
      title="Yakıt & Maliyet"
      subtitle="Ortalama tüketim ve km başına maliyet için pratik hesap."
    >
      <div className="grid gap-6">
        <section className="panel-surface p-5">
          <h2 className="mb-4 text-base font-semibold">Yakıt Tüketimi / Km Başı Maliyet</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label>Yakıt tipi</Label>
              <Select value={fuel} onValueChange={setFuel}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Benzin", "Dizel", "LPG", "Hibrit", "Elektrik"].map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="lit">Litre (veya kWh)</Label>
              <Input id="lit" type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="ör. 45" />
            </div>
            <div>
              <Label htmlFor="pr">Toplam ödeme (TL)</Label>
              <Input id="pr" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="ör. 2350" />
            </div>
            <div>
              <Label htmlFor="km">Kat edilen km</Label>
              <Input id="km" type="number" value={km} onChange={(e) => setKm(e.target.value)} placeholder="ör. 520" />
            </div>
          </div>

          {distance > 0 && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border/70 bg-background/40 p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Ortalama tüketim</div>
                <div className="mt-1 text-2xl font-bold text-primary">
                  {consumption.toFixed(2)} {fuel === "Elektrik" ? "kWh/100km" : "L/100km"}
                </div>
              </div>
              <div className="rounded-lg border border-border/70 bg-background/40 p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Km başı maliyet</div>
                <div className="mt-1 text-2xl font-bold text-primary">{costPerKm.toFixed(2)} TL/km</div>
              </div>
            </div>
          )}

          <RelatedTools items={[
            { to: "/lastik-teknik", label: "Basınç tüketimi düşürür → Lastik Teknik" },
            { to: "/", label: "Yağ değişimi tüketime etki eder → Bilgi Merkezi" },
          ]} />
        </section>

        <LitreGalon />

        <ToolDescription
          title="Hesaplama İpuçları"
          items={[
            "Ortalama tüketim, farklı sürüş koşullarında (şehir/otoyol) değişir; birkaç depo ortalaması daha gerçekçi sonuç verir.",
            "Km başı maliyet, sürüş bütçenizin en kolay takip edilen kalemidir.",
            "Elektrikli araçlarda 'Litre' yerine 'kWh' girin; formül aynı şekilde çalışır.",
            "Doğru sonuç için depoyu her seferinde aynı seviyede (örn. tam dolu) doldurun.",
          ]}
        />
      </div>
    </PageLayout>
  );
}

function LitreGalon() {
  const [litre, setLitre] = useState("");
  const [galon, setGalon] = useState("");
  const L_TO_GAL = 0.264172;

  return (
    <section className="panel-surface p-5">
      <h2 className="mb-4 text-base font-semibold">Litre ↔ Galon Çevirici (ABD)</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label>Litre</Label>
          <Input type="number" step="0.01" value={litre}
            onChange={(e) => {
              setLitre(e.target.value);
              setGalon(e.target.value ? (Number(e.target.value) * L_TO_GAL).toFixed(4) : "");
            }} placeholder="0" />
        </div>
        <div>
          <Label>Galon (ABD)</Label>
          <Input type="number" step="0.01" value={galon}
            onChange={(e) => {
              setGalon(e.target.value);
              setLitre(e.target.value ? (Number(e.target.value) / L_TO_GAL).toFixed(4) : "");
            }} placeholder="0" />
        </div>
      </div>
    </section>
  );
}
