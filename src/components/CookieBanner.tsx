import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const KEY = "cookie_consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(KEY);
      if (!v) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const update = (granted: boolean) => {
    try {
      window.localStorage.setItem(KEY, granted ? "granted" : "denied");
    } catch { /* empty */ }
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: granted ? "granted" : "denied",
        ad_storage: granted ? "granted" : "denied",
        ad_personalization: granted ? "granted" : "denied",
        ad_user_data: granted ? "granted" : "denied",
      });
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Çerez tercihleri"
      className="fixed inset-x-2 bottom-2 z-50 mx-auto max-w-3xl rounded-xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur"
    >
      <button
        aria-label="Kapat"
        onClick={() => update(false)}
        className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground hover:bg-muted"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="pr-6">
        <h3 className="mb-1 text-sm font-semibold text-foreground">Çerez Kullanımı</h3>
        <p className="text-xs text-muted-foreground">
          Bu site, deneyimi geliştirmek ve reklam performansını ölçmek için çerezler
          kullanabilir. "Kabul Et" seçeneğiyle analitik ve reklam çerezlerine izin
          verirsiniz. Reddederseniz yalnızca zorunlu çerezler çalışır.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" onClick={() => update(true)}>Kabul Et</Button>
          <Button size="sm" variant="secondary" onClick={() => update(false)}>Reddet</Button>
        </div>
      </div>
    </div>
  );
}
