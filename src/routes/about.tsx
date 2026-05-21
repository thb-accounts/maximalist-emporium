import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About · LDD Loud Design Depot" },
      { name: "description", content: "Loud Design Depot is an anti-minimalist merch shop printing for brands that refuse to whisper." },
    ],
  }),
});

function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="bg-hot text-cream border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="font-mono-d text-xs uppercase tracking-[0.4em] text-acid">About</div>
          <h1 className="font-display text-6xl md:text-9xl uppercase leading-[0.85]">We print loud, so you don't have to shout.</h1>
        </div>
      </section>
      <Marquee items={["Established 2024", "Maximalists welcome", "No beige allowed"]} bg="bg-acid" text="text-ink" />
      <section className="mx-auto max-w-[1000px] w-full px-4 md:px-8 py-16 space-y-6 font-serif-d text-2xl flex-1">
        <p>LDD is short for <strong>Loud Design Depot</strong> — a merch printer for brands, teams, and creators that don't believe in restraint.</p>
        <p>We produce <span className="bg-acid px-2">apparel, drinkware, packaging, eco-gifts, tradeshow gear</span> and 15 more categories of branded chaos. Bulk-friendly. Rush-friendly. Print-on-demand or 10,000 units — pick your scale.</p>
        <p>Our rule of thumb: if it can be branded, screen-printed, embroidered, embossed, etched, sublimated, or stickered — we'll make it loud.</p>
      </section>
      <Footer />
    </div>
  );
}
