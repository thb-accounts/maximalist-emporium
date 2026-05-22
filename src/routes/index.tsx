import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, fetchProducts } from "@/lib/shopify";
import logo from "@/assets/ldd-logo.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Lumi & Dee-Dee — Anti-minimalist branded merch" },
      { name: "description", content: "Shop loud, maximalist branded merchandise across 20+ categories. Tees, hoodies, drinkware, eco-gifts, packaging and more." },
    ],
  }),
});

function Index() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => fetchProducts(50),
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-b-[3px] border-ink">
        <div className="absolute inset-0 stripes opacity-10" />
        <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 py-10 md:py-16 grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2 font-mono-d text-[10px] uppercase tracking-widest">
              <span className="bg-hot text-cream px-2 py-1 brutal-border">★ New drop</span>
              <span className="bg-acid text-ink px-2 py-1 brutal-border">50+ products</span>
              <span className="bg-electric text-cream px-2 py-1 brutal-border">20 categories</span>
              <span className="bg-cream text-ink px-2 py-1 brutal-border">Bulk friendly</span>
            </div>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.85] uppercase">
              Lumi
              <span className="block text-hot -mt-2">&amp; Dee</span>
              <span className="block">
                Dee<span className="text-electric">.</span>
              </span>
            </h1>
            <p className="font-serif-d text-2xl md:text-3xl leading-tight max-w-2xl">
              Anti-minimalist merch named after two very loud cats. <em className="bg-acid not-italic px-2">LDD refuses to whisper</em> — printed, embroidered, embossed, never beige.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/categories" className="brutal-border brutal-shadow bg-ink text-cream px-6 py-4 font-display text-lg uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                Shop LDD →
              </Link>
              <Link to="/about" className="brutal-border bg-cream px-6 py-4 font-display text-lg uppercase hover:bg-acid transition-colors">
                Our story
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-square brutal-border bg-ink p-8 flex items-center justify-center brutal-shadow-hot wiggle">
              <img src={logo} alt="Lumi & Dee-Dee" className="w-full h-full object-contain" />
            </div>
            <div className="absolute -top-4 -left-4 bg-acid brutal-border px-3 py-2 font-display text-lg uppercase -rotate-6">
              Since '26
            </div>
            <div className="absolute -bottom-4 -right-4 bg-hot text-cream brutal-border px-3 py-2 font-display text-lg uppercase rotate-6">
              Cat-approved chaos
            </div>
          </div>
        </div>
      </section>

      <Marquee items={["Free shipping over $250", "Bulk discounts", "Custom artwork welcomed", "Eco-friendly inks", "Made loud", "Rush orders"]} />

      {/* CATEGORIES GRID */}
      <section className="mx-auto max-w-[1600px] w-full px-4 md:px-8 py-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="font-mono-d text-xs uppercase tracking-[0.4em] text-ink/60">01 — Browse</div>
            <h2 className="font-display text-5xl md:text-6xl uppercase">All 20 categories</h2>
          </div>
          <Link to="/categories" className="font-mono-d text-xs uppercase tracking-widest underline underline-offset-4">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              to="/category/$slug"
              params={{ slug: cat.slug }}
              className={`brutal-border p-4 aspect-square flex flex-col justify-between hover:translate-x-1 hover:translate-y-1 transition-transform ${
                i % 4 === 0 ? "bg-cream brutal-shadow" :
                i % 4 === 1 ? "bg-acid brutal-shadow-hot" :
                i % 4 === 2 ? "bg-hot text-cream brutal-shadow-electric" :
                "bg-electric text-cream brutal-shadow-acid"
              }`}
            >
              <div className="text-4xl">{cat.emoji}</div>
              <div>
                <div className="font-mono-d text-[10px] uppercase tracking-widest opacity-70">{String(i + 1).padStart(2, "0")}</div>
                <div className="font-display text-base uppercase leading-tight">{cat.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Marquee items={["★ Bestsellers", "★ New arrivals", "★ Limited drops"]} bg="bg-acid" text="text-ink" />

      {/* PRODUCTS */}
      <section className="mx-auto max-w-[1600px] w-full px-4 md:px-8 py-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="font-mono-d text-xs uppercase tracking-[0.4em] text-ink/60">02 — Shop</div>
            <h2 className="font-display text-5xl md:text-6xl uppercase">The merch <span className="text-hot">wall</span></h2>
          </div>
          <div className="font-mono-d text-xs uppercase tracking-widest bg-ink text-cream px-3 py-2">
            {isLoading ? "Loading…" : `${products.length} products`}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] brutal-border bg-muted animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="brutal-border bg-cream p-12 text-center brutal-shadow-hot">
            <div className="font-display text-4xl uppercase mb-3">No products found</div>
            <p className="font-mono-d text-xs uppercase tracking-widest text-ink/60 max-w-lg mx-auto">
              LDD is empty. Tell the chat what to add — name + price + category — and we'll print it loud.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.node.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* MANIFESTO */}
      <section className="bg-ink text-cream py-20 brutal-border border-x-0">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="font-mono-d text-xs uppercase tracking-[0.4em] text-acid mb-4">Manifesto</div>
            <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.9]">
              Minimalism is <span className="text-hot">cowardice</span> dressed in beige.
            </h2>
          </div>
          <div className="space-y-4 font-serif-d text-xl">
            <p>We don't do "tasteful." We do <span className="bg-hot px-2">tasteful and loud</span>.</p>
            <p>We don't do "subtle." We do <span className="bg-acid text-ink px-2">subtle like a megaphone</span>.</p>
            <p>We don't do "less is more." We do <span className="bg-electric px-2">more is more is more</span>.</p>
            <p className="font-display text-3xl uppercase pt-4">Welcome to LDD.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
