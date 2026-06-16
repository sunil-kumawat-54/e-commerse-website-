import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products, categories } from '../data/products';
import type { Product } from '../data/products';
import { X, ShoppingBag, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CollectionGridProps {
  onAddToCart: (product: Product) => void;
}

export default function CollectionGrid({ onAddToCart }: CollectionGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedId, setAddedId] = useState<number | null>(null);

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleAdd = useCallback((product: Product, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  }, [onAddToCart]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  // Animate grid items when category changes
  useEffect(() => {
    if (!gridRef.current) return;
    
    const items = gridRef.current.children;
    if (items.length === 0) return;

    gsap.fromTo(items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        clearProps: 'all'
      }
    );
  }, [activeCategory]);

  // Initial scroll animation for grid items
  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.children;

    gsap.fromTo(items,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        }
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#EFEFEF] py-24 md:py-32"
    >
      {/* Section header */}
      <div
        ref={headerRef}
        className="px-8 md:px-16 mb-16"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-7xl mx-auto">
          <div>
            <span
              className="font-body uppercase text-[#C4A882] block mb-2"
              style={{ fontSize: '11px', letterSpacing: '0.2em' }}
            >
              2024 Collection
            </span>
            <h2
              className="font-display text-[#1A1A1A] uppercase"
              style={{ fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.01em' }}
            >
              The Collection
            </h2>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="font-body uppercase transition-all duration-300"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  padding: '8px 16px',
                  border: activeCategory === cat ? '1px solid #1A1A1A' : '1px solid #ccc',
                  background: activeCategory === cat ? '#1A1A1A' : 'transparent',
                  color: activeCategory === cat ? '#EFEFEF' : '#666',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="relative z-10 px-8 md:px-16 max-w-7xl mx-auto">
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer flex flex-col"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative overflow-hidden bg-white mb-6" style={{ aspectRatio: '3/4' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quick add button */}
                <button
                  onClick={(e) => handleAdd(product, e)}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-[#1A1A1A] text-[#EFEFEF] flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#C4A882]"
                >
                  {addedId === product.id ? <Check size={18} /> : <ShoppingBag size={18} />}
                </button>
                {/* Stitch decoration */}
                <div
                  className="absolute top-4 left-4 w-8 h-8 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    borderTop: '2px dashed #C4A882',
                    borderLeft: '2px dashed #C4A882',
                  }}
                />
              </div>
              <div className="flex items-start justify-between mt-auto">
                <div>
                  <h3 className="font-display text-[#1A1A1A] text-lg mb-1 group-hover:text-[#C4A882] transition-colors duration-300">{product.name}</h3>
                  <span className="font-body text-[#999] uppercase" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>
                    {product.category}
                  </span>
                </div>
                <span className="font-body text-[#1A1A1A] text-sm mt-1">${product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedProduct(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal content */}
          <div
            className="relative bg-[#EFEFEF] w-full max-w-5xl max-h-[90vh] overflow-auto flex flex-col md:flex-row shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#1A1A1A] text-[#EFEFEF] flex items-center justify-center hover:bg-[#C4A882] transition-colors duration-300"
            >
              <X size={16} />
            </button>

            {/* Image */}
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 lg:p-16" style={{ minHeight: '500px' }}>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-auto max-h-[600px] object-cover"
              />
            </div>

            {/* Details */}
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
              <span
                className="font-body uppercase text-[#C4A882] mb-4 block"
                style={{ fontSize: '11px', letterSpacing: '0.2em' }}
              >
                {selectedProduct.category}
              </span>
              <h2 className="font-display text-[#1A1A1A] text-3xl md:text-4xl mb-6">
                {selectedProduct.name}
              </h2>
              <p className="font-body text-[#666] text-sm leading-relaxed mb-8">
                {selectedProduct.description}
              </p>

              {/* Specs */}
              <div className="mb-10">
                <h4
                  className="font-body uppercase text-[#1A1A1A] mb-4"
                  style={{ fontSize: '11px', letterSpacing: '0.15em' }}
                >
                  Specifications
                </h4>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                  {selectedProduct.details.map((detail, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 bg-[#C4A882] rounded-full flex-shrink-0" />
                      <span className="font-body text-[#666] text-xs">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-8 border-t border-[#ddd] mt-auto">
                <span className="font-display text-[#1A1A1A] text-3xl">
                  ${selectedProduct.price}
                </span>
                <button
                  onClick={() => handleAdd(selectedProduct)}
                  className="font-body uppercase bg-[#1A1A1A] text-[#EFEFEF] px-8 py-4 hover:bg-[#C4A882] transition-all duration-300 flex items-center gap-3"
                  style={{ fontSize: '12px', letterSpacing: '0.1em' }}
                >
                  {addedId === selectedProduct.id ? (
                    <>
                      <Check size={16} />
                      Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
