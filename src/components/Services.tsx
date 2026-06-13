import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { Service } from '../types';
import * as Icons from 'lucide-react';

interface ServicesProps {
  onContactClick: () => void;
}

export default function Services({ onContactClick }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Dynamic Lucide icon renderer
  const renderIcon = (name: string, className: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (Icons as any)[name];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <Icons.Sparkles className={className} />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section
      id="services"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#15022c] to-[#1a052e]"
    >
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-1/3 right-1/10 w-96 h-96 bg-[#6A0DAD]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/10 w-96 h-96 bg-[#4B0082]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs text-purple-300 font-bold tracking-[0.25em] uppercase block mb-3 animate-pulse"
          >
            OUR TALENT SUITE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans text-3xl sm:text-4xl md:text-5xl text-white font-extrabold tracking-tight mb-4"
          >
            Bespoke Creative Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-purple-200/75 text-base sm:text-lg"
          >
            We offer fully custom video-editing, brand infrastructure, and viral thumbnail assets mapped directly to your user metrics.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px -15px rgba(106, 13, 173, 0.3)"
              }}
              onClick={() => setSelectedService(service)}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-400/40 hover:bg-white/10 transition-all group flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedService(service);
                }
              }}
            >
              <div>
                {/* Icon frame */}
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-[#6A0DAD] group-hover:border-[#6A0DAD] transition-all">
                  {renderIcon(service.iconName, 'w-6 h-6 text-purple-300 group-hover:text-white transition-colors')}
                </div>

                {/* Service Title */}
                <h3 className="font-sans text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-purple-200/70 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Service Footer Interaction */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-xs font-mono text-purple-300 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  Explore deliverables →
                </span>
                <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-purple-500/20 group-hover:text-white transition-all">
                  +
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Services Detail Popup Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-[#070012]/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              layoutId={`service-card-${selectedService.id}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 sm:p-10 w-full max-w-2xl relative z-10 shadow-2xl border border-purple-100 max-h-[90vh] overflow-y-auto"
              style={{ color: '#000000' }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
                aria-label="Close modal"
              >
                <Icons.X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center flex-shrink-0 text-[#6A0DAD]">
                  {renderIcon(selectedService.iconName, 'w-7 h-7')}
                </div>
                <div>
                  <span className="font-mono text-purple-600 font-bold text-xs uppercase tracking-wider block mb-1">
                    SERVICE HIGHLIGHT
                  </span>
                  <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <div className="h-px bg-gray-100 my-6" />

              <p className="text-gray-700 text-base leading-relaxed mb-6">
                {selectedService.longDescription}
              </p>

              <div className="mb-8">
                <span className="block text-xs font-mono font-bold text-gray-400 tracking-wider uppercase mb-3">
                  Key Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.deliverables.map((del, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-purple-50/50 border border-purple-100/55"
                    >
                      <Icons.CheckCircle2 className="w-4 h-4 text-[#6A0DAD] flex-shrink-0" />
                      <span className="text-sm text-gray-800 font-medium">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    onContactClick();
                  }}
                  className="flex-1 bg-[#6A0DAD] text-white hover:bg-[#4B0082] py-3.5 px-6 rounded-xl font-semibold text-center transition-all cursor-pointer text-sm"
                >
                  Request {selectedService.title} Setup
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black py-3.5 px-6 rounded-xl font-semibold text-center transition-all cursor-pointer text-sm"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
