import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Mail, Lock, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const modal = modalRef.current;
    
    if (!backdrop || !modal) return;

    if (isOpen) {
      gsap.to(backdrop, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
      gsap.fromTo(modal, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      gsap.to(backdrop, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
      gsap.to(modal, { y: 20, opacity: 0, duration: 0.3, ease: 'power2.in' });
      // Reset to login view when closed
      setTimeout(() => setIsLogin(true), 300);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    alert(isLogin ? "Logged in successfully!" : "Account created successfully!");
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        ref={backdropRef}
        className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Container */}
        <div 
          ref={modalRef}
          className="bg-[#EFEFEF] w-full max-w-md relative shadow-2xl opacity-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-[#999] hover:text-[#1A1A1A] transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="font-display text-[#1A1A1A] text-3xl mb-2">
                {isLogin ? 'Welcome Back' : 'Join STITCH'}
              </h2>
              <p className="font-body text-[#666] text-sm">
                {isLogin 
                  ? 'Enter your details to access your account.' 
                  : 'Create an account for faster checkout and exclusive offers.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-[#999]" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required
                    className="w-full bg-white border border-[#ddd] px-10 py-3 font-body text-sm text-[#1A1A1A] outline-none focus:border-[#C4A882] transition-colors placeholder:text-[#999]"
                  />
                </div>
              )}
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-[#999]" />
                </div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  className="w-full bg-white border border-[#ddd] px-10 py-3 font-body text-sm text-[#1A1A1A] outline-none focus:border-[#C4A882] transition-colors placeholder:text-[#999]"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-[#999]" />
                </div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  required
                  className="w-full bg-white border border-[#ddd] px-10 py-3 font-body text-sm text-[#1A1A1A] outline-none focus:border-[#C4A882] transition-colors placeholder:text-[#999]"
                />
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="font-body text-[#666] hover:text-[#C4A882] text-xs transition-colors">
                    Forgot Password?
                  </button>
                </div>
              )}

              <button 
                type="submit"
                className="w-full font-body uppercase bg-[#1A1A1A] text-[#EFEFEF] py-4 mt-2 hover:bg-[#C4A882] transition-colors duration-300"
                style={{ fontSize: '12px', letterSpacing: '0.1em' }}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-[#ddd] pt-6">
              <p className="font-body text-[#666] text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#1A1A1A] hover:text-[#C4A882] transition-colors font-medium ml-1"
                >
                  {isLogin ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
