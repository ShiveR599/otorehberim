import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { AdSlot } from "@/components/AdSlot";
import { POSTS } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog | Oto Bakım Rehberi Yazıları | Oto Rehberim" },
      { name: "description", content: "Lastik ömrü, akü bakımı ve motor yağı seçimi rehberi yazıları." },
      { property: "og:title", content: "Blog | Oto Rehberim" },
      { property: "og:description", content: "Oto bakım rehberi yazıları." },
      { property: "og:url", content: "/blog" },
      { property: "og:image", content: "/og-image.svg" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: () => (
    <PageLayout title="Blog" subtitle="Oto bakım rehberi yazıları">
      <div className="grid gap-4 sm:grid-cols-2">
        {POSTS.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="panel-surface block p-5 transition hover:border-primary/60"
          >
            <div className="text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString("tr-TR")}</div>
            <h2 className="mt-1 text-lg font-semibold text-foreground">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            <span className="mt-3 inline-block text-xs font-medium text-primary">Devamını oku →</span>
          </Link>
        ))}
      </div>
      <div className="mt-8"><AdSlot slot="in-article" /></div>
    </PageLayout>
  ),
});
