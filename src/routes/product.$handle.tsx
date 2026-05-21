import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} · LDD` },
      { name: "description", content: `Shop ${params.handle.replace(/-/g, " ")} at Loud Design Depot.` },
    ],
  }),
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });
  const [variantIdx, setVariantIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin" /></div>
        <Footer />
      </div>
    );
  }

  if (!product) throw notFound();

  const variants = product.variants?.edges?.map((e: { node: { id: string; title: string; price: { amount: string; currencyCode: string }; availableForSale: boolean; selectedOptions: Array<{ name: string; value: string }> } }) => e.node) ?? [];
  const images = product.images?.edges?.map((e: { node: { url: string; altText: string | null } }) => e.node) ?? [];
  const variant = variants[variantIdx];
  const image = images[imgIdx];

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="mx-auto max-w-[1600px] w-full px-4 md:px-8 py-10 flex-1 grid lg:grid-cols-2 gap-10">
        <div className="space-y-3">
          <div className="aspect-square brutal-border bg-muted overflow-hidden brutal-shadow">
            {image ? <img src={image.url} alt={image.altText || product.title} className="w-full h-full object-cover" /> : <div className="checker w-full h-full opacity-30" />}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {images.map((img: { url: string; altText: string | null }, i: number) => (
                <button key={i} onClick={() => setImgIdx(i)} className={`w-20 h-20 brutal-border overflow-hidden ${i === imgIdx ? "ring-4 ring-hot" : ""}`}>
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <Link to="/" className="font-mono-d text-xs uppercase tracking-widest underline">← Back to shop</Link>
          <h1 className="font-display text-5xl md:text-6xl uppercase leading-[0.9]">{product.title}</h1>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl">{variant?.price.currencyCode} {parseFloat(variant?.price.amount || "0").toFixed(2)}</span>
            {!variant?.availableForSale && <span className="font-mono-d text-xs uppercase bg-destructive text-cream px-2 py-1">Sold out</span>}
          </div>
          {variants.length > 1 && (
            <div>
              <div className="font-mono-d text-xs uppercase tracking-widest mb-2">Variant</div>
              <div className="flex flex-wrap gap-2">
                {variants.map((v: { id: string; title: string }, i: number) => (
                  <button key={v.id} onClick={() => setVariantIdx(i)} className={`px-4 py-2 brutal-border font-mono-d text-xs uppercase ${i === variantIdx ? "bg-ink text-cream" : "bg-cream hover:bg-acid"}`}>
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}
          <Button onClick={handleAdd} disabled={isAdding || !variant?.availableForSale} className="w-full h-16 rounded-none brutal-border brutal-shadow-hot bg-ink text-cream hover:bg-hot font-display text-xl uppercase">
            {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShoppingCart className="w-5 h-5 mr-2" />Add to cart</>}
          </Button>
          {product.description && (
            <div className="brutal-border p-5 bg-cream">
              <div className="font-mono-d text-[10px] uppercase tracking-widest mb-2 text-ink/60">Description</div>
              <p className="font-serif-d text-lg whitespace-pre-line">{product.description}</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
