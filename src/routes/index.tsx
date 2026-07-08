import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { VehicleSelector } from "@/components/VehicleSelector";
import { ToolDescription } from "@/components/ToolDescription";
import { RelatedTools } from "@/components/RelatedTools";
import { StatusBar, BrandTags } from "@/components/StatusBar";
import { useSelectedVehicle } from "@/lib/vehicle-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Araç Bilgi Merkezi — Motor Yaşı ve Yağ Değişimi" },
      { name: "description", content: "Motor tipine göre bakım rehberi ve motor yağı değişim zamanı hesaplayıcısı. Ücretsiz, kayıt yok." },
      { property: "og:title", content: "Araç Bilgi Merkezi | Oto Rehberim" },
      { property: "og:description", content: "Motor yaşı uygunluğu ve motor yağı değişim hesaplayıcısı." },
      { property: "og:image", content: "https://otorehberim.lovable.app/og-image.svg" },
      { property: "og:url", content: "/" },
      { name: "twitter:image", content: "https://otorehberim.lovable.app/og-image.svg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function motorGeneralNote(fuel: string, aspiration: string, displacement: number) {
  if (fuel === "Elektrik") {
    return "Elektrikli araçlarda geleneksel motor yağı bakımı yoktur. Kritik bakım kalemleri: batarya sağlığı, redüktör yağı ve fren hidroliği. Uzun ömürlü kullanımda düzenli batarya kalibrasyonu önerilir.";
  }
  if (fuel === "Dizel" && aspiration === "Turbo") {
    return "Turbo dizel motorlar (özellikle 1.3–2.0 L aralığı) düzenli bakım ile 300.000 km üzeri kullanıma uygundur. DPF/EGR temizliği ve kaliteli dizel yakıt önemlidir. Sık şehir içi kullanımda kısa yol/soğuk çalıştırma bu motorların ömrünü kısaltır.";
  }
  if (fuel === "Benzin" && aspiration === "Turbo") {
    return `${displacement} L turbo benzinli motorlar performans/ekonomi dengesi sunar; ancak yüksek sıcaklıkta çalıştıkları için yüksek kaliteli tam sentetik yağ ve zamanında yağ değişimi kritiktir. Bu motor grubu genelde 200.000 km üzeri sağlıklı kullanıma uygundur.`;
  }
  if (fuel === "Benzin" && aspiration === "Atmosferik") {
    return "Atmosferik benzinli motorlar sağlamlıkları ile bilinir; düşük bakım maliyeti ve 300.000 km üzeri düşük arıza oranı yaygındır. Uzun aralıklı yağ değişimine daha toleranslıdır.";
  }
  if (fuel === "Hibrit") {
    return "Hibrit sistemlerde içten yanmalı motor daha az yük altındadır; motor ömrü uzun olur. Yüksek voltaj batarya sağlığı ve invertör soğutma sıvısı düzenli kontrol edilmelidir.";
  }
  if (fuel === "LPG") {
    return "LPG'li araçlarda supap yanması riskine karşı düzenli supap ayarı ve daha kısa aralıklı yağ değişimi önemlidir.";
  }
  return "Bu motor grubu için düzenli servis ve üretici bakım aralıklarına uyum önerilir.";
}

function recommendedOilKm(fuel: string, aspiration: string) {
  if (fuel === "Dizel" && aspiration === "Turbo") return 10000;
  if (fuel === "Benzin" && aspiration === "Turbo") return 10000;
  if (fuel === "Benzin" && aspiration === "Atmosferik") return 15000;
  if (fuel === "Hibrit") return 12000;
  if (fuel === "LPG") return 7500;
  return 12000;
}

interface OilSpec {
  viscosity: string;
  standards: string;
  note: string;
}

function recommendedOilSpec(fuel: string, aspiration: string, year?: number): OilSpec {
  const modern = (year ?? 0) >= 2018;
  if (fuel === "Hibrit") {
    return {
      viscosity: "0W-20 (bazı modellerde 0W-16)",
      standards: "API SP · ILSAC GF-6",
      note: "Hibrit motorlar düşük sürtünmeli ince viskozite ile tasarlanır; kalın yağ kullanmak yakıt tüketimini artırır.",
    };
  }
  if (fuel === "Dizel" && aspiration === "Turbo") {
    return {
      viscosity: modern ? "5W-30 (DPF'li araçlarda düşük SAPS)" : "5W-40",
      standards: "ACEA C2 / C3 · API CK-4 veya üstü",
      note: "DPF'li dizellerde mutlaka 'low SAPS' (düşük kül) etiketli C2/C3 yağ tercih edin, aksi halde filtre tıkanır.",
    };
  }
  if (fuel === "Benzin" && aspiration === "Turbo") {
    return {
      viscosity: modern ? "0W-20 veya 5W-30" : "5W-30 / 5W-40",
      standards: "API SN / SP · ACEA C3",
      note: "Turbo benzinlilerde LSPI (ön ateşleme) korumalı, API SP damgalı tam sentetik yağ tercih edin.",
    };
  }
  if (fuel === "Benzin" && aspiration === "Atmosferik") {
    return {
      viscosity: modern ? "5W-30" : "10W-40 (yüksek km ise 10W-40/15W-40)",
      standards: "API SN / SP · ACEA A3/B4",
      note: "200.000 km üstü atmosferik motorlarda 10W-40 daha iyi film oluşturur; sızıntı varsa 15W-40 düşünülebilir.",
    };
  }
  if (fuel === "LPG") {
    return {
      viscosity: "10W-40 (yarı sentetik)",
      standards: "API SN · ACEA A3/B4 · LPG uyumlu",
      note: "LPG yakıt yağı daha çok ısıtır; kalın viskozite ve daha kısa değişim aralığı (7.500 km) önerilir.",
    };
  }
  if (fuel === "Elektrik") {
    return {
      viscosity: "Motor yağı yok — redüktör yağı 75W-85 civarı",
      standards: "Üretici özel spesifikasyonu",
      note: "Elektrikli araçlarda geleneksel yağ değişimi yoktur; sadece redüktör/şanzıman yağı üretici aralığında değişir.",
    };
  }
  return {
    viscosity: "5W-30 (genel öneri)",
    standards: "API SN veya üstü",
    note: "Aracınızın kullanım kılavuzundaki spesifik viskoziteyi mutlaka kontrol edin.",
  };
}


function HomePage() {
  const { vehicle } = useSelectedVehicle();
  const [lastKm, setLastKm] = useState("");
  const [currentKm, setCurrentKm] = useState("");
  const [lastDate, setLastDate] = useState("");

  const recKm = vehicle ? recommendedOilKm(vehicle.fuel, vehicle.aspiration) : 10000;
  const usedKm = Math.max(0, (Number(currentKm) || 0) - (Number(lastKm) || 0));
  const remainingKm = Math.max(0, recKm - usedKm);
  const usedDays = lastDate
    ? Math.max(0, Math.floor((Date.now() - new Date(lastDate).getTime()) / 86400000))
    : 0;
  const remainingDays = Math.max(0, 365 - usedDays);
  const kmPct = Math.max(0, 100 - (usedKm / recKm) * 100);
  const dayPct = Math.max(0, 100 - (usedDays / 365) * 100);
  const healthPct = Math.min(kmPct, dayPct);
  const canCalc = vehicle && lastKm && currentKm;

  return (
    <PageLayout
      title="Araç Bilgi Merkezi"
      subtitle="Motor tipi rehberi, motor yağı değişim zamanı ve ilgili bakım önerileri."
    >
      <div className="grid gap-6">
        <VehicleSelector />

        <section className="panel-surface p-5">
          <h2 className="mb-3 flex items-center gap-2 text-base font-semibold">
            <Info className="h-4 w-4 text-primary" /> Motor Yaş Uygunluk Rehberi
          </h2>
          {vehicle ? (
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">{vehicle.brand} {vehicle.model} · {vehicle.engine}:</strong>{" "}
              {motorGeneralNote(vehicle.fuel, vehicle.aspiration, vehicle.displacement)}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Rehberi görüntülemek için önce aracınızı seçin.</p>
          )}
        </section>

        <section className="panel-surface p-5">
          <h2 className="mb-4 text-base font-semibold">Motor Yağı Değişim Hesaplayıcı</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <Label htmlFor="lk">Son yağ değişim km</Label>
              <Input id="lk" type="number" inputMode="numeric" value={lastKm} onChange={(e) => setLastKm(e.target.value)} placeholder="ör. 84500" />
            </div>
            <div>
              <Label htmlFor="ck">Güncel km</Label>
              <Input id="ck" type="number" inputMode="numeric" value={currentKm} onChange={(e) => setCurrentKm(e.target.value)} placeholder="ör. 91000" />
            </div>
            <div>
              <Label htmlFor="ld">Son değişim tarihi</Label>
              <Input id="ld" type="date" value={lastDate} onChange={(e) => setLastDate(e.target.value)} />
            </div>
          </div>

          {canCalc && (
            <div className="mt-5 rounded-lg border border-border/70 bg-background/40 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="text-sm text-muted-foreground">
                  Önerilen aralık: <span className="text-foreground font-medium">{recKm.toLocaleString("tr-TR")} km / 1 yıl</span>
                </div>
                <div className="text-sm font-semibold text-primary">
                  Kalan: {remainingKm.toLocaleString("tr-TR")} km · {remainingDays} gün
                </div>
              </div>
              <StatusBar value={healthPct} className="mt-3" />
              <BrandTags
                premium={["Castrol", "Mobil 1", "Total Quartz"]}
                economy={["Petrol Ofisi Maximus", "Opet Fullmax"]}
              />
            </div>
          )}

          <RelatedTools
            items={[
              { to: "/bakim", label: "Bakım & Ömür" },
              { to: "/yakit", label: "Yakıt Maliyeti" },
            ]}
          />
        </section>

        <ToolDescription
          title="Bu Sekme Nasıl Kullanılır?"
          items={[
            "Marka, model ve motor seçerek aracınızı tanımlayın; seçiminiz tüm sekmelerde geçerli olur.",
            "Motor Yaş Uygunluk Rehberi, motor kategorisine göre genel ömür ve bakım eğilimini özetler.",
            "Yağ Değişim Hesaplayıcı ile kalan km ve gün süresini renkli bar üzerinden takip edin.",
            "Premium ve ekonomik yağ marka önerileri bütçe kararınıza yardımcı olur.",
          ]}
        />
      </div>
    </PageLayout>
  );
}
