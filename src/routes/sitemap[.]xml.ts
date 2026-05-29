import { createFileRoute } from "@tanstack/react-router";
import { fetchProducts } from "@/lib/shopify";
import { filterB2C, B2C_CATEGORIES } from "@/lib/curation";

const BASE_URL = "https://ldd.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const now = new Date().toISOString().split("T")[0];
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: now },
          { path: "/about", changefreq: "monthly", priority: "0.6", lastmod: now },
          { path: "/categories", changefreq: "weekly", priority: "0.8", lastmod: now },
          { path: "/contact", changefreq: "monthly", priority: "0.6", lastmod: now },
        ];

        // Category pages
        for (const cat of B2C_CATEGORIES) {
          if (!cat.comingSoon) {
            entries.push({
              path: `/category/${cat.slug}`,
              changefreq: "weekly",
              priority: "0.7",
              lastmod: now,
            });
          }
        }

        // Info pages
        const infoSlugs = ["shipping", "returns", "bulk", "custom", "faq"];
        for (const slug of infoSlugs) {
          entries.push({
            path: `/info/${slug}`,
            changefreq: "monthly",
            priority: "0.5",
            lastmod: now,
          });
        }

        // Product pages (fetch via Shopify Storefront API)
        try {
          const products = await fetchProducts(250);
          const curated = filterB2C(products);
          for (const p of curated) {
            entries.push({
              path: `/product/${p.node.handle}`,
              changefreq: "weekly",
              priority: "0.8",
              lastmod: now,
            });
          }
        } catch {
          // If Shopify fetch fails, sitemap still has all static + category + info URLs
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

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
