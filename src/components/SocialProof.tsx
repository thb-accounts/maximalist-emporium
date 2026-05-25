import { Instagram, Star } from "lucide-react";

const TILES = ["bg-acid", "bg-hot", "bg-electric", "bg-sky", "bg-cream", "bg-acid", "bg-electric", "bg-hot"];

export function SocialProof() {
  return (
    <section className="mx-auto max-w-[1600px] w-full px-4 md:px-8 py-16">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Reviews placeholder — no fake content */}
        <div>
          <div className="font-mono-d text-xs uppercase tracking-[0.4em] text-ink/60">05 — Reviews</div>
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-6">What people will say</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="brutal-border p-5 bg-cream">
                <div className="flex gap-1 mb-2 text-ink/30">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4" />
                  ))}
                </div>
                <p className="font-serif-d text-lg text-ink/40 italic">No reviews yet — be the first when you order.</p>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram grid placeholder */}
        <div>
          <div className="font-mono-d text-xs uppercase tracking-[0.4em] text-ink/60">06 — Tag us</div>
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-6">
            <Instagram className="inline w-9 h-9 mr-2 -mt-1" />
            @lumianddeedee
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {TILES.map((bg, i) => (
              <a
                key={i}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`aspect-square brutal-border ${bg} flex items-center justify-center text-2xl hover:scale-105 transition-transform`}
                aria-label="Instagram post"
              >
                <Instagram className="w-6 h-6 opacity-50" />
              </a>
            ))}
          </div>
          <p className="font-mono-d text-[10px] uppercase tracking-widest text-ink/50 mt-4">
            Tag #LDDmerch — your fits might land here.
          </p>
        </div>
      </div>
    </section>
  );
}
