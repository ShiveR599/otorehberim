import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { POSTS } from "@/lib/blog-posts";

const BASE_URL = "";

const staticPaths = [
  "/", "/bakim", "/yakit", "/lastik-teknik",
  "/hakkimizda", "/iletisim", "/gizlilik", "/blog",
];

export const Route = createFileRoute("/sitemap[.]xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          ...staticPaths.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`),
          ...POSTS.map((post) => `  <url><loc>${BASE_URL}/blog/${post.slug}</loc><lastmod>${post.date}</lastmod><changefreq>monthly</changefreq></url>`),
        ].join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
