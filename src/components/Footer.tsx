import logo from "@/assets/ldd-logo.png";

export function Footer() {
  return (
    <footer className="bg-ink text-cream brutal-border border-x-0 border-b-0 mt-20">
      <div className="checker h-3 opacity-20" />
      <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <img src={logo} alt="Lumi & Dee-Dee" className="h-16 w-16 brutal-border border-cream" />
          <div className="font-display text-2xl">LUMI & DEE-DEE</div>
          <p className="font-mono-d text-xs uppercase tracking-widest text-cream/70">
            We print loud merch for brands that refuse to whisper.
          </p>
        </div>
        <div>
          <div className="font-display text-sm uppercase mb-3 text-acid">Shop</div>
          <ul className="space-y-2 font-mono-d text-xs uppercase tracking-widest">
            <li>Apparel</li>
            <li>Drinkware</li>
            <li>Office</li>
            <li>Eco</li>
            <li>Gifting</li>
          </ul>
        </div>
        <div>
          <div className="font-display text-sm uppercase mb-3 text-hot">Help</div>
          <ul className="space-y-2 font-mono-d text-xs uppercase tracking-widest">
            <li>Shipping</li>
            <li>Returns</li>
            <li>Bulk orders</li>
            <li>Custom print</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <div className="font-display text-sm uppercase mb-3 text-electric">Get loud</div>
          <p className="font-mono-d text-xs uppercase tracking-widest text-cream/70 mb-3">
            Newsletter. No spam. Just drops.
          </p>
          <div className="flex">
            <input className="flex-1 bg-cream text-ink px-3 py-2 font-mono-d text-xs uppercase outline-none" placeholder="your@email.com" />
            <button className="bg-hot text-cream px-4 font-display uppercase">Go</button>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/20 py-4 text-center font-mono-d text-[10px] uppercase tracking-[0.3em] text-cream/60">
        © {new Date().getFullYear()} Lumi & Dee-Dee · All caps, all the time.
      </div>
    </footer>
  );
}
