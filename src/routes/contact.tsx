import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact · LDD Loud Design Depot" },
      { name: "description", content: "Get a quote, request bulk pricing or send custom artwork to LDD." },
    ],
  }),
});

function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="mx-auto max-w-[1200px] w-full px-4 md:px-8 py-16 flex-1 grid md:grid-cols-2 gap-10">
        <div>
          <div className="font-mono-d text-xs uppercase tracking-[0.4em]">Talk to us</div>
          <h1 className="font-display text-6xl md:text-7xl uppercase leading-[0.9]">Hit us <span className="text-hot">loud.</span></h1>
          <div className="mt-8 space-y-3 font-mono-d text-sm uppercase tracking-widest">
            <div className="brutal-border p-4 bg-acid">hello@ldd.shop</div>
            <div className="brutal-border p-4 bg-electric text-cream">+1 (212) 555-LOUD</div>
            <div className="brutal-border p-4 bg-cream">depot 9, brooklyn ny</div>
          </div>
        </div>
        <form className="brutal-border brutal-shadow-hot bg-cream p-6 space-y-4">
          <div>
            <label className="font-mono-d text-[10px] uppercase tracking-widest">Name</label>
            <input className="w-full brutal-border bg-cream px-3 py-2 mt-1 outline-none" />
          </div>
          <div>
            <label className="font-mono-d text-[10px] uppercase tracking-widest">Email</label>
            <input type="email" className="w-full brutal-border bg-cream px-3 py-2 mt-1 outline-none" />
          </div>
          <div>
            <label className="font-mono-d text-[10px] uppercase tracking-widest">Project</label>
            <textarea rows={5} className="w-full brutal-border bg-cream px-3 py-2 mt-1 outline-none resize-none" />
          </div>
          <button type="button" className="w-full bg-ink text-cream font-display uppercase py-3 brutal-border hover:bg-hot">Send it loud</button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
