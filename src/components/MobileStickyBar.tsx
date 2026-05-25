import { Link } from "@tanstack/react-router";
import { ShoppingBag, Sparkles } from "lucide-react";

export function MobileStickyBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 brutal-border border-x-0 border-b-0 bg-cream">
      <div className="grid grid-cols-2">
        <Link
          to="/categories"
          className="flex items-center justify-center gap-2 py-3 bg-ink text-cream font-display uppercase text-sm tracking-wider"
        >
          <ShoppingBag className="w-4 h-4" />
          Shop now
        </Link>
        <Link
          to="/contact"
          className="flex items-center justify-center gap-2 py-3 bg-hot text-cream font-display uppercase text-sm tracking-wider"
        >
          <Sparkles className="w-4 h-4" />
          Customize
        </Link>
      </div>
    </div>
  );
}
