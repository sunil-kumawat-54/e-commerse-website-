import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, Minus, Plus, Trash2, ShoppingBag, QrCode, MessageCircle } from 'lucide-react';
import type { Product } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, qty: number) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onRemove, onUpdateQuantity }: CartDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [checkoutMode, setCheckoutMode] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;
    if (!drawer || !backdrop) return;

    if (isOpen) {
      gsap.to(backdrop, { opacity: 1, duration: 0.3, ease: 'power2.out', pointerEvents: 'auto' });
      gsap.to(drawer, { x: 0, duration: 0.4, ease: 'power3.out' });
    } else {
      gsap.to(backdrop, { opacity: 0, duration: 0.3, ease: 'power2.in', pointerEvents: 'none' });
      gsap.to(drawer, { x: '100%', duration: 0.4, ease: 'power3.in' });
      // Reset checkout mode when drawer closes
      setTimeout(() => setCheckoutMode(false), 400);
    }
  }, [isOpen]);

  // Group items by id for quantity display
  const itemMap = new Map<number, { product: Product; quantity: number }>();
  items.forEach((item) => {
    const existing = itemMap.get(item.id);
    if (existing) {
      existing.quantity++;
    } else {
      itemMap.set(item.id, { product: item, quantity: 1 });
    }
  });

  const groupedItems = Array.from(itemMap.values());

  const handleWhatsAppNotify = () => {
    const orderDetails = groupedItems
      .map(({ product, quantity }) => `- ${quantity}x ${product.name} ($${product.price})`)
      .join('\n');
    
    const message = `Hello! I would like to place an order:\n\n${orderDetails}\n\nTotal: $${total}\n\nI have completed the payment via UPI to 7878938496@fam. Please confirm!`;
    
    // Using 917878938496 as the default Indian country code assumption based on the UPI number.
    const whatsappUrl = `https://wa.me/917878938496?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm opacity-0 pointer-events-none"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#EFEFEF] z-[201] flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#ddd]">
          <div className="flex items-center gap-3">
            {checkoutMode ? (
              <QrCode size={18} strokeWidth={1.5} className="text-[#1A1A1A]" />
            ) : (
              <ShoppingBag size={18} strokeWidth={1.5} className="text-[#1A1A1A]" />
            )}
            <span className="font-body uppercase text-[#1A1A1A]" style={{ fontSize: '12px', letterSpacing: '0.15em' }}>
              {checkoutMode ? 'Payment Details' : `Your Cart (${items.length})`}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-[#1A1A1A] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-6 py-4">
          {checkoutMode ? (
            <div className="flex flex-col items-center py-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <p className="font-body text-[#666] text-center mb-6 text-sm">
                Please scan the QR code below or use the UPI ID to pay <strong className="text-[#1A1A1A]">${total}</strong>.
              </p>
              
              {/* QR Code Placeholder */}
              <div className="w-48 h-48 bg-white border border-[#ddd] p-4 shadow-sm flex items-center justify-center mb-6 relative overflow-hidden group">
                <img 
                  src="/images/payment-qr.jpg" 
                  alt="Payment QR" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to placeholder if user hasn't uploaded their QR code yet
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="%23ccc" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="3"></rect><rect x="14" y="7" width="3" height="3"></rect><rect x="7" y="14" width="3" height="3"></rect><rect x="14" y="14" width="3" height="3"></rect></svg>';
                  }}
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="bg-white px-6 py-3 border border-[#ddd] mb-8 text-center w-full">
                <span className="font-body text-[#999] uppercase block mb-1" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>UPI ID</span>
                <span className="font-display text-[#1A1A1A] text-lg select-all">7878938496@fam</span>
              </div>

              <div className="w-full space-y-4">
                <button
                  onClick={handleWhatsAppNotify}
                  className="w-full font-body uppercase bg-[#25D366] text-white py-4 hover:bg-[#128C7E] transition-colors duration-300 flex items-center justify-center gap-3"
                  style={{ fontSize: '12px', letterSpacing: '0.1em' }}
                >
                  <MessageCircle size={18} />
                  Notify on WhatsApp
                </button>
                <button
                  onClick={() => setCheckoutMode(false)}
                  className="w-full font-body uppercase text-[#666] py-3 hover:text-[#1A1A1A] transition-colors"
                  style={{ fontSize: '11px', letterSpacing: '0.1em' }}
                >
                  Back to Cart
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} strokeWidth={1} className="text-[#ccc] mb-4" />
              <p className="font-body text-[#999] text-sm">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 font-body uppercase text-[#C4A882] hover:text-[#1A1A1A] transition-colors"
                style={{ fontSize: '11px', letterSpacing: '0.15em' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {groupedItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 pb-6 border-b border-[#eee]">
                  <div className="w-20 h-24 bg-white flex-shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display text-[#1A1A1A] text-sm mb-1">{product.name}</h4>
                      <span className="font-body text-[#999]" style={{ fontSize: '11px' }}>
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center border border-[#ddd] hover:border-[#1A1A1A] transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="font-body text-[#1A1A1A] text-xs w-4 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border border-[#ddd] hover:border-[#1A1A1A] transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-body text-[#1A1A1A] text-sm">
                          ${product.price * quantity}
                        </span>
                        <button
                          onClick={() => onRemove(product.id)}
                          className="text-[#999] hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && !checkoutMode && (
          <div className="px-6 py-5 border-t border-[#ddd] bg-[#EFEFEF]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-body uppercase text-[#666]" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                Subtotal
              </span>
              <span className="font-display text-[#1A1A1A] text-xl">${total}</span>
            </div>
            <button
              className="w-full font-body uppercase bg-[#1A1A1A] text-[#EFEFEF] py-4 hover:bg-[#C4A882] transition-colors duration-300"
              style={{ fontSize: '12px', letterSpacing: '0.1em' }}
              onClick={() => setCheckoutMode(true)}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full font-body uppercase text-[#666] py-3 mt-2 hover:text-[#1A1A1A] transition-colors"
              style={{ fontSize: '11px', letterSpacing: '0.1em' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
