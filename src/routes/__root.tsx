import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScriptOnce,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Sayfa bulunamadı</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Aradığınız sayfa mevcut değil ya da taşınmış olabilir.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">Bir sorun oluştu</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sayfa yüklenirken beklenmedik bir hata çıktı. Yeniden deneyebilir ya da ana sayfaya dönebilirsiniz.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Yeniden dene
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Ana sayfa
          </a>
        </div>
      </div>
    </div>
  );
}

const CONSENT_INIT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_personalization': 'denied',
  'ad_user_data': 'denied',
  'wait_for_update': 500
});
try {
  var s = localStorage.getItem('cookie_consent');
  if (s === 'granted') {
    gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted',
      'ad_personalization': 'granted',
      'ad_user_data': 'granted'
    });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', 'G-YDCM4WQ58R');
`;

const SITE_URL = "https://otorehberim.lovable.app";
const OG_IMAGE = `${SITE_URL}/og-image.svg`;

const WEBAPP_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Oto Rehberim",
  url: SITE_URL,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Web",
  inLanguage: "tr-TR",
  offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
  description:
    "Araç bakım, lastik ömrü, akü ömrü, yakıt maliyeti ve OBD arıza kodu rehberi. Ücretsiz.",
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Oto Rehberim",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  email: "iletisim@otorehberim.net",
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Oto Rehberim",
  url: SITE_URL,
  inLanguage: "tr-TR",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/ariza?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#161a20" },
      { title: "Oto Rehberim | Araç Bakım, Lastik, Akü ve Yakıt Maliyeti Hesaplama" },
      {
        name: "description",
        content:
          "Aracınızın motor yaşı uygunluğunu, lastik ve akü ömrünü, yakıt maliyetini ücretsiz hesaplayın. Kayıt yok, tamamen güvenli ve hızlı oto rehberiniz!",
      },
      {
        name: "keywords",
        content:
          "araç bakım hesaplama, motor yağı değişim zamanı hesaplama, lastik ömrü hesaplama, lastik diş derinliği kontrolü, akü ömrü hesaplama, araç yakıt maliyeti hesaplama, km başı yakıt tüketimi hesaplama, lastik ebadı basınç hesaplama, araç lastik basıncı tablosu, motor yaşına göre bakım rehberi, araç motor uygunluk kontrolü, premium ekonomik yedek parça karşılaştırma, oto lastik akü rehberi ücretsiz",
      },
      { name: "author", content: "Oto Rehberim" },
      { name: "robots", content: "index,follow" },
      { property: "og:site_name", content: "Oto Rehberim" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:title", content: "Oto Rehberim | Araç Bakım, Lastik, Akü ve Yakıt Maliyeti Hesaplama" },
      {
        property: "og:description",
        content:
          "Aracınızın motor yaşı uygunluğunu, lastik ve akü ömrünü, yakıt maliyetini ücretsiz hesaplayın.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Oto Rehberim" },
      { name: "twitter:description", content: "Araç bakım, lastik, akü ve yakıt hesaplayıcıları." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "dns-prefetch", href: "https://cdnjs.cloudflare.com" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
      { rel: "dns-prefetch", href: "https://pagead2.googlesyndication.com" },
      { rel: "preconnect", href: "https://www.googletagmanager.com", crossOrigin: "" },
    ],
    scripts: [
      { children: CONSENT_INIT },
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-YDCM4WQ58R",
        async: true,
      },
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8147032819898233",
        async: true,
        crossOrigin: "anonymous",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(ORG_JSONLD),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <HeadContent />
      </head>
      <body>
        <ScriptOnce>{`document.documentElement.classList.add('dark');`}</ScriptOnce>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
