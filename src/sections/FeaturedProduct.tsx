import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProduct() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    
    if (!section || !image || !content) return;

    // Image Parallax
    gsap.fromTo(image, 
      { y: -50, scale: 1.1 },
      {
        y: 50,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    // Content fade in
    gsap.fromTo(content,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: content,
          start: 'top 80%',
        }
      }
    );

    // Stats stagger
    statsRef.current.forEach((stat, i) => {
      if (!stat) return;
      gsap.fromTo(stat,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2 + (i * 0.1),
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
          }
        }
      );
    });

  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#EFEFEF] py-24 md:py-0 overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen overflow-hidden relative">
          <img 
            ref={imageRef}
            src="/images/product-08.jpg" 
            alt="The Executive Briefcase" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white z-10">
          <div ref={contentRef} className="max-w-xl">
            <span 
              className="font-body uppercase text-[#C4A882] block mb-4"
              style={{ fontSize: '11px', letterSpacing: '0.2em' }}
            >
              Masterpiece Collection
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-6">
              The Executive Briefcase
            </h2>
            <p className="font-body text-[#666] leading-relaxed mb-10 text-base">
              Command the boardroom. Structured rectangular body with dual brass clasp closures and a leather-wrapped handle. A testament to uncompromising quality, built to stand as a legacy piece.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div ref={el => { statsRef.current[0] = el; }}>
                <div className="font-display text-4xl text-[#1A1A1A] mb-2">200+</div>
                <div className="font-body text-[#999] uppercase text-[10px] tracking-widest">Hours of Craft</div>
              </div>
              <div ref={el => { statsRef.current[1] = el; }}>
                <div className="font-display text-4xl text-[#1A1A1A] mb-2">25yr</div>
                <div className="font-body text-[#999] uppercase text-[10px] tracking-widest">Atelier Warranty</div>
              </div>
            </div>

            <button 
              className="group font-body uppercase bg-[#1A1A1A] text-[#EFEFEF] px-8 py-5 flex items-center gap-4 hover:bg-[#C4A882] transition-colors duration-300"
              style={{ fontSize: '11px', letterSpacing: '0.15em' }}
            >
              Discover the Briefcase
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
