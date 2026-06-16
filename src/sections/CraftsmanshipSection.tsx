import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scissors, ShieldCheck, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CraftsmanshipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const bgText = bgTextRef.current;
    if (!section || !bgText) return;

    // Parallax background text
    gsap.to(bgText, {
      y: -150,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Stagger cards
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(card, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section || cardsRef.current.includes(st.trigger as any)) {
          st.kill();
        }
      });
    };
  }, []);

  const features = [
    {
      title: "Full-Grain Hides",
      icon: Scissors,
      desc: "We source only the top layer of the hide, retaining its natural grain, durability, and unique character marks."
    },
    {
      title: "Hand-Burnished",
      icon: ShieldCheck,
      desc: "Every edge is sanded, beveled, and burnished by hand with beeswax to seal the leather and prevent fraying."
    },
    {
      title: "Built for Generations",
      icon: Clock,
      desc: "Our waxed thread saddle stitching ensures that even if one stitch breaks, the seam remains completely intact."
    }
  ];

  return (
    <section 
      id="craftsmanship"
      ref={sectionRef} 
      className="relative bg-[#1A1A1A] text-[#EFEFEF] py-32 md:py-48 overflow-hidden"
    >
      {/* Massive Background Text */}
      <div 
        ref={bgTextRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none"
      >
        <h2 className="font-display text-[20vw] leading-none tracking-tighter whitespace-nowrap">
          ATELIER
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
        <div className="mb-24 text-center">
          <span 
            className="font-body uppercase text-[#C4A882] block mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.2em' }}
          >
            The Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
            Uncompromising Craftsmanship
          </h2>
          <p className="font-body text-[#999] max-w-xl mx-auto leading-relaxed">
            There are faster ways to make leather goods. There are cheaper ways. We choose the right way—a meticulous process honed over decades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feat, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="group relative"
            >
              {/* Vertical line connector (desktop only) */}
              {index !== 2 && (
                <div className="hidden md:block absolute top-12 right-[-24px] lg:right-[-32px] w-[1px] h-24 bg-[#333]" />
              )}
              
              <div className="w-16 h-16 rounded-full border border-[#333] flex items-center justify-center mb-8 group-hover:border-[#C4A882] group-hover:text-[#C4A882] transition-colors duration-500">
                <feat.icon strokeWidth={1.5} size={24} />
              </div>
              
              <h3 className="font-display text-2xl mb-4">{feat.title}</h3>
              <p className="font-body text-[#999] leading-relaxed text-sm">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
