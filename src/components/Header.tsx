import { Link } from "@tanstack/react-router";
import logo from "@/assets/ldd-logo.png";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  return (
    <header className="sticky top-0 z-40 brutal-border border-x-0 border-t-0 bg-cream">
      <div className="stripes h-2" />
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Lumi &amp; Dee-Dee" className="h-12 w-12 brutal-border" />
          <div className="hidden sm:block">
            <div className="font-display text-2xl leading-none">LUMI &amp; DEE-DEE</div>
            <div className="font-mono-d text-[10px] uppercase tracking-[0.3em] text-ink/70">est · merch · for · maximalists</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1 font-mono-d text-xs uppercase">
          <Link to="/" className="px-3 py-2 hover:bg-ink hover:text-cream transition-colors">Shop</Link>
          <Link to="/categories" className="px-3 py-2 hover:bg-ink hover:text-cream transition-colors">Categories</Link>
          <Link to="/about" className="px-3 py-2 hover:bg-ink hover:text-cream transition-colors">About</Link>
          <Link to="/contact" className="px-3 py-2 hover:bg-ink hover:text-cream transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:block font-mono-d text-[10px] uppercase tracking-widest bg-acid text-ink px-2 py-1 brutal-border wiggle">
            free ship · 50+
          </div>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
