import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustStrip } from "@/components/TrustStrip";
import { SocialProof } from "@/components/SocialProof";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { fetchProducts } from "@/lib/shopify";
import { B2C_CATEGORIES, getBestsellers, filterB2C } from "@/lib/curation";
import { Sparkles, ArrowRight } from "lucide-react";
import logo from "@/assets/ldd-logo.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Lumi & Dee-Dee — Custom merch that refuses to be boring" },
      { name: "description", content: "Personalized gifts, apparel, mugs, bags & more — made for loud people. Custom merch shipped across the UAE." },
      { property: "og:title", content: "Lumi & Dee-Dee — Custom merch that refuses to be boring" },
      { property: "og:description", content: "Personalized gifts, apparel, mugs, bags & more — made for loud people." },
    ],
  }),
});

function Index() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => fetchProducts(100),
  });

  const bestsellers = getBestsellers(allProducts, 8);
  const totalCurated = filterB2C(allProducts).length;

  return (
    <div className="min-h-screen flex flex-col pb-14 lg:pb-0">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-b-[3px] border-ink">
        <div className="absolute inset-0 stripes opacity-10" />
        <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 py-10 md:py-16 grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2 font-mono-d text-[10px] uppercase tracking-widest">
              <span className="bg-hot text-cream px-2 py-1 brutal-border">★ Made in UAE</span>
              <span className="bg-acid text-ink px-2 py-1 brutal-border">Custom · Personalized</span>
              <span className="bg-electric text-cream px-2 py-1 brutal-border">Ships in 5–7 days</span>
            </div>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] leading-[0.85] uppercase">
              Custom merch
              <span className="block text-hot -mt-2">that refuses</span>
              <span className="block">
                to be boring<span className="text-electric">.</span>
              </span>
            </h1>
            <p className="font-serif-d text-xl md:text-2xl leading-tight max-w-2xl">
              Personalized gifts, apparel, mugs, bags & more — <em className="bg-acid not-italic px-2">made for loud people</em>. Whatever you'd put on a billboard, we'll put on a hoodie.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/categories"
                className="brutal-border brutal-shadow bg-ink text-cream px-6 py-4 font-display text-lg uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
              >
                Shop now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="brutal-border brutal-shadow-hot bg-acid text-ink px-6 py-4 font-display text-lg uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" /> Create your own
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-square brutal-border bg-ink p-8 flex items-center justify-center brutal-shadow-hot wiggle">
              <img src={logo} alt="Lumi & Dee-Dee — playful custom merch brand" className="w-full h-full object-contain" />
            </div>
            <div className="absolute -top-4 -left-4 bg-acid brutal-border px-3 py-2 font-display text-lg uppercase -rotate-6">
              Cat-approved
            </div>
            <div className="absolute -bottom-4 -right-4 bg-hot text-cream brutal-border px-3 py-2 font-display text-lg uppercase rotate-6">
              Made meow
            </div>
          </div>
        </div>
      </section>

      <Marquee items={["★ Free shipping over AED 200", "★ Made-to-order in UAE", "★ Bulk discounts", "★ Custom designs welcome", "★ Cat-approved chaos"]} />

      {/* BESTSELLERS */}
      <section className="mx-auto max-w-[1600px] w-full px-4 md:px-8 py-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="font-mono-d text-xs uppercase tracking-[0.4em] text-ink/60">01 — Bestsellers</div>
            <h2 className="font-display text-5xl md:text-6xl uppercase">
              People's <span className="text-hot">favorites</span>
            </h2>
          </div>
          <Link to="/categories" className="font-mono-d text-xs uppercase tracking-widest underline underline-offset-4">
            See all {totalCurated || ""} →
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] brutal-border bg-muted animate-pulse" />
            ))}
          </div>
        ) : bestsellers.length === 0 ? (
          <div className="brutal-border bg-cream p-12 text-center brutal-shadow-hot">
            <div className="font-display text-3xl uppercase">More drops coming soon</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestsellers.map((p, i) => (
              <ProductCard key={p.node.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="bg-acid/30 brutal-border border-x-0 py-16">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <div className="mb-10">
            <div className="font-mono-d text-xs uppercase tracking-[0.4em] text-ink/60">02 — Shop by category</div>
            <h2 className="font-display text-5xl md:text-6xl uppercase">Pick your vibe</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {B2C_CATEGORIES.map((cat, i) => {
              const tints = ["bg-cream", "bg-hot text-cream", "bg-electric text-cream", "bg-acid", "bg-sky", "bg-cream"];
              return (
                <Link
                  key={cat.slug}
                  to="/category/$slug"
                  params={{ slug: cat.slug }}
                  className={`brutal-border ${tints[i % tints.length]} brutal-shadow p-5 aspect-square flex flex-col justify-between hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all relative`}
                >
                  <div className="text-5xl">{cat.emoji}</div>
                  <div>
                    <div className="font-display text-xl uppercase leading-tight">{cat.name}</div>
                    <div className="font-mono-d text-[10px] uppercase tracking-widest opacity-70 mt-1">{cat.tagline}</div>
                  </div>
                  {cat.comingSoon && (
                    <div className="absolute top-2 right-2 bg-ink text-cream font-mono-d text-[9px] uppercase px-1.5 py-0.5 tracking-widest">
                      Soon
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* TRUST */}
      <TrustStrip />

      {/* SOCIAL PROOF */}
      <SocialProof />

      {/* SHORT MANIFESTO — bottom */}
      <section className="bg-ink text-cream py-16 brutal-border border-x-0">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 text-center">
          <div className="font-mono-d text-xs uppercase tracking-[0.4em] text-acid mb-4">The LDD way</div>
          <h2 className="font-display text-4xl md:text-6xl uppercase leading-[0.95]">
            Boring is the <span className="text-hot">only thing</span> we don't make.
          </h2>
          <p className="font-serif-d text-xl md:text-2xl mt-6 max-w-2xl mx-auto">
            Named after two very loud cats. Made for everyone who refuses to whisper.
          </p>
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 mt-8 brutal-border brutal-shadow-hot bg-cream text-ink px-6 py-4 font-display text-lg uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Start shopping <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
