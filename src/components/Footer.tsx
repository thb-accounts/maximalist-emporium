import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import logo from "@/assets/ldd-logo.png";

const SHOP_LINKS: { slug: string; label: string }[] = [
  { slug: "tshirts-polos", label: "Apparel" },
  { slug: "bottles-mugs", label: "Drinkware" },
  { slug: "office-stationery", label: "Office" },
  { slug: "eco-friendly", label: "Eco" },
  { slug: "corporate-gifting", label: "Gifting" },
];

const HELP_LINKS: { slug: string; label: string }[] = [
  { slug: "shipping", label: "Shipping" },
  { slug: "returns", label: "Returns" },
  { slug: "bulk", label: "Bulk orders" },
  { slug: "custom", label: "Custom print" },
  { slug: "faq", label: "FAQ" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("That email looks quiet. Try a real one.");
      return;
    }
    setSubmitting(true);
    try {
      const key = "ldd-newsletter";
      const list: string[] = JSON.parse(localStorage.getItem(key) ?? "[]");
      if (!list.includes(trimmed)) list.push(trimmed);
      localStorage.setItem(key, JSON.stringify(list));
    } catch {
    }
    setTimeout(() => {
      toast.success("You're in. Drops incoming.");
      setEmail("");
      setSubmitting(false);
    }, 300);
  };

  return (
    <footer className="bg-ink text-cream brutal-border border-x-0 border-b-0 mt-20">
      <div className="checker h-3 opacity-20" />
      <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <Link to="/" className="inline-block">
            <img src={logo} alt="Lumi & Dee-Dee" className="h-16 w-16 brutal-border border-cream" />
          </Link>
          <div className="font-display text-2xl">LUMI & DEE-DEE</div>
          <p className="font-mono-d text-xs uppercase tracking-widest text-cream/70">
            LDD — we print loud merch for brands that refuse to whisper.
          </p>
          <div className="flex gap-2 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="brutal-border border-cream px-3 py-1 font-mono-d text-[10px] uppercase tracking-widest hover:bg-hot transition-colors">IG</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="brutal-border border-cream px-3 py-1 font-mono-d text-[10px] uppercase tracking-widest hover:bg-acid hover:text-ink transition-colors">TT</a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="brutal-border border-cream px-3 py-1 font-mono-d text-[10px] uppercase tracking-widest hover:bg-electric transition-colors">X</a>
          </div>
        </div>
        <div>
          <div className="font-display text-sm uppercase mb-3 text-acid">Shop</div>
          <ul className="space-y-2 font-mono-d text-xs uppercase tracking-widest">
            {SHOP_LINKS.map((l) => (
              <li key={l.slug}>
                <Link to="/category/$slug" params={{ slug: l.slug }} className="hover:text-acid transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/categories" className="hover:text-acid transition-colors">All categories →</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-display text-sm uppercase mb-3 text-hot">Help</div>
          <ul className="space-y-2 font-mono-d text-xs uppercase tracking-widest">
            {HELP_LINKS.map((l) => (
              <li key={l.slug}>
                <Link to="/info/$slug" params={{ slug: l.slug }} className="hover:text-hot transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact" className="hover:text-hot transition-colors">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-display text-sm uppercase mb-3 text-electric">Get loud</div>
          <p className="font-mono-d text-xs uppercase tracking-widest text-cream/70 mb-3">
            Newsletter. No spam. Just drops.
          </p>
          <form onSubmit={handleSubscribe} className="flex">
            <label className="sr-only" htmlFor="ldd-newsletter-email">Email address</label>
            <input
              id="ldd-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-cream text-ink px-3 py-2 font-mono-d text-xs uppercase outline-none disabled:opacity-60"
              placeholder="your@email.com"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-hot text-cream px-4 font-display uppercase hover:bg-electric transition-colors disabled:opacity-60"
            >
              {submitting ? "…" : "Go"}
            </button>
          </form>
          <div className="font-mono-d text-[10px] uppercase tracking-widest text-cream/50 mt-3">
            ldd@unrealcake8.site
          </div>
        </div>
      </div>
      <div className="border-t border-cream/20 py-4 px-4 flex flex-col sm:flex-row gap-2 items-center justify-between font-mono-d text-[10px] uppercase tracking-[0.3em] text-cream/60">
        <div>© {new Date().getFullYear()} LDD — Lumi & Dee-Dee · Since '26</div>
        <div className="flex gap-4">
          <Link to="/info/$slug" params={{ slug: "shipping" }} className="hover:text-cream">Shipping</Link>
          <Link to="/info/$slug" params={{ slug: "returns" }} className="hover:text-cream">Returns</Link>
          <Link to="/contact" className="hover:text-cream">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
