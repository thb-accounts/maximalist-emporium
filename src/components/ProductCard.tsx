import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";

const ROTATIONS = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2", "rotate-0"];
const SHADOWS = ["brutal-shadow", "brutal-shadow-hot", "brutal-shadow-electric", "brutal-shadow-acid"];
const BG = ["bg-cream", "bg-acid/40", "bg-sky/40", "bg-hot/20"];

export function ProductCard({ product, index = 0 }: { product: ShopifyProduct; index?: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const rot = ROTATIONS[index % ROTATIONS.length];
  const shadow = SHADOWS[index % SHADOWS.length];
  const bg = BG[index % BG.length];

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: product.node.handle }}
      className={`group block ${rot} hover:rotate-0 transition-transform duration-200`}
    >
      <div className={`${bg} brutal-border ${shadow} hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}>
        <div className="aspect-square overflow-hidden bg-muted border-b-[3px] border-ink relative">
          {image ? (
            <img src={image.url} alt={image.altText || product.node.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="checker h-full w-full opacity-30" />
          )}
          <div className="absolute top-2 left-2 bg-ink text-cream px-2 py-1 font-mono-d text-[10px] uppercase tracking-widest">
            #{String(index + 1).padStart(3, "0")}
          </div>
          {product.node.productType && (
            <div className="absolute top-2 right-2 bg-cream brutal-border px-2 py-1 font-mono-d text-[10px] uppercase">
              {product.node.productType}
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-display text-lg uppercase leading-tight line-clamp-2">{product.node.title}</h3>
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="font-mono-d text-[10px] uppercase tracking-widest text-ink/60">From</div>
              <div className="font-display text-2xl leading-none">{price.currencyCode} {parseFloat(price.amount).toFixed(2)}</div>
            </div>
            <Button
              onClick={handleAdd}
              disabled={isLoading || !variant}
              size="icon"
              className="h-10 w-10 rounded-none brutal-border bg-ink text-cream hover:bg-hot"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
