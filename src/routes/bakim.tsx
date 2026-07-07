import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { ToolDescription } from "@/components/ToolDescription";
import { RelatedTools } from "@/components/RelatedTools";
import { StatusBar, BrandTags } from "@/components/StatusBar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, CalendarDays } from "lucide-react";

export const Route = createFileRoute("/bakim")({
  head: () => ({
    meta: [
      { title: "Bakım & Ömür Takibi | Lastik, Akü, Mevsimlik Rehber | Oto Rehberim" },
      { name: "description", content: "Lastik ömrü, akü ömrü ve kışlık/yazlık lastik değişim zamanını ücretsiz hesaplayın." },
      { property: "og:title", content: "Bakım & Ömür Takibi | Oto Rehberim" },
      { property: "og:description", content: "Lastik, akü ve mevsimlik lastik değişim rehberi." },
      { property: "og:image", content: "https://otorehberim.lovable.app/og-image.svg" },
      { property: "og:url", content: "/bakim" },
      { name: "twitter:image", content: "https://otorehberim.lovable.app/og-image.svg" },
    ],
    links: [{ rel: "canonical", href: "/bakim" }],
  }),
  component: BakimPage,
});

function BakimPage() {
  return (
    <PageLayout
      title="Bakım & Ömür Takibi"
      subtitle="Lastik, akü ve mevsimlik lastik değişimi için hızlı hesaplayıcılar."
    >
      <div className="grid gap-6">
        <TireLife />
        <BatteryLife />
        <SeasonReminder />
        <ToolDescription
          title="Neden Bu Ölçümler Önemli?"
          items={[
            "Lastik diş derinliği yasal sınıra (1.6 mm) yaklaştıkça kaza riski ciddi biçimde artar.",
            "5–6 yılını dolduran lastikler kauçuk sertleşmesi nedeniyle sürüş güvenliğini düşürür.",
            "Aküler ortalama 3–5 yıl arasında görev yapar; soğuk havada zayıflık ilk belirtidir.",
            "Kış lastiği kullanımı, +7 °C altı sıcaklıklarda frenleme mesafesini belirgin şekilde kısaltır.",
          ]}
        />
      </div>
    </PageLayout>
  );
}

function TireLife() {
  const [depth, setDepth] = useState("");
  const [year, setYear] = useState("");
  const d = Number(depth);
  const y = Number(year);
  const now = new Date().getFullYear();
  const age = y ? now - y : 0;

  const depthPct = depth ? Math.max(0, Math.min(100, ((d - 1.6) / (8 - 1.6)) * 100)) : 0;
  const agePct = year ? Math.max(0, 100 - (age / 6) * 100) : 0;
  const health = Math.min(depthPct || 100, agePct || 100);

  let warning = "";
  if (depth && d <= 3) warning = "Diş derinliği kritik seviyeye yaklaşıyor. Yakında değişim planlayın.";
  if (depth && d <= 1.6) warning = "Yasal sınır! Lastikleri en kısa sürede değiştirin.";
  if (year && age >= 6) warning = "Lastik yaşı 6 yılı aştı. Kauçuk sertleşmesi riski var, değişim önerilir.";
  else if (year && age >= 5) warning = "Lastik yaşı 5 yılı geçti; yakın zamanda değişim planlayın.";

  return (
    <section className="panel-surface p-5">
      <h2 className="mb-4 text-base font-semibold">Lastik Ömrü Hesaplayıcı</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="depth">Diş derinliği (mm)</Label>
          <Input id="depth" type="number" step="0.1" value={depth} onChange={(e) => setDepth(e.target.value)} placeholder="ör. 4.2" />
        </div>
        <div>
          <Label htmlFor="year">Üretim yılı</Label>
          <Input id="year" type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="ör. 2021" />
        </div>
      </div>

      {(depth || year) && (
        <div className="mt-5 rounded-lg border border-border/70 bg-background/40 p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
            <div className="text-muted-foreground">
              Diş: <span className="text-foreground font-medium">{depth || "?"} mm</span>
              {" · "}Yaş: <span className="text-foreground font-medium">{year ? `${age} yıl` : "?"}</span>
            </div>
            <div className="font-semibold text-primary">Sağlık: %{Math.round(health)}</div>
          </div>
          <StatusBar value={health} className="mt-3" />
          {warning && (
            <p className="mt-3 flex items-start gap-2 text-sm text-yellow-300">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {warning}
            </p>
          )}
          <BrandTags
            premium={["Michelin", "Continental", "Bridgestone"]}
            economy={["Lassa", "Petlas", "Kumho"]}
          />
        </div>
      )}
      <RelatedTools items={[{ to: "/lastik-teknik", label: "Basınç kontrolü için Lastik Teknik'e git" }]} />
    </section>
  );
}

function BatteryLife() {
  const [year, setYear] = useState("");
  const [amp, setAmp] = useState("");
  const now = new Date().getFullYear();
  const age = year ? now - Number(year) : 0;
  const health = year ? Math.max(0, 100 - (age / 5) * 100) : 0;

  let note = "";
  if (year && age >= 5) note = "Akü ömrünün sonuna yaklaştı; soğuk sabahlarda zayıflama olası.";
  else if (year && age >= 3) note = "Ömrün orta-son safhası. Şarj/voltaj testi yaptırmayı düşünün.";
  else if (year) note = "Akü sağlıklı sayılabilir. Bağlantı temizliği ve seviye kontrolü yeterli.";

  return (
    <section className="panel-surface p-5">
      <h2 className="mb-4 text-base font-semibold">Akü Ömrü / Kapasite Hesaplayıcı</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="byear">Akü üretim/kullanım yılı</Label>
          <Input id="byear" type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="ör. 2022" />
        </div>
        <div>
          <Label htmlFor="amp">Amper (Ah)</Label>
          <Input id="amp" type="number" value={amp} onChange={(e) => setAmp(e.target.value)} placeholder="ör. 60" />
        </div>
      </div>
      {year && (
        <div className="mt-5 rounded-lg border border-border/70 bg-background/40 p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
            <div className="text-muted-foreground">
              Yaş: <span className="text-foreground font-medium">{age} yıl</span>
              {amp && <> · <span className="text-foreground font-medium">{amp} Ah</span></>}
            </div>
            <div className="font-semibold text-primary">Kalan ömür: %{Math.round(health)}</div>
          </div>
          <StatusBar value={health} className="mt-3" />
          {note && <p className="mt-3 text-sm text-muted-foreground">{note}</p>}
          <BrandTags premium={["Bosch", "Varta"]} economy={["Mutlu", "İnci"]} />
        </div>
      )}
      <RelatedTools items={[{ to: "/", label: "Motor yağı değişimi için Bilgi Merkezi'ne git" }]} />
    </section>
  );
}

function SeasonReminder() {
  const [when, setWhen] = useState("");
  let msg = "";
  if (when) {
    const d = new Date(when);
    const m = d.getMonth() + 1;
    if (m >= 11 || m <= 3) {
      msg = "Bu tarih kışlık lastik dönemidir (Kasım–Mart). Kışlık lastiklerinizi taktırdığınıza emin olun.";
    } else if (m >= 4 && m <= 10) {
      msg = "Bu tarih yazlık lastik dönemidir (Nisan–Ekim). Yazlık lastiklerinizi taktırdığınıza emin olun.";
    }
  }
  return (
    <section className="panel-surface p-5">
      <h2 className="mb-4 flex items-center gap-2 text-base font-semibold">
        <CalendarDays className="h-4 w-4 text-primary" /> Kışlık – Yazlık Lastik Hatırlatıcı
      </h2>
      <div className="max-w-sm">
        <Label htmlFor="sw">Tarih</Label>
        <Input id="sw" type="date" value={when} onChange={(e) => setWhen(e.target.value)} />
      </div>
      {msg && (
        <p className="mt-4 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm text-foreground">
          {msg}
        </p>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Türkiye iklim koşulları rehberi: Kışlık Kasım–Mart, Yazlık Nisan–Ekim.
      </p>
    </section>
  );
}
