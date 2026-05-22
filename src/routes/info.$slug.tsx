import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type Topic = {
  title: string;
  kicker: string;
  body: { h: string; p: string }[];
};

const TOPICS: Record<string, Topic> = {
  shipping: {
    title: "Shipping",
    kicker: "Loud merch, on the move.",
    body: [
      { h: "Standard", p: "3–6 business days in the US. Free over $250." },
      { h: "Express", p: "1–2 business days. Flat $25 anywhere in the US." },
      { h: "International", p: "7–14 business days. Duties calculated at checkout." },
      { h: "Tracking", p: "You'll get a tracking link the second your order ships." },
    ],
  },
  returns: {
    title: "Returns",
    kicker: "30 days. No interrogation.",
    body: [
      { h: "Window", p: "Return unworn items within 30 days of delivery." },
      { h: "Custom prints", p: "Personalized/bulk-printed orders are final sale unless we made an error." },
      { h: "Process", p: "Email hello@ldd.shop with your order number. We send a prepaid label." },
      { h: "Refund", p: "Refunded to original payment within 5 business days of receiving." },
    ],
  },
  bulk: {
    title: "Bulk Orders",
    kicker: "More is more is more.",
    body: [
      { h: "Tiered pricing", p: "10% off 25+ units. 20% off 100+. 30% off 500+." },
      { h: "Lead times", p: "Standard bulk runs ship in 10–14 business days from artwork approval." },
      { h: "Artwork", p: "Send us AI/EPS/PDF vectors. We'll handle the loud stuff." },
      { h: "Quote", p: "Email bulk@ldd.shop with quantity, product, and deadline." },
    ],
  },
  custom: {
    title: "Custom Print",
    kicker: "Embroidery, screen, DTG, embossed, foil.",
    body: [
      { h: "What we print", p: "Apparel, drinkware, bags, packaging, signage, stickers — almost anything flat or curved." },
      { h: "Minimums", p: "Apparel: 1 unit. Drinkware: 1 unit. Stickers: 1 unit." },
      { h: "Mockups", p: "Free digital mockup within 48 hours of brief." },
      { h: "Brief", p: "Email ldd@unrealcake8.site with product, art, quantities, and deadline." },
    ],
  },
  faq: {
    title: "FAQ",
    kicker: "Loud answers to loud questions.",
    body: [
      { h: "What does LDD stand for?", p: "Lumi & Dee-Dee — our two extremely loud cats. The brand is named after them." },
      { h: "Do you ship internationally?", p: "Yes — we ship worldwide. Duties calculated at checkout." },
      { h: "Can I order just one?", p: "Yes, almost everything is available as a single unit. Custom printing has minimums — see Custom Print." },
      { h: "Do you do rush orders?", p: "Yes, for an extra fee. Email ldd@unrealcake8.site and we'll see what we can do." },
      { h: "Sustainability?", p: "Recycled poly options, and a full eco category. We're not perfect, but we're trying loudly." },
    ],
  },
};

export const Route = createFileRoute("/info/$slug")({
  loader: ({ params }) => {
    const topic = TOPICS[params.slug];
    if (!topic) throw notFound();
    return { topic };
  },
  component: InfoPage,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.topic.title ?? "Info"} — LDD` },
      { name: "description", content: loaderData?.topic.kicker ?? "LDD info page." },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 mx-auto max-w-[800px] w-full px-4 py-20 text-center">
        <div className="font-display text-6xl uppercase mb-4">Not found</div>
        <p className="font-mono-d text-xs uppercase tracking-widest mb-6">That info page doesn't exist.</p>
        <Link to="/" className="brutal-border bg-acid px-4 py-3 font-display uppercase">Home</Link>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 mx-auto max-w-[800px] w-full px-4 py-20 text-center">
        <div className="font-display text-5xl uppercase mb-4">Something broke</div>
        <button onClick={reset} className="brutal-border bg-hot text-cream px-4 py-3 font-display uppercase">Try again</button>
      </div>
      <Footer />
    </div>
  ),
});

function InfoPage() {
  const { topic } = Route.useLoaderData() as { topic: Topic };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="border-b-[3px] border-ink bg-acid">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 py-12">
          <div className="font-mono-d text-xs uppercase tracking-[0.4em] mb-3">Info</div>
          <h1 className="font-display text-6xl md:text-8xl uppercase leading-[0.9]">{topic.title}</h1>
          <p className="font-serif-d text-2xl md:text-3xl mt-4">{topic.kicker}</p>
        </div>
      </section>
      <section className="flex-1 mx-auto max-w-[1200px] w-full px-4 md:px-8 py-12 grid gap-6 md:grid-cols-2">
        {topic.body.map((b, i) => (
          <div
            key={b.h}
            className={`brutal-border p-6 ${i % 3 === 0 ? "bg-cream brutal-shadow" : i % 3 === 1 ? "bg-hot text-cream brutal-shadow-electric" : "bg-electric text-cream brutal-shadow-acid"}`}
          >
            <div className="font-display text-2xl uppercase mb-2">{b.h}</div>
            <p className="font-serif-d text-lg leading-snug">{b.p}</p>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}
