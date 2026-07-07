import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const SITE_URL = "https://otorehberim.lovable.app";

export const Route = createFileRoute("/robots[.]txt")({
  server: {
    handlers: {
      GET: () => {
        const body =
          `User-agent: *\nAllow: /\n\n` +
          `User-agent: Googlebot\nAllow: /\n\n` +
          `User-agent: Bingbot\nAllow: /\n\n` +
          `Sitemap: ${SITE_URL}/sitemap.xml\n`;
        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
