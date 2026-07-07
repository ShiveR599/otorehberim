interface ToolDescriptionProps {
  title: string;
  items: string[];
}

export function ToolDescription({ title, items }: ToolDescriptionProps) {
  return (
    <section className="panel-surface mt-6 p-5">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
        {title}
      </h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden className="mt-1 text-primary">•</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
