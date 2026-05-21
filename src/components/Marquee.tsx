export function Marquee({ items, bg = "bg-ink", text = "text-cream" }: { items: string[]; bg?: string; text?: string }) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className={`${bg} ${text} overflow-hidden border-y-[3px] border-ink py-4`}>
      <div className="marquee flex items-center gap-12 whitespace-nowrap font-display text-3xl uppercase">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            {item}
            <span className="text-hot">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
