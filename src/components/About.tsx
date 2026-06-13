import { motion } from 'motion/react';
import { Award, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

interface AboutProps {
  onContactClick: () => void;
}

export default function About({ onContactClick }: AboutProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0f0022] to-[#15022c]"
    >
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Premium About Card */}
          <div className="lg:col-span-6">
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-purple-100 relative overflow-hidden"
              style={{ color: '#000000' }}
            >
              {/* Corner Design Decors */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-purple-200/50 to-transparent rounded-bl-full pointer-events-none" />

              <span className="font-mono text-purple-600 text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                MEET THE CREATIVE DIRECTOR
              </span>

              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl leading-tight mb-6">
                Hi, I'm Vashu Singh
              </h2>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                I am a passionate visual artist, editor, and designer dedicated to helping content creators, personal brands, and companies command attention through high-fidelity visual assets.
              </p>

              <div className="h-px bg-purple-100 my-6" />

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                Operating a boutique digital agency means my eyes are directly on every edit, every custom typography pairing, and every pixel. We do not mass-produce designs. Instead, we craft highly intentional digital media tailored to maximize user engagement and trust.
              </p>

              <button
                id="about-cta-talk"
                onClick={onContactClick}
                className="inline-flex items-center gap-2 bg-[#6A0DAD] text-white hover:bg-black font-semibold text-sm py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Let's Build Your Brand
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Mission and Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div variants={itemVariants} className="mb-4">
              <span className="font-mono text-xs text-purple-300 font-bold uppercase tracking-wider block mb-1">
                OUR CLIENT FOCUS
              </span>
              <h3 className="font-sans text-3xl sm:text-4xl text-white font-extrabold tracking-tight mb-6">
                Engineered for Creativity, Quality & Longevity
              </h3>
            </motion.div>

            <motion.p variants={itemVariants} className="text-purple-200/80 leading-relaxed mb-10 text-base sm:text-lg">
              We understand that modern audiences develop visual fatigue quickly. In response, we cultivate dynamic designs and video sequences that bypass standard templates. Your brand deserves unique concepts designed from scratch to reflect your philosophy.
            </motion.p>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  id: 'pillar-1',
                  icon: Award,
                  title: 'Pure Excellence',
                  desc: 'Every single asset is treated with absolute perfection.'
                },
                {
                  id: 'pillar-2',
                  icon: ShieldCheck,
                  title: 'Flawless Quality',
                  desc: 'We follow stringent post-production control.'
                },
                {
                  id: 'pillar-3',
                  icon: Heart,
                  title: 'Deep Satisfaction',
                  desc: 'We offer continuous iterations until you are thrilled.'
                }
              ].map((pillar) => {
                const IconComp = pillar.icon;
                return (
                  <motion.div
                    key={pillar.id}
                    id={pillar.id}
                    variants={itemVariants}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/35 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20 group-hover:bg-[#6A0DAD]/20 transition-all">
                      <IconComp className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="font-sans text-sm font-bold text-white mb-2">{pillar.title}</h4>
                    <p className="text-purple-200/60 text-xs leading-relaxed">{pillar.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
