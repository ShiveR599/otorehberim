import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { AdSlot } from "@/components/AdSlot";
import { POSTS } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Yazı bulunamadı" }, { name: "robots", content: "noindex" }] };
    }
    const url = `/blog/${loaderData.slug}`;
    return {
      meta: [
        { title: `${loaderData.title} | Oto Rehberim Blog` },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: "/og-image.svg" },
        { name: "twitter:image", content: "/og-image.svg" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: loaderData.title,
          datePublished: loaderData.date,
          description: loaderData.excerpt,
          author: { "@type": "Organization", name: "Oto Rehberim" },
        }),
      }],
    };
  },
  component: BlogPost,
  notFoundComponent: () => (
    <PageLayout title="Yazı bulunamadı">
      <p className="text-sm text-muted-foreground">
        Bu yazı mevcut değil. <Link to="/blog" className="text-primary">Blog'a dön</Link>.
      </p>
    </PageLayout>
  ),
});

function BlogPost() {
  const post = Route.useLoaderData();
  return (
    <PageLayout title={post.title} subtitle={new Date(post.date).toLocaleDateString("tr-TR")}>
      <article className="panel-surface p-6 text-sm leading-relaxed text-muted-foreground space-y-4">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </article>
      <div className="mt-8"><AdSlot slot="in-article" /></div>
      <div className="mt-6">
        <Link to="/blog" className="text-sm text-primary">← Tüm yazılar</Link>
      </div>
    </PageLayout>
  );
}
