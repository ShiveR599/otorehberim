import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/gizlilik")({
  head: () => ({
    meta: [
      { title: "Gizlilik Politikası | Oto Rehberim" },
      { name: "description", content: "KVKK uyumlu gizlilik politikamız. Kişisel veri toplamayız, veriler tarayıcınızda kalır." },
      { property: "og:title", content: "Gizlilik Politikası | Oto Rehberim" },
      { property: "og:description", content: "KVKK uyumlu gizlilik politikamız." },
      { property: "og:url", content: "/gizlilik" },
    ],
    links: [{ rel: "canonical", href: "/gizlilik" }],
  }),
  component: () => (
    <PageLayout title="Gizlilik Politikası" subtitle="KVKK ve şeffaflık ilkeleri çerçevesinde">
      <article className="panel-surface p-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>Oto Rehberim, kullanıcıların gizliliğine büyük önem verir. Bu politika, sitede hangi verilerin nasıl işlendiğini açıklar.</p>
        <h2 className="text-base font-semibold text-foreground">Toplanan Kişisel Veriler</h2>
        <p>Uygulamamız <strong>hassas kimlik verisi (TC kimlik, plaka, isim, telefon vb.) toplamaz</strong>. Hesaplayıcılara girdiğiniz km, tarih, diş derinliği gibi bilgiler yalnızca tarayıcınızın yerel deposunda (localStorage) tutulur ve sunucularımıza gönderilmez.</p>
        <h2 className="text-base font-semibold text-foreground">Çerezler ve Analitik</h2>
        <p>Sayfa performansını ölçmek için <strong>Google Analytics</strong>, reklamları yayınlamak için <strong>Google AdSense</strong> kullanıyoruz. Google Consent Mode v2 ile bu izinler ilk ziyarette varsayılan olarak <em>reddedilmiş</em> durumdadır; siz "Kabul Et" seçtiğinizde etkinleşir. Kararınızı istediğiniz zaman tarayıcı verilerini temizleyerek geri alabilirsiniz.</p>
        <h2 className="text-base font-semibold text-foreground">Üçüncü Taraflar</h2>
        <p>Reklam ağları (ör. Google AdSense) tarayıcınızla doğrudan iletişime geçer. Bu ağların çerez politikaları kendi web sitelerinde yayınlanmaktadır.</p>
        <h2 className="text-base font-semibold text-foreground">Haklarınız (KVKK 11. Madde)</h2>
        <p>Kişisel veri işlemediğimiz için başvurularınızı doğrudan verilerin işlendiği üçüncü taraflara (Google) yönlendirmeniz gerekir. Sitemize ilişkin sorularınız için: <a className="text-primary" href="mailto:iletisim@otorehberim.net">iletisim@otorehberim.net</a></p>
        <h2 className="text-base font-semibold text-foreground">Güncellemeler</h2>
        <p>Bu politika ihtiyaç halinde güncellenebilir; güncel sürüm her zaman bu sayfada yer alır.</p>
      </article>
    </PageLayout>
  ),
});
