export default function MarqueeBanner() {
  const words = [
    "HANDCRAFTED", "FULL-GRAIN LEATHER", "WAXED THREAD", 
    "BRASS HARDWARE", "LIFETIME WARRANTY", "ARTISAN MADE"
  ];
  
  // Duplicate for seamless scroll
  const marqueeItems = [...words, ...words, ...words, ...words];

  return (
    <section className="bg-[#1A1A1A] py-8 overflow-hidden border-y border-[#333]">
      <div className="flex whitespace-nowrap animate-marquee w-[200%]">
        {marqueeItems.map((word, i) => (
          <div key={i} className="flex items-center mx-8">
            <span 
              className="font-display text-[#EFEFEF] uppercase tracking-widest text-xl md:text-2xl"
            >
              {word}
            </span>
            <div className="w-2 h-2 rounded-full bg-[#C4A882] mx-12 opacity-50" />
          </div>
        ))}
      </div>
    </section>
  );
}
