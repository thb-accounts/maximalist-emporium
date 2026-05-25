import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import logo from "@/assets/ldd-logo.png";
import { CartDrawer } from "./CartDrawer";

const NAV = [
  { to: "/categories", label: "Shop" },
  { to: "/about", label: "How it works" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 brutal-border border-x-0 border-t-0 bg-cream">
      <div className="stripes h-2" />
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Lumi & Dee-Dee" className="h-12 w-12 brutal-border" />
          <div className="hidden sm:block">
            <div className="font-display text-2xl leading-none">LUMI & DEE-DEE</div>
            <div className="font-mono-d text-[10px] uppercase tracking-[0.3em] text-ink/70">custom · merch · made meow</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 font-mono-d text-xs uppercase">
          <Link to="/" className="px-3 py-2 hover:bg-ink hover:text-cream transition-colors">Home</Link>
          <Link to="/categories" className="px-3 py-2 hover:bg-ink hover:text-cream transition-colors">Shop</Link>
          <Link to="/about" className="px-3 py-2 hover:bg-ink hover:text-cream transition-colors">About</Link>
          <Link to="/contact" className="px-3 py-2 hover:bg-ink hover:text-cream transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block font-mono-d text-[10px] uppercase tracking-widest bg-acid text-ink px-2 py-1 brutal-border wiggle">
            free ship · 200+
          </div>
          <CartDrawer />
          {/* Mobile menu trigger */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden brutal-border bg-cream hover:bg-acid h-12 w-12 flex items-center justify-center"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-cream brutal-border border-y-0 border-r-0 w-72">
              <SheetTitle className="font-display text-3xl uppercase">Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-2">
                {NAV.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="brutal-border px-4 py-3 font-display uppercase text-lg bg-cream hover:bg-ink hover:text-cream transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
