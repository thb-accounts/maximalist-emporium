import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { fetchProducts } from "@/lib/shopify";
import { getCategoryBySlug, filterByCategory } from "@/lib/curation";

export const Route = createFileRoute("/category/$slug")({
  component: CategoryPage,
  loader: ({ params }) => {
    const cat = getCategoryBySlug(params.slug);
    if (!cat) throw notFound();
    return cat;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Category"} · Lumi & Dee-Dee` },
      { name: "description", content: `Shop custom ${loaderData?.name?.toLowerCase() ?? "merch"} at Lumi & Dee-Dee — ${loaderData?.tagline ?? "loud, made-to-order merch."}` },
      { property: "og:title", content: `${loaderData?.name ?? "Category"} · Lumi & Dee-Dee` },
      { property: "og:description", content: loaderData?.tagline ?? "Custom merch made in UAE." },
    ],
  }),
});

function CategoryPage() {
  const cat = Route.useLoaderData();
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => fetchProducts(100),
  });

  const products = filterByCategory(allProducts, cat);

  return (
    <div className="min-h-screen flex flex-col pb-14 lg:pb-0">
      <Header />
      <section className="border-b-[3px] border-ink py-10 bg-cream">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8 flex items-center gap-6 flex-wrap">
          <div className="text-7xl">{cat.emoji}</div>
          <div>
            <Link to="/categories" className="font-mono-d text-xs uppercase tracking-widest underline">← All categories</Link>
            <h1 className="font-display text-5xl md:text-7xl uppercase">{cat.name}</h1>
            <p className="font-serif-d text-xl mt-1">{cat.tagline}</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] w-full px-4 md:px-8 py-10 flex-1">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-[3/4] brutal-border bg-muted animate-pulse" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="brutal-border bg-acid p-12 text-center brutal-shadow">
            <div className="font-display text-4xl uppercase">
              {cat.comingSoon ? "Coming soon" : "Nothing here yet"}
            </div>
            <p className="font-mono-d text-xs uppercase tracking-widest mt-3">
              {cat.comingSoon ? "We're cooking up something cute. Stay tuned." : "Check back soon — new drops weekly."}
            </p>
            <Link to="/categories" className="inline-block mt-6 brutal-border bg-ink text-cream px-4 py-2 font-display uppercase hover:bg-hot transition-colors">
              ← Browse other categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p, i) => <ProductCard key={p.node.id} product={p} index={i} />)}
          </div>
        )}
      </section>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
