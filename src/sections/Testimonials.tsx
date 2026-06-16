import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "James T.",
    product: "The Architect Tote",
    text: "The craftsmanship is unparalleled. I've owned luxury bags triple the price that don't match this quality. It ages beautifully."
  },
  {
    name: "Eleanor W.",
    product: "Heritage Bifold",
    text: "Bought this for my husband. The waxed thread stitching and hand-burnished edges are simply flawless. A true heirloom piece."
  },
  {
    name: "Michael C.",
    product: "Weekender Duffle",
    text: "Traveled across three continents with this bag. It handles abuse with grace and looks better with every scratch. Phenomenal work."
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#EFEFEF] py-32 border-t border-[#ddd]">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="text-center mb-20">
          <span 
            className="font-body uppercase text-[#C4A882] block mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.2em' }}
          >
            Client Stories
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[#1A1A1A]">
            Words of Appreciation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div 
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className="bg-white p-10 relative group hover:-translate-y-2 transition-transform duration-500 shadow-sm hover:shadow-xl"
            >
              {/* Stitch corner accent */}
              <div 
                className="absolute top-4 right-4 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ 
                  borderTop: '2px dashed #C4A882', 
                  borderRight: '2px dashed #C4A882' 
                }} 
              />

              <div className="flex gap-1 mb-6 text-[#1A1A1A]">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} fill="currentColor" />
                ))}
              </div>
              
              <p className="font-body text-[#666] leading-relaxed mb-8 text-sm italic">
                "{review.text}"
              </p>
              
              <div>
                <h4 className="font-display text-[#1A1A1A] text-lg">{review.name}</h4>
                <span className="font-body text-[#999]" style={{ fontSize: '11px' }}>
                  Purchased {review.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
