import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { POSTS } from "@/lib/blog-posts";

const SITE_URL = "https://otorehberim.lovable.app";

const STATIC_PATHS = [
  "/",
  "/bakim",
  "/yakit",
  "/lastik-teknik",
  "/ariza",
  "/resmi-islemler",
  "/plaka",
  "/hakkimizda",
  "/iletisim",
  "/gizlilik",
  "/blog",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          ...STATIC_PATHS.map(
            (p) =>
              `  <url><loc>${SITE_URL}${p}</loc><changefreq>weekly</changefreq></url>`,
          ),
          ...POSTS.map(
            (post) =>
              `  <url><loc>${SITE_URL}/blog/${post.slug}</loc><lastmod>${post.date}</lastmod><changefreq>monthly</changefreq></url>`,
          ),
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
