import { motion } from 'motion/react';
import { Play, ArrowRight, Compass, Users } from 'lucide-react';

interface HeroProps {
  onGetStartedClick: () => void;
  onViewPortfolioClick: () => void;
  onAboutUsClick: () => void;
}

export default function Hero({
  onGetStartedClick,
  onViewPortfolioClick,
  onAboutUsClick
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1b003a] via-[#35035e] to-[#0f0022]"
    >
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#4B0082]/30 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] bg-[#6A0DAD]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Grid Mesh */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Creative Micro-badge */}
          <motion.div
            id="hero-micro-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-md mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span className="font-mono text-xs text-purple-200 tracking-wider font-semibold uppercase">
              Vashu Singh • Elite Creative Studio
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            id="hero-main-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-6"
          >
            Transforming Ideas Into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-white drop-shadow-sm font-black">
              Powerful Visual Brands
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            id="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-purple-200/80 font-medium leading-relaxed max-w-2xl mb-10"
          >
            Professional Video Editing, Photo Retouching, and Brand Design Services
          </motion.p>

          {/* CTA Group */}
          <motion.div
            id="hero-cta-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              id="hero-btn-get-started"
              onClick={onGetStartedClick}
              className="group flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#6A0DAD] to-[#8a1cfd] text-white font-semibold py-4 px-8 rounded-full hover:shadow-lg hover:shadow-purple-700/30 active:scale-95 transition-all text-base cursor-pointer"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              id="hero-btn-portfolio"
              onClick={onViewPortfolioClick}
              className="group flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-semibold py-4 px-8 rounded-full active:scale-95 transition-all text-base backdrop-blur-sm cursor-pointer"
            >
              <Compass className="w-5 h-5 text-purple-300" />
              View Portfolio
            </button>

            <button
              id="hero-btn-about"
              onClick={onAboutUsClick}
              className="group flex items-center justify-center gap-2.5 bg-transparent hover:bg-purple-500/10 text-purple-200 hover:text-white font-semibold py-4 px-6 rounded-full active:scale-95 transition-all text-base cursor-pointer"
            >
              <Users className="w-5 h-5 text-purple-300" />
              About Us
            </button>
          </motion.div>
        </div>

        {/* Right Area - Visual Frame Mockup */}
        <div className="lg:col-span-5 flex justify-center relative">
          <motion.div
            id="hero-visual-frame"
            initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative w-full max-w-[440px] aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-purple-500/30 to-white/10 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-950/50"
          >
            {/* Main Generated Workspace Image */}
            <img
              src="/src/assets/images/agency_hero_1781314843970.jpg"
              alt="Vashu Singh Digital Agency Workspace Mockup"
              className="w-full h-full object-cover rounded-[1.25rem] transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Glowing Accent Ring */}
            <div className="absolute inset-0 border border-purple-500/30 rounded-3xl pointer-events-none" />

            {/* Float Badge 1 (Live Statistics / Quality Badge) */}
            <div 
              id="hero-badge-1"
              className="absolute -bottom-4 -left-4 bg-[#120022]/90 backdrop-blur-md border border-purple-500/30 rounded-2xl p-4 flex items-center gap-3 shadow-xl pointer-events-none"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                <Play className="w-5 h-5 text-purple-300 fill-purple-300/30" />
              </div>
              <div>
                <span className="block text-xs font-mono text-purple-300 uppercase tracking-widest font-semibold">Projects Completed</span>
                <span className="block text-lg font-sans font-extrabold text-white">150+ Happy Clients</span>
              </div>
            </div>

            {/* Float Badge 2 (Fast Delivery Accent) */}
            <div
              id="hero-badge-2"
              className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md border border-purple-200 rounded-2xl py-2 px-4 shadow-xl pointer-events-none"
            >
              <span className="font-sans text-xs text-black font-extrabold flex items-center gap-1.5 uppercase tracking-wide">
                ⚡ 100% On Time
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
