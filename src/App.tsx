import { useState, useCallback, useEffect } from 'react';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import HeroSection from './sections/HeroSection';
import MarqueeBanner from './sections/MarqueeBanner';
import CraftsmanshipSection from './sections/CraftsmanshipSection';
import FeaturedProduct from './sections/FeaturedProduct';
import CollectionGrid from './sections/CollectionGrid';
import Testimonials from './sections/Testimonials';
import FooterSection from './sections/FooterSection';
import type { Product } from './data/products';

export default function App() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => [...prev, product]);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) return prev;
      const newItems = [...prev];
      newItems.splice(index, 1);
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback((id: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      const product = prev.find((item) => item.id === id);
      if (!product) return prev;
      const newItems: Product[] = [];
      for (let i = 0; i < qty; i++) {
        newItems.push(product);
      }
      return [...filtered, ...newItems];
    });
  }, [removeFromCart]);

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative">
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation
        cartCount={cartItems.length}
        onCartClick={() => setCartOpen(true)}
        onLoginClick={() => setAuthOpen(true)}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
      />

      {/* Cart drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      {/* Page loader */}
      <PageLoader />

      {/* Main content */}
      <main>
        {/* Hero - The Manifesto */}
        <HeroSection />

        {/* Marquee */}
        <MarqueeBanner />

        {/* Craftsmanship */}
        <CraftsmanshipSection />

        {/* Featured Product */}
        <FeaturedProduct />

        {/* Collection Grid */}
        <div id="collection">
          <CollectionGrid onAddToCart={addToCart} />
        </div>

        {/* Testimonials */}
        <Testimonials />

        {/* Footer */}
        <FooterSection />
      </main>
    </div>
  );
}

function PageLoader() {
  const [visible, setVisible] = useState(true);
  const loaderRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    // Animate out after a brief moment
    const timer = setTimeout(() => {
      node.style.transition = 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)';
      node.style.transform = 'translateY(-100%)';
      setTimeout(() => setVisible(false), 800);
    }, 1500); // Increased time slightly for a more premium feel
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[1000] bg-[#1A1A1A] flex flex-col items-center justify-center"
    >
      <div className="text-center">
        <h1
          className="font-display text-[#EFEFEF]"
          style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            letterSpacing: '0.1em',
            animation: 'fadeInOut 2s ease-in-out infinite',
          }}
        >
          STITCH
        </h1>
        <div
          className="mt-6 w-0 h-[2px] bg-[#C4A882] mx-auto"
          style={{
            animation: 'loaderProgress 1.5s cubic-bezier(0.76, 0, 0.24, 1) forwards',
          }}
        />
      </div>
      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes loaderProgress {
          0% { width: 0%; }
          100% { width: 120px; }
        }
      `}</style>
    </div>
  );
}
