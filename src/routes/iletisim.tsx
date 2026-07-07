import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/iletisim")({
  head: () => ({
    meta: [
      { title: "İletişim | Oto Rehberim" },
      { name: "description", content: "Oto Rehberim ile iletişime geçin: iletisim@otorehberim.net" },
      { property: "og:title", content: "İletişim | Oto Rehberim" },
      { property: "og:description", content: "Bize ulaşın." },
      { property: "og:url", content: "/iletisim" },
    ],
    links: [{ rel: "canonical", href: "/iletisim" }],
  }),
  component: () => (
    <PageLayout title="İletişim" subtitle="Soru, öneri ve iş birlikleri için bize ulaşın.">
      <div className="panel-surface p-6 text-sm">
        <p className="text-muted-foreground">Uygulamayla ilgili geri bildirimlerinizi bekliyoruz.</p>
        <a href="mailto:iletisim@otorehberim.net" className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground">
          <Mail className="h-4 w-4" /> iletisim@otorehberim.net
        </a>
        <p className="mt-6 text-xs text-muted-foreground">Genellikle 1–3 iş günü içinde yanıt veriyoruz.</p>
      </div>
    </PageLayout>
  ),
});
