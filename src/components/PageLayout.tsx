import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AdSlot } from "@/components/AdSlot";
import { CookieBanner } from "@/components/CookieBanner";
import { Car, Wrench, Fuel, CircleGauge, Menu, AlertOctagon, FileText, MapPin } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/", label: "Araç Bilgi", icon: Car },
  { to: "/bakim", label: "Bakım & Ömür", icon: Wrench },
  { to: "/yakit", label: "Yakıt & Maliyet", icon: Fuel },
  { to: "/lastik-teknik", label: "Lastik Teknik", icon: CircleGauge },
  { to: "/ariza", label: "Arıza Rehberi", icon: AlertOctagon },
  { to: "/resmi-islemler", label: "Resmi İşlemler", icon: FileText },
  { to: "/plaka", label: "Plaka Sorgulama", icon: MapPin },
] as const;

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showInArticleAd?: boolean;
}

export function PageLayout({ title, subtitle, children, showInArticleAd }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary neon-glow">
              <Car className="h-4 w-4" />
            </span>
            <span className="text-base sm:text-lg">Oto Rehberim</span>
          </Link>

          <nav aria-label="Ana sekmeler" className="ml-auto hidden md:flex">
            <ul className="flex items-center gap-1 rounded-full border border-border bg-panel/60 p-1">
              {TABS.map((t) => (
                <li key={t.to}>
                  <Link
                    to={t.to}
                    activeOptions={{ exact: true }}
                    activeProps={{ className: "bg-primary text-primary-foreground" }}
                    inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition"
                  >
                    <t.icon className="h-4 w-4" /> {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className="ml-auto rounded-md border border-border p-2 md:hidden"
            aria-label="Menü"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>

        {open && (
          <nav className="md:hidden border-t border-border/70 bg-panel">
            <ul className="mx-auto flex max-w-7xl flex-col p-2">
              {TABS.map((t) => (
                <li key={t.to}>
                  <Link
                    to={t.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: true }}
                    activeProps={{ className: "bg-primary/15 text-primary" }}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm"
                  >
                    <t.icon className="h-4 w-4" /> {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Mobile top ad */}
      <div className="block px-3 pt-3 lg:hidden">
        <AdSlot slot="mobile-top" />
      </div>

      {/* Body with side ads on desktop */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-4 px-4 py-6">
        <div className="hidden lg:block">
          <AdSlot slot="side-left" className="sticky top-24" />
        </div>

        <main className="min-w-0 flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {children}
          {showInArticleAd && (
            <div className="mt-8">
              <AdSlot slot="in-article" />
            </div>
          )}
        </main>

        <div className="hidden lg:block">
          <AdSlot slot="side-right" className="sticky top-24" />
        </div>
      </div>

      {/* Mobile bottom ad */}
      <div className={cn("block px-3 pb-3 lg:hidden")}>
        <AdSlot slot="mobile-bottom" />
      </div>

      <footer className="border-t border-border/70 bg-panel/40">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="mb-2 text-foreground font-semibold">Oto Rehberim</div>
              <p className="text-xs">Türkiye'nin ücretsiz oto bakım rehberi. Tamamen tarayıcınızda çalışır; hiçbir kişisel bilgi sunucuya gönderilmez.</p>
            </div>
            <div>
              <div className="mb-2 text-foreground font-semibold">Sekmeler</div>
              <ul className="space-y-1 text-xs">
                {TABS.map((t) => (
                  <li key={t.to}><Link to={t.to} className="hover:text-primary">{t.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-2 text-foreground font-semibold">Kurumsal</div>
              <ul className="space-y-1 text-xs">
                <li><Link to="/hakkimizda" className="hover:text-primary">Hakkımızda</Link></li>
                <li><Link to="/iletisim" className="hover:text-primary">İletişim</Link></li>
                <li><Link to="/gizlilik" className="hover:text-primary">Gizlilik Politikası</Link></li>
                <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
              </ul>
            </div>
            <div>
              <div className="mb-2 text-foreground font-semibold">İletişim</div>
              <p className="text-xs">iletisim@otorehberim.net</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-border/70 bg-background/40 p-3 text-xs">
            <strong className="text-foreground">Yasal Uyarı:</strong> Bu sitedeki hesaplamalar ve öneriler bilgilendirme amaçlıdır, kesin sonuç garantisi vermez. Kritik kararlar için mutlaka yetkili servise danışın.
          </div>
          <div className="mt-3 text-center text-xs">© {new Date().getFullYear()} Oto Rehberim</div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}
