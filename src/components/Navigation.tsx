import { useEffect, useState } from 'react';
import { ShoppingBag, Menu, X, User } from 'lucide-react';

interface NavigationProps {
  cartCount: number;
  onCartClick: () => void;
  onLoginClick: () => void;
}

export default function Navigation({ cartCount, onCartClick, onLoginClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  const navClasses = isScrolled 
    ? 'bg-[#EFEFEF]/95 backdrop-blur-md text-[#1A1A1A] shadow-sm' 
    : 'bg-transparent text-[#EFEFEF]';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${navClasses}`}>
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-2xl tracking-tight hover:text-[#C4A882] transition-colors duration-300"
        >
          STITCH
        </button>

        <div className="hidden md:flex items-center gap-10">
          {['Craftsmanship', 'Collection', 'About'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="font-body uppercase relative group hover:text-[#C4A882] transition-colors duration-300"
              style={{ fontSize: '11px', letterSpacing: '0.15em' }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C4A882] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={onLoginClick}
            className="relative w-10 h-10 flex items-center justify-center hover:text-[#C4A882] transition-colors duration-300"
            aria-label="Account"
          >
            <User size={18} strokeWidth={1.5} />
          </button>

          <button
            onClick={onCartClick}
            className="relative w-10 h-10 flex items-center justify-center hover:text-[#C4A882] transition-colors duration-300"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 bg-[#C4A882] text-[#EFEFEF] rounded-full flex items-center justify-center font-body shadow-md"
                style={{ fontSize: '9px' }}
              >
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center hover:text-[#C4A882] transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#1A1A1A] px-6 py-8 text-[#EFEFEF] border-t border-[#333]">
          {['Craftsmanship', 'Collection', 'About'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="block w-full text-left font-body uppercase py-4 border-b border-[#333] hover:text-[#C4A882] transition-colors"
              style={{ fontSize: '13px', letterSpacing: '0.15em' }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
