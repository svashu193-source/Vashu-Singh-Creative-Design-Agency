import { Sparkles, ArrowUp, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSec = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const pos = elementRect - bodyRect - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="bg-[#0b0015] border-t border-white/5 py-16 text-gray-400">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Segment */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6A0DAD] to-[#b34eff] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-sans font-bold text-lg text-white tracking-tight">
                Vashu Singh
              </span>
            </div>
            
            <p className="text-sm text-gray-500 max-w-sm mb-6 leading-relaxed">
              Premium creative digital agency helping directors, content creators, and corporate brands command extreme audience attention with cinematic asset pipelines.
            </p>
          </div>

          {/* Quick links Col */}
          <div>
            <span className="block text-[10px] font-mono font-bold text-white uppercase tracking-widest mb-4">
              Quick Links
            </span>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <button 
                  onClick={() => scrollToSec('about')} 
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
                >
                  About Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSec('services')} 
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Services Suite
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSec('portfolio')} 
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Creative Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <span className="block text-[10px] font-mono font-bold text-white uppercase tracking-widest mb-4">
              Contact Information
            </span>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li className="flex items-center gap-2 text-white font-semibold">
                SVASHU SINGH
              </li>
              <li>
                <a
                  href="mailto:svashu193@gmail.com"
                  className="hover:text-purple-300 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-purple-400" />
                  svashu193@gmail.com
                </a>
              </li>
              <li className="text-gray-500 text-xs leading-relaxed">
                Days: Monday — Saturday<br />
                Hours: 9:00 AM — 8:00 PM<br />
                Response SLA: Under 12 Hours
              </li>
            </ul>
          </div>

        </div>

        {/* Separator */}
        <div className="h-px bg-white/5 w-full mb-8" />

        {/* Bottom Segment */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs sm:text-sm text-gray-500">
          <div>
            <span>Copyright © 2026 </span>
            <a href="#" className="text-purple-300 hover:underline font-bold">Vashu Singh</a>
            <span>. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 text-purple-300 py-2.5 px-4 rounded-xl border border-white/5 transition-all text-xs cursor-pointer focus:outline-none"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5 text-purple-400 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
