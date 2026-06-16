import { useState } from 'react';
import { Instagram, Twitter, Mail, ArrowRight } from 'lucide-react';

export default function FooterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer id="about" className="bg-[#1A1A1A] text-[#EFEFEF]">
      {/* Newsletter */}
      <div className="px-8 md:px-16 py-20 md:py-32 border-b border-[#333]">
        <div className="max-w-2xl mx-auto text-center">
          <span
            className="font-body uppercase text-[#C4A882] block mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.2em' }}
          >
            Stay Connected
          </span>
          <h2
            className="font-display text-3xl md:text-4xl mb-6"
            style={{ letterSpacing: '-0.01em' }}
          >
            Join the Atelier
          </h2>
          <p className="font-body text-[#999] text-sm leading-relaxed mb-10 max-w-md mx-auto">
            Be the first to know about new collections, limited editions, and the stories behind our craft. No noise, only substance.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-transparent border border-[#444] px-5 py-4 font-body text-sm text-[#EFEFEF] placeholder:text-[#666] focus:outline-none focus:border-[#C4A882] transition-colors"
                required
              />
              {/* Stitch detail */}
              <div
                className="absolute top-2 left-2 w-3 h-3"
                style={{
                  borderTop: '1px dashed #C4A882',
                  borderLeft: '1px dashed #C4A882',
                  opacity: 0.5,
                }}
              />
            </div>
            <button
              type="submit"
              className="bg-[#C4A882] text-[#1A1A1A] px-6 py-4 font-body uppercase flex items-center justify-center gap-2 hover:bg-[#EFEFEF] transition-colors duration-300"
              style={{ fontSize: '11px', letterSpacing: '0.1em' }}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl mb-4">STITCH</h3>
            <p className="font-body text-[#999] text-xs leading-relaxed mb-6">
              Precision crafted leather goods, hand-stitched with waxed thread and built to last a lifetime.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-[#444] flex items-center justify-center text-[#999] hover:text-[#C4A882] hover:border-[#C4A882] transition-all duration-300"
                >
                  <Icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              className="font-body uppercase text-[#EFEFEF] mb-6"
              style={{ fontSize: '11px', letterSpacing: '0.2em' }}
            >
              Shop
            </h4>
            <ul className="space-y-3">
              {['All Collection', 'Bags', 'Wallets', 'Accessories', 'Travel'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-body text-[#999] text-xs hover:text-[#C4A882] transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-body uppercase text-[#EFEFEF] mb-6"
              style={{ fontSize: '11px', letterSpacing: '0.2em' }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {['Our Story', 'Craftsmanship', 'Sustainability', 'Care Guide', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-body text-[#999] text-xs hover:text-[#C4A882] transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-body uppercase text-[#EFEFEF] mb-6"
              style={{ fontSize: '11px', letterSpacing: '0.2em' }}
            >
              Support
            </h4>
            <ul className="space-y-3">
              {['Shipping', 'Returns', 'FAQ', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-body text-[#999] text-xs hover:text-[#C4A882] transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="px-8 md:px-16 py-6 border-t border-[#333]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[#666]" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>
            &copy; 2024 STITCH Leatherworks. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="font-body text-[#666]" style={{ fontSize: '10px' }}>
              Handcrafted with
            </span>
            <div
              className="w-6 h-[1px]"
              style={{ background: '#C4A882' }}
            />
            <span className="font-body text-[#C4A882]" style={{ fontSize: '10px' }}>
              precision
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
