import { Truck, ShieldCheck, Sparkles, Zap, Brush } from "lucide-react";

const ITEMS = [
  { icon: Truck, label: "Ships across UAE" },
  { icon: ShieldCheck, label: "Secure checkout" },
  { icon: Sparkles, label: "Made to order" },
  { icon: Zap, label: "Fast production" },
  { icon: Brush, label: "Quality printing" },
];

export function TrustStrip() {
  return (
    <section className="bg-ink text-cream py-6 brutal-border border-x-0">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-acid shrink-0" strokeWidth={2.5} />
            <span className="font-mono-d text-[11px] uppercase tracking-widest leading-tight">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
