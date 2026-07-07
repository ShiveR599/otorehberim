import { cn } from "@/lib/utils";

interface AdSlotProps {
  slot: "side-left" | "side-right" | "mobile-top" | "mobile-bottom" | "in-article";
  className?: string;
}

const LABELS = {
  "side-left": "Reklam · 160×600",
  "side-right": "Reklam · 160×600",
  "mobile-top": "Reklam · 90 px",
  "mobile-bottom": "Reklam · 90 px",
  "in-article": "Reklam · İçerik İçi",
};

export function AdSlot({ slot, className }: AdSlotProps) {
  return (
    <aside
      aria-label="Reklam alanı"
      data-ad-slot={slot}
      className={cn(
        "flex items-center justify-center rounded-md border border-dashed border-border/70 bg-muted/40 text-[11px] uppercase tracking-wider text-muted-foreground",
        slot === "side-left" || slot === "side-right" ? "min-h-[600px] w-[160px]" : "",
        slot === "mobile-top" || slot === "mobile-bottom" ? "min-h-[90px] w-full" : "",
        slot === "in-article" ? "min-h-[120px] w-full" : "",
        className,
      )}
    >
      {LABELS[slot]}
    </aside>
  );
}
