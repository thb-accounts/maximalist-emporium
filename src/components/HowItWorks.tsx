import { MousePointerClick, Palette, Truck } from "lucide-react";

const STEPS = [
  { n: "01", icon: MousePointerClick, title: "Pick your item", body: "Browse tees, mugs, bags, tech, gifts — find the one that's calling you." },
  { n: "02", icon: Palette, title: "Customize it", body: "Add your name, photo, slogan, cat — whatever makes it yours." },
  { n: "03", icon: Truck, title: "We print & ship", body: "Made-to-order in the UAE. On your doorstep in days, not weeks." },
];

export function HowItWorks() {
  return (
    <section className="bg-cream brutal-border border-x-0 py-16">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="mb-10">
          <div className="font-mono-d text-xs uppercase tracking-[0.4em] text-ink/60">03 — How it works</div>
          <h2 className="font-display text-5xl md:text-6xl uppercase">Three steps. Done.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const tints = ["bg-acid", "bg-hot text-cream", "bg-electric text-cream"];
            return (
              <div key={s.n} className={`brutal-border brutal-shadow p-6 ${tints[i]}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="font-display text-5xl">{s.n}</div>
                  <Icon className="w-10 h-10" strokeWidth={2.5} />
                </div>
                <h3 className="font-display text-2xl uppercase mb-2">{s.title}</h3>
                <p className="font-serif-d text-lg leading-snug">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
