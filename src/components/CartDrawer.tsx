import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative brutal-border bg-cream hover:bg-acid rounded-none h-12 w-12">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-hot text-cream brutal-border">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-cream brutal-border border-y-0 border-r-0">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-3xl">YOUR HAUL</SheetTitle>
          <SheetDescription className="font-mono-d uppercase text-xs tracking-widest">
            {totalItems === 0 ? "Empty as a Monday morning" : `${totalItems} item${totalItems !== 1 ? "s" : ""} of pure attitude`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-ink/40 mx-auto mb-4" />
                <p className="font-mono-d uppercase text-xs tracking-widest text-ink/60">Cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-3 p-3 bg-cream brutal-border">
                      <div className="w-20 h-20 bg-muted brutal-border flex-shrink-0 overflow-hidden">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img src={item.product.node.images.edges[0].node.url} alt="" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-sm uppercase truncate">{item.product.node.title}</h4>
                        <p className="text-xs font-mono-d text-ink/60">{item.selectedOptions.map((o) => o.value).join(" / ")}</p>
                        <p className="font-display text-lg mt-1">{item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.variantId)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <div className="flex items-center gap-1 brutal-border">
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-7 text-center text-sm font-mono-d">{item.quantity}</span>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-3 pt-4 mt-4 border-t-[3px] border-ink bg-cream">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono-d uppercase text-xs tracking-widest">Subtotal</span>
                  <span className="font-display text-3xl">{items[0]?.price.currencyCode || "$"} {totalPrice.toFixed(2)}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full h-14 rounded-none brutal-border bg-hot text-cream hover:bg-ink font-display text-lg uppercase tracking-wider"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-4 h-4 mr-2" />Checkout Now</>}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
