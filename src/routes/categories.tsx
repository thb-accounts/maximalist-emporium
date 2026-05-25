import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { B2C_CATEGORIES } from "@/lib/curation";

export const Route = createFileRoute("/categories")({
  component: CategoriesPage,
  head: () => ({
    meta: [
      { title: "Shop all categories · Lumi & Dee-Dee" },
      { name: "description", content: "Custom apparel, drinkware, bags, gifts and tech — made-to-order in the UAE. Browse all LDD categories." },
      { property: "og:title", content: "Shop all categories · Lumi & Dee-Dee" },
      { property: "og:description", content: "Custom apparel, drinkware, bags, gifts and tech — made-to-order in the UAE." },
    ],
  }),
});

function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col pb-14 lg:pb-0">
      <Header />
      <section className="border-b-[3px] border-ink py-12 bg-acid">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <div className="font-mono-d text-xs uppercase tracking-[0.4em]">Shop</div>
          <h1 className="font-display text-6xl md:text-8xl uppercase">Pick your vibe</h1>
          <p className="font-serif-d text-xl mt-3 max-w-2xl">Six curated categories. Zero corporate energy.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] w-full px-4 md:px-8 py-12 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {B2C_CATEGORIES.map((cat, i) => {
            const tints = ["bg-cream brutal-shadow", "bg-acid brutal-shadow-hot", "bg-hot text-cream brutal-shadow-electric", "bg-electric text-cream brutal-shadow-acid", "bg-sky brutal-shadow", "bg-cream brutal-shadow-hot"];
            return (
              <Link
                key={cat.slug}
                to="/category/$slug"
                params={{ slug: cat.slug }}
                className={`brutal-border p-8 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all relative min-h-[220px] flex flex-col justify-between ${tints[i % tints.length]}`}
              >
                <div className="text-6xl">{cat.emoji}</div>
                <div>
                  <div className="font-mono-d text-[10px] uppercase tracking-widest opacity-70">CAT {String(i + 1).padStart(2, "0")}</div>
                  <div className="font-display text-3xl uppercase leading-tight">{cat.name}</div>
                  <div className="font-serif-d text-lg mt-1 opacity-80">{cat.tagline}</div>
                </div>
                {cat.comingSoon && (
                  <div className="absolute top-4 right-4 bg-ink text-cream font-mono-d text-[10px] uppercase px-2 py-1 tracking-widest">
                    Coming soon
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
