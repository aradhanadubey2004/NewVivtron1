import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, Phone, MessageCircle, Sparkles } from 'lucide-react';

interface FloatingHoverButtonProps {
  showQuickCall?: boolean;
  phoneNumber?: string;
  scrollContainerSelector?: string;
}

export const FloatingHoverButton: React.FC<FloatingHoverButtonProps> = ({
  showQuickCall = true,
  phoneNumber = '0120-4144584',
  scrollContainerSelector,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const findScrollParent = (): HTMLElement | null => {
      if (scrollContainerSelector) {
        return document.querySelector<HTMLElement>(scrollContainerSelector);
      }
      let current = containerRef.current?.parentElement;
      while (current && current !== document.body) {
        const overflow = window.getComputedStyle(current).overflowY;
        if (overflow === 'auto' || overflow === 'scroll') {
          return current;
        }
        current = current.parentElement;
      }
      return null;
    };

    const scrollParent = findScrollParent();

    const handleScroll = () => {
      const parentScroll = scrollParent ? scrollParent.scrollTop : 0;
      const windowScroll = window.scrollY || document.documentElement.scrollTop;
      const scrollPos = Math.max(parentScroll, windowScroll);

      setIsVisible(scrollPos > 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (scrollParent) {
      scrollParent.addEventListener('scroll', handleScroll, { passive: true });
    }
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollParent) {
        scrollParent.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollContainerSelector]);

  const scrollToTop = () => {
    let current = containerRef.current?.parentElement;
    let found = false;
    while (current && current !== document.body) {
      const overflow = window.getComputedStyle(current).overflowY;
      if (overflow === 'auto' || overflow === 'scroll') {
        current.scrollTo({ top: 0, behavior: 'smooth' });
        found = true;
        break;
      }
      current = current.parentElement;
    }
    if (!found) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* Optional Quick Call / WhatsApp Hover Pill */}
      {showQuickCall && (
        <a
          href={`tel:${phoneNumber.replace(/[^0-9]/g, '')}`}
          className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[#081E3E] text-xs font-bold shadow-lg shadow-black/10 hover:shadow-xl hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
          title={`Call Vivtron Helpline: ${phoneNumber}`}
        >
          <div className="w-5 h-5 rounded-full bg-[#2EB85C] text-white flex items-center justify-center text-[10px] shadow-xs group-hover:rotate-12 transition-transform">
            <Phone className="w-2.5 h-2.5" />
          </div>
          <span className="hidden sm:inline text-slate-700 group-hover:text-[#2EB85C] transition-colors">
            Helpline: {phoneNumber}
          </span>
          <span className="w-2 h-2 rounded-full bg-[#2EB85C] animate-pulse"></span>
        </a>
      )}

      {/* Main Floating Hover Button (Scroll To Top) */}
      <div className="relative pointer-events-auto">
        {/* Subtle glowing ring pulse */}
        {isVisible && (
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#2EB85C] to-[#1E60D5] opacity-40 blur-xs animate-pulse pointer-events-none"></span>
        )}

        {/* Tooltip on Hover */}
        {isHovered && isVisible && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#081E3E] text-white text-[11px] font-bold whitespace-nowrap shadow-md pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            Scroll to Top
            <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-[#081E3E]"></div>
          </div>
        )}

        <button
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Scroll to Top"
          title="Back to Top"
          className={`w-12 h-12 rounded-full bg-gradient-to-tr from-[#081E3E] via-[#0D2E5E] to-[#1E60D5] text-white flex items-center justify-center shadow-xl shadow-[#081E3E]/40 border-2 border-white/20 transition-all duration-300 cursor-pointer group ${
            isVisible
              ? 'opacity-100 scale-100 translate-y-0 hover:scale-115 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1E60D5]/50'
              : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
          }`}
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
};
