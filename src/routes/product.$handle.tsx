import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart, Truck, Package, ShieldCheck } from "lucide-react";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { ProductFAQ } from "@/components/ProductFAQ";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} · Lumi & Dee-Dee` },
      { name: "description", content: `Custom ${params.handle.replace(/-/g, " ")} — personalize it your way. Made-to-order in the UAE.` },
      { property: "og:title", content: `${params.handle.replace(/-/g, " ")} · Lumi & Dee-Dee` },
      { property: "og:description", content: `Custom ${params.handle.replace(/-/g, " ")} — personalize it your way.` },
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
  const [customNote, setCustomNote] = useState("");
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
    const selectedOptions = [...(variant.selectedOptions || [])];
    if (customNote.trim()) {
      selectedOptions.push({ name: "Customization", value: customNote.trim().slice(0, 200) });
    }
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions,
    });
  };

  return (
    <div className="min-h-screen flex flex-col pb-32 lg:pb-0">
      <Header />
      <section className="mx-auto max-w-[1600px] w-full px-4 md:px-8 py-8 flex-1 grid lg:grid-cols-2 gap-10">
        {/* GALLERY (sticky on desktop) */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-3">
          <div className="aspect-square brutal-border bg-muted overflow-hidden brutal-shadow">
            {image ? (
              <img src={image.url} alt={image.altText || product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="checker w-full h-full opacity-30" />
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {images.map((img: { url: string; altText: string | null }, i: number) => (
                <button key={i} onClick={() => setImgIdx(i)} className={`w-20 h-20 brutal-border overflow-hidden ${i === imgIdx ? "ring-4 ring-hot" : ""}`} aria-label={`View image ${i + 1}`}>
                  <img src={img.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="space-y-6">
          <Link to="/categories" className="font-mono-d text-xs uppercase tracking-widest underline">← Back to shop</Link>
          <h1 className="font-display text-4xl md:text-6xl uppercase leading-[0.9]">{product.title}</h1>

          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl">{variant?.price.currencyCode} {parseFloat(variant?.price.amount || "0").toFixed(2)}</span>
            {!variant?.availableForSale && <span className="font-mono-d text-xs uppercase bg-destructive text-cream px-2 py-1">Sold out</span>}
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="brutal-border bg-acid p-2">
              <Package className="w-5 h-5 mx-auto mb-1" />
              <div className="font-mono-d text-[9px] uppercase tracking-widest leading-tight">Production<br />5–7 days</div>
            </div>
            <div className="brutal-border bg-cream p-2">
              <Truck className="w-5 h-5 mx-auto mb-1" />
              <div className="font-mono-d text-[9px] uppercase tracking-widest leading-tight">UAE ship<br />2–3 days</div>
            </div>
            <div className="brutal-border bg-electric text-cream p-2">
              <ShieldCheck className="w-5 h-5 mx-auto mb-1" />
              <div className="font-mono-d text-[9px] uppercase tracking-widest leading-tight">Secure<br />checkout</div>
            </div>
          </div>

          {variants.length > 1 && (
            <div>
              <div className="font-mono-d text-xs uppercase tracking-widest mb-2">Variant</div>
              <div className="flex flex-wrap gap-2">
                {variants.map((v: { id: string; title: string }, i: number) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantIdx(i)}
                    className={`px-4 py-2 brutal-border font-mono-d text-xs uppercase ${i === variantIdx ? "bg-ink text-cream" : "bg-cream hover:bg-acid"}`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customization notes */}
          <div>
            <div className="font-mono-d text-xs uppercase tracking-widest mb-2">Customization notes <span className="text-ink/50">(optional)</span></div>
            <textarea
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              maxLength={200}
              placeholder="e.g. 'Print my cat's name (Mochi) in pink on the back'"
              className="w-full brutal-border bg-cream p-3 font-mono-d text-sm h-24 resize-none outline-none focus:bg-acid/30"
            />
            <div className="font-mono-d text-[10px] text-ink/50 text-right">{customNote.length}/200</div>
          </div>

          <Button
            onClick={handleAdd}
            disabled={isAdding || !variant?.availableForSale}
            className="w-full h-16 rounded-none brutal-border brutal-shadow-hot bg-ink text-cream hover:bg-hot font-display text-xl uppercase"
          >
            {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShoppingCart className="w-5 h-5 mr-2" />Add to cart</>}
          </Button>

          {product.description && (
            <div className="brutal-border p-5 bg-cream">
              <div className="font-mono-d text-[10px] uppercase tracking-widest mb-2 text-ink/60">Description</div>
              <p className="font-serif-d text-lg whitespace-pre-line">{product.description}</p>
            </div>
          )}

          <ProductFAQ />
        </div>
      </section>

      {/* MOBILE STICKY ADD-TO-CART */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 brutal-border border-x-0 border-b-0 bg-cream p-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="font-mono-d text-[10px] uppercase tracking-widest text-ink/60 leading-none">Total</div>
            <div className="font-display text-2xl leading-none mt-1">{variant?.price.currencyCode} {parseFloat(variant?.price.amount || "0").toFixed(2)}</div>
          </div>
          <Button
            onClick={handleAdd}
            disabled={isAdding || !variant?.availableForSale}
            className="flex-1 h-12 rounded-none brutal-border bg-hot text-cream hover:bg-ink font-display text-base uppercase"
          >
            {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShoppingCart className="w-4 h-4 mr-1" />Add</>}
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
