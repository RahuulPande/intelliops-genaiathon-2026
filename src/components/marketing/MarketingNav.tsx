'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { label: 'Platform', sectionId: 'platform' },
  { label: 'Capabilities', sectionId: 'capabilities' },
  { label: 'Layers', sectionId: 'layers' },
];

export default function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0E1A]/95 backdrop-blur-lg border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="font-[family-name:var(--font-display)] text-xl text-white">
          IntelliOps<span className="text-[#0AEFCF]">AI</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.sectionId}
              onClick={() => scrollTo(link.sectionId)}
              className="text-[#94A3B8] hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { window.location.href = '/showcase'; }}
            className="text-[#0AEFCF] hover:text-white text-sm font-medium transition-colors"
          >
            Showcase ✦
          </button>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => { window.location.href = '/login'; }}
            className="text-[#94A3B8] hover:text-white text-sm font-medium transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => scrollTo('demo')}
            className="bg-[#D4A843] text-[#0A0E1A] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#E5B954] transition-colors text-sm"
          >
            Request Demo
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#0A0E1A]/95 backdrop-blur-lg border-b border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => scrollTo(link.sectionId)}
                  className="text-[#94A3B8] hover:text-white text-sm font-medium text-left py-2 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { window.location.href = '/showcase'; setMobileOpen(false); }}
                className="text-[#0AEFCF] hover:text-white text-sm font-medium text-left py-2 transition-colors"
              >
                Showcase ✦
              </button>
              <hr className="border-white/10 my-2" />
              <button
                onClick={() => { window.location.href = '/login'; }}
                className="text-[#94A3B8] hover:text-white text-sm font-medium text-left py-2 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => { scrollTo('demo'); setMobileOpen(false); }}
                className="bg-[#D4A843] text-[#0A0E1A] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#E5B954] transition-colors text-sm w-full mt-1"
              >
                Request Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
