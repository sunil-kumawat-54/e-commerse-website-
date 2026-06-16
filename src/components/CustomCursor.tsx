import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;
    if (!cursor || !cursorText) return;

    // Hide on touch devices
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
    };

    const onMouseEnterProduct = () => {
      gsap.to(cursor, {
        width: 80,
        height: 80,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(cursorText, {
        opacity: 1,
        duration: 0.2,
      });
    };

    const onMouseLeaveProduct = () => {
      gsap.to(cursor, {
        width: 16,
        height: 16,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(cursorText, {
        opacity: 0,
        duration: 0.2,
      });
    };

    // Track product hover
    const setupProductListeners = () => {
      const products = document.querySelectorAll('[data-cursor="product"]');
      products.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterProduct);
        el.addEventListener('mouseleave', onMouseLeaveProduct);
      });
      return products;
    };

    // Initial setup + mutation observer for dynamic content
    let productElements = setupProductListeners();
    const observer = new MutationObserver(() => {
      productElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterProduct);
        el.removeEventListener('mouseleave', onMouseLeaveProduct);
      });
      productElements = setupProductListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      posRef.current.x += (posRef.current.targetX - posRef.current.x) * 0.15;
      posRef.current.y += (posRef.current.targetY - posRef.current.y) * 0.15;
      cursor.style.transform = `translate(${posRef.current.x - cursor.offsetWidth / 2}px, ${posRef.current.y - cursor.offsetHeight / 2}px)`;
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      productElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterProduct);
        el.removeEventListener('mouseleave', onMouseLeaveProduct);
      });
    };
  }, []);

  // Don't render on touch devices (server-safe)
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center blend-difference"
      style={{
        width: '16px',
        height: '16px',
        backgroundColor: '#fff',
        willChange: 'transform',
      }}
    >
      <span
        ref={cursorTextRef}
        className="font-body uppercase text-[#1A1A1A] opacity-0"
        style={{ fontSize: '9px', letterSpacing: '0.1em' }}
      >
        VIEW
      </span>
    </div>
  );
}
