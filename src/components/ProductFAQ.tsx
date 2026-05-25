import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = [
  {
    q: "How long does production take?",
    a: "Most custom orders ship in 5–7 business days. Bulk or complex jobs may take a touch longer — we'll let you know up front.",
  },
  {
    q: "When will it arrive?",
    a: "We ship across the UAE in 2–3 business days after production. So total: usually 7–10 days from order to doorstep.",
  },
  {
    q: "How do I send my design?",
    a: "Add your customization notes at checkout (or in the cart). For complex designs, our team will email you within 24h to confirm artwork.",
  },
  {
    q: "Can I order in bulk?",
    a: "Yes — bulk pricing kicks in automatically and our team will reach out for anything over 50 units. Hit Contact for a custom quote.",
  },
  {
    q: "What's your return policy?",
    a: "Because everything is custom-made for you, we don't accept returns on personalized items. But if something arrives damaged or wrong, we'll fix it free.",
  },
];

export function ProductFAQ() {
  return (
    <div className="brutal-border bg-cream">
      <div className="px-5 py-3 bg-ink text-cream font-display text-lg uppercase">FAQ</div>
      <Accordion type="single" collapsible className="px-5">
        {FAQ.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="font-display uppercase text-left">{item.q}</AccordionTrigger>
            <AccordionContent className="font-serif-d text-base">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
