import { cn } from "@/lib/utils";

/** value 0–100, colored from red→yellow→green. */
export function StatusBar({ value, className }: { value: number; className?: string }) {
  const v = Math.max(0, Math.min(100, value));
  const color =
    v >= 66 ? "bg-emerald-400" : v >= 33 ? "bg-yellow-400" : "bg-red-500";
  return (
    <div className={cn("h-3 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className={cn("h-full rounded-full transition-all", color)}
        style={{ width: `${v}%` }}
        aria-valuenow={Math.round(v)}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
      />
    </div>
  );
}

export function BrandTags({ premium, economy }: { premium: string[]; economy: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2 text-xs">
      <div className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1">
        <span className="font-semibold text-primary">Premium:</span>{" "}
        <span className="text-muted-foreground">{premium.join(", ")}</span>
      </div>
      <div className="rounded-full border border-border bg-muted/50 px-3 py-1">
        <span className="font-semibold text-foreground">Ekonomik:</span>{" "}
        <span className="text-muted-foreground">{economy.join(", ")}</span>
      </div>
    </div>
  );
}
