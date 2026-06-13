import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

interface HeaderProps {
  onContactClick: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1a052e]/85 backdrop-blur-md border-b border-purple-500/20 shadow-lg shadow-purple-950/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          id="logo-link"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6A0DAD] to-[#b34eff] flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <span className="font-sans font-bold text-xl text-white tracking-tight block group-hover:text-purple-300 transition-colors">
              Vashu Singh
            </span>
            <span className="font-mono text-[9px] text-purple-300/80 tracking-[0.2em] font-medium block uppercase -mt-0.5">
              Creative Agency
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          {[
            { label: 'Home', id: 'hero' },
            { label: 'About', id: 'about' },
            { label: 'Services', id: 'services' },
            { label: 'Portfolio', id: 'portfolio' },
            { label: 'Why Us', id: 'why-choose-us' }
          ].map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => scrollToSection(item.id)}
              className="text-gray-300 hover:text-white font-medium text-sm transition-colors cursor-pointer relative py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-400 rounded-md px-2"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            id="header-cta"
            onClick={onContactClick}
            className="group flex items-center gap-2 bg-white text-black font-semibold text-sm py-2.5 px-5 rounded-full hover:bg-purple-100 transition-all shadow-md shadow-purple-950/20 active:scale-95 cursor-pointer"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4 text-purple-700 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-trigger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-purple-300 transition-colors focus:ring-1 focus:ring-purple-400 rounded-lg"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#150325] border-b border-purple-500/20 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {[
                { label: 'Home', id: 'hero' },
                { label: 'About', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Portfolio', id: 'portfolio' },
                { label: 'Why Choose Us', id: 'why-choose-us' }
              ].map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-gray-300 hover:text-white text-lg font-medium py-2 border-b border-purple-500/5 focus:outline-none"
                >
                  {item.label}
                </button>
              ))}
              <button
                id="mobile-header-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#6A0DAD] to-[#8d2ef0] text-white font-semibold py-3 px-6 rounded-xl hover:brightness-110 active:scale-95"
              >
                Let's Build Something
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
