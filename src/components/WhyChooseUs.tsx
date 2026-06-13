import { motion } from 'motion/react';
import { Zap, Award, Coins, MessageSquareHeart, CheckCircle2, ChevronRight } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      id: 'fast-del',
      title: 'Fast Delivery',
      subtitle: 'Average 24h - 48h turnaround',
      description: 'Your editorial queues and marketing launches operate on a tight schedule. We prioritize fast turnaround times without compromising our creative parameters.',
      icon: Zap,
      metric: '⚡ FASTEST',
      color: 'from-orange-500/20 to-yellow-500/10 hover:border-orange-500/30'
    },
    {
      id: 'creative-ex',
      title: 'Creative Excellence',
      subtitle: 'Original custom layouts only',
      description: 'We do not run cookie-cutter designs or basic canvas templates. Every brand monogram, thumbnail warp, or cinematic edit is created entirely from a blank canvas.',
      icon: Award,
      metric: '🏆 UNIQUE',
      color: 'from-purple-500/20 to-pink-500/10 hover:border-purple-500/30'
    },
    {
      id: 'afford-price',
      title: 'Affordable Pricing',
      subtitle: 'Luxury work on small budgets',
      description: 'Highly competitive packages made transparent. No hidden royalty fees, no surprise revisions charges. Choose a streamlined plan or monthly support queue.',
      icon: Coins,
      metric: '💎 VALUE',
      color: 'from-green-500/20 to-emerald-500/10 hover:border-green-500/30'
    },
    {
      id: 'prof-supp',
      title: 'Professional Support',
      subtitle: 'Direct communication with Vashu',
      description: 'Zero automated tickets or third-party filters. You get direct support via email, WhatsApp, or Slack to align edits quickly in real time.',
      icon: MessageSquareHeart,
      metric: '🤝 1-ON-1',
      color: 'from-blue-500/20 to-indigo-500/10 hover:border-blue-500/30'
    },
    {
      id: 'high-qual',
      title: 'High-Quality Results',
      subtitle: 'Strictest rendering controls',
      description: 'High-bitrate files exported up to 4K resolution, non-destructive Lightroom layouts, and flawless vector geometries ready for digital campaigns and large formats.',
      icon: CheckCircle2,
      metric: '🎯 PRECISE',
      color: 'from-pink-500/20 to-rose-500/10 hover:border-pink-500/30'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section
      id="why-choose-us"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0f0022] to-[#15022c]"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#4B0082]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs text-purple-300 font-bold tracking-[0.25em] uppercase block mb-3 animate-pulse">
            THE AGENCY INTEGRITY
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl text-white font-extrabold tracking-tight mb-4">
            Why Visionaries Choose Us
          </h2>
          <p className="text-purple-200/70 text-base sm:text-lg">
            We blend rapid design sprints with pixel perfection, ensuring your content establishes absolute credibility and hooks your target audience.
          </p>
        </div>

        {/* Bento/Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-6 gap-8"
        >
          {/* Main Hero Card inside the bento (Takes up 3 columns) */}
          <motion.div
            id="bento-hero"
            variants={itemVariants}
            className="md:col-span-3 bg-gradient-to-br from-[#6A0DAD] to-[#4B0082] rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-purple-400/20 shadow-xl shadow-purple-950/20 relative overflow-hidden"
          >
            {/* Ambient pattern backdrop */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full pointer-events-none" />

            <div>
              <span className="bg-white/10 text-white font-mono text-[10px] tracking-widest font-black py-1.5 px-3.5 rounded-full uppercase border border-white/20 inline-block mb-8">
                🚀 ACCELERATE GROWTH
              </span>
              <h3 className="font-sans text-2xl sm:text-3xl text-white font-black leading-tight mb-4">
                We design content that commands extreme value.
              </h3>
              <p className="text-purple-100/80 text-sm leading-relaxed mb-6">
                Instead of simple outsourcing, Vashu Singh operates as your collaborative partner. We help define thumbnail hooks, visual brand guidelines, and color-grading standards that give you structural market advantages.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-purple-400/20">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-white">Let's craft your concept</span>
              <ChevronRight className="w-4 h-4 text-white hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Pillars Blocks Mapping (Takes up columns dynamically) */}
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                id={`bento-card-${pillar.id}`}
                variants={itemVariants}
                className={`md:col-span-3 rounded-3xl p-8 bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:bg-[#6A0DAD]/30 transition-all">
                      <IconComponent className="w-5 h-5 text-purple-300" />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-purple-300/80 border border-purple-500/30 rounded px-2 py-0.5 tracking-wider">
                      {pillar.metric}
                    </span>
                  </div>

                  <h4 className="font-sans text-lg font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">
                    {pillar.title}
                  </h4>
                  <span className="block text-xs font-mono text-purple-400/85 mb-4">
                    {pillar.subtitle}
                  </span>
                  <p className="text-purple-200/60 text-xs leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="h-px bg-white/5 my-4" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-purple-300/40 uppercase font-black">
                    Guaranteed Output • 0{idx + 1}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-purple-400/30 group-hover:text-[#6A0DAD] transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
