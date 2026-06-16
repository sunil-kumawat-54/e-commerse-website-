import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Image scale effect
    if (imageRef.current) {
      tl.fromTo(imageRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power3.out' },
        0
      );
    }

    // Title reveal
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      tl.fromTo(chars,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: 'power3.out' },
        0.5
      );
    }

    // Subtitle reveal
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        1.2
      );
    }

    // CTA reveal
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        1.5
      );
    }
  }, []);

  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-[#1A1A1A]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          ref={imageRef}
          src="/images/product-01.jpg" 
          alt="Luxury Leather Goods" 
          className="w-full h-full object-cover object-center opacity-70"
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <span 
          className="font-body uppercase text-[#C4A882] mb-6 tracking-[0.3em] text-xs md:text-sm"
        >
          The 2024 Collection
        </span>

        <h1 
          ref={titleRef}
          className="font-display text-[#EFEFEF] text-5xl md:text-7xl lg:text-8xl mb-8 overflow-hidden flex flex-wrap justify-center gap-y-4"
          style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          {/* We'll wrap each word and char for GSAP */}
          {"Timeless Elegance".split(' ').map((word, i) => (
            <span key={i} className="inline-flex mr-4 overflow-hidden">
              {word.split('').map((char, j) => (
                <span key={j} className="char inline-block">{char}</span>
              ))}
            </span>
          ))}
        </h1>

        <p 
          ref={subtitleRef}
          className="font-body text-[#ccc] max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-12"
        >
          Discover our new range of meticulously handcrafted leather bags and accessories. 
          Built to endure, designed to inspire, and guaranteed for a lifetime.
        </p>

        <button 
          ref={ctaRef}
          onClick={scrollToCollection}
          className="group font-body uppercase bg-[#C4A882] text-[#1A1A1A] px-10 py-5 flex items-center gap-4 hover:bg-[#EFEFEF] transition-colors duration-300"
          style={{ fontSize: '11px', letterSpacing: '0.15em' }}
        >
          Shop the Collection
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="font-body text-[#999] uppercase text-[9px] tracking-[0.2em]">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[#C4A882] animate-[scrollIndicator_2s_ease-in-out_infinite]" />
        </div>
      </div>
      
      <style>{`
        @keyframes scrollIndicator {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
