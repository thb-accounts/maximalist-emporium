import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CATEGORIES } from "@/lib/shopify";

export const Route = createFileRoute("/categories")({
  component: CategoriesPage,
  head: () => ({
    meta: [
      { title: "All Categories · Lumi &amp; Dee-Dee" },
      { name: "description", content: "Browse all 20 Lumi &amp; Dee-Dee merch categories: apparel, drinkware, office, eco, packaging, tech and more." },
    ],
  }),
});

function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="border-b-[3px] border-ink py-12 bg-acid">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <div className="font-mono-d text-xs uppercase tracking-[0.4em]">Index</div>
          <h1 className="font-display text-6xl md:text-8xl uppercase">Every category, no filter</h1>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] w-full px-4 md:px-8 py-12 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              to="/category/$slug"
              params={{ slug: cat.slug }}
              className={`brutal-border p-6 hover:translate-x-1 hover:translate-y-1 transition-transform ${
                i % 5 === 0 ? "bg-cream brutal-shadow" :
                i % 5 === 1 ? "bg-acid brutal-shadow-hot" :
                i % 5 === 2 ? "bg-hot text-cream brutal-shadow-electric" :
                i % 5 === 3 ? "bg-electric text-cream brutal-shadow-acid" :
                "bg-sky brutal-shadow"
              }`}
            >
              <div className="text-5xl mb-4">{cat.emoji}</div>
              <div className="font-mono-d text-[10px] uppercase tracking-widest opacity-70">CAT {String(i + 1).padStart(2, "0")}</div>
              <div className="font-display text-2xl uppercase leading-tight">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
