import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

export const Route = createFileRoute("/hakkimizda")({
  head: () => ({
    meta: [
      { title: "Hakkımızda | Oto Rehberim" },
      { name: "description", content: "Oto Rehberim, Türkiye'de sürücülere yönelik ücretsiz, kayıt gerektirmeyen bir oto bakım rehberidir." },
      { property: "og:title", content: "Hakkımızda | Oto Rehberim" },
      { property: "og:description", content: "Oto Rehberim hakkında bilgi." },
      { property: "og:url", content: "/hakkimizda" },
    ],
    links: [{ rel: "canonical", href: "/hakkimizda" }],
  }),
  component: () => (
    <PageLayout title="Hakkımızda" subtitle="Kısaca Oto Rehberim">
      <article className="panel-surface p-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p><strong className="text-foreground">Oto Rehberim</strong>, Türkiye'deki sürücülerin araç bakım kararlarını daha hızlı ve daha bilinçli almasına yardımcı olmak için hazırlanmış <strong>ücretsiz</strong> bir web uygulamasıdır.</p>
        <h2 className="text-base font-semibold text-foreground">Ne Yapıyoruz?</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Motor yağı değişim zamanınızı takip edin.</li>
          <li>Lastik ömrünüzü diş derinliği ve yaşa göre değerlendirin.</li>
          <li>Akü sağlığınızı hızlıca kontrol edin.</li>
          <li>Yakıt maliyetinizi ve km başı harcamanızı ölçün.</li>
          <li>Lastik basıncı, PSI–Bar, KM–Mil dönüşümlerini pratik yapın.</li>
        </ul>
        <h2 className="text-base font-semibold text-foreground">Farkımız</h2>
        <p>Uygulama tamamen tarayıcınızda çalışır. Kayıt olmanıza gerek yoktur; girdiğiniz veriler sunucuya gönderilmez. Reklamlar dışında üçüncü taraflara veri aktarımı yoktur.</p>
      </article>
    </PageLayout>
  ),
});
