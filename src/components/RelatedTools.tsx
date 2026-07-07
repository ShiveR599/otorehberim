import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

interface RelatedItem {
  to: string;
  label: string;
}

export function RelatedTools({ items }: { items: RelatedItem[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-4 rounded-lg border border-border/70 bg-panel/60 p-4">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        İlgili Araçlar
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-primary/20"
          >
            {it.label} <ArrowRight className="h-3 w-3" />
          </Link>
        ))}
      </div>
    </div>
  );
}
