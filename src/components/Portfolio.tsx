import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO } from '../data';
import { PortfolioProject } from '../types';
import { Eye, Clock, User, Tag, X, Calendar, Sparkles } from 'lucide-react';

export default function Portfolio() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'Video Editing', value: 'video-editing' },
    { label: 'Photo Editing', value: 'photo-editing' },
    { label: 'Brand Design', value: 'brand-identity' },
    { label: 'Social Media', value: 'social-media' }
  ];

  const filteredProjects = filter === 'all' 
    ? PORTFOLIO 
    : PORTFOLIO.filter(project => project.category === filter);

  return (
    <section
      id="portfolio"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#1a052e] to-[#0f0022]"
    >
      {/* Decorative Glow elements */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-purple-300 font-bold tracking-[0.25em] uppercase block mb-3">
              CREATIVE WORKS GALLERY
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl text-white font-extrabold tracking-tight">
              Crafting Digital Masterpieces
            </h2>
          </div>
          <p className="text-purple-200/60 max-w-md text-sm sm:text-base">
            Explore our curated portfolio of cinematic video edits, premium logo guidelines, and high-CTR social content created for global clients.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12 border-b border-white/5 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.value}
              id={`filter-btn-${cat.value}`}
              onClick={() => setFilter(cat.value)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                filter === cat.value
                  ? 'bg-white text-black shadow-lg shadow-purple-950/20'
                  : 'bg-white/5 text-purple-200 border border-white/10 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio Dynamic Grid */}
        <motion.div
          id="portfolio-grid"
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                id={`project-card-${project.id}`}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-[#130121]/60 rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/40 transition-colors cursor-pointer"
              >
                {/* Image Container with 4:3 Aspect Ratio */}
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  {/* Subtle hover zoom overlay */}
                  <div className="absolute inset-0 bg-[#070014]/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-all duration-300">
                      <Eye className="w-5 h-5 text-[#6A0DAD]" />
                    </div>
                  </div>

                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-mono tracking-wider font-bold py-1.5 px-3.5 rounded-full uppercase border border-white/10 shadow-lg">
                      {project.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Information Card Body */}
                <div className="p-6 sm:p-8">
                  <h3 className="font-sans text-xl sm:text-2xl text-white font-bold tracking-tight mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-purple-200/60 text-sm mb-6 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-500/10 text-purple-300 font-mono text-[10px] uppercase font-bold py-1 px-2.5 rounded-md border border-purple-500/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Expand Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-3xl relative z-10 shadow-2xl border border-purple-100 max-h-[92vh] overflow-y-auto"
              style={{ color: '#000000' }}
            >
              {/* Image Header with Aspect 16:9 */}
              <div className="aspect-[16:9] relative w-full">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Close floating button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-black/70 text-white hover:bg-black p-2.5 rounded-full transition-transform hover:scale-105 cursor-pointer z-35"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-[#6A0DAD] text-white text-[10px] font-mono tracking-widest font-bold py-1.5 px-3.5 rounded-full uppercase mb-2 inline-block">
                    {selectedProject.categoryLabel}
                  </span>
                  <h3 className="font-sans text-2xl sm:text-3xl text-white font-extrabold tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Description & Technical Metadata */}
              <div className="p-8 sm:p-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Detailed summary */}
                  <div className="md:col-span-8">
                    <span className="block text-xs font-mono font-bold text-gray-400 tracking-wider uppercase mb-3">
                      Overview & Creative Process
                    </span>
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6 font-medium">
                      {selectedProject.description}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      This project was fully customized to align with the client's strict visual objectives. We delivered raw premium cuts, stylized ambient animations, frequency skin retouching, and cohesive vector alignment layers designed to resonate with their active customer demographic.
                    </p>
                  </div>

                  {/* Metadata Specs Sidebar */}
                  <div className="md:col-span-4 bg-purple-50/50 rounded-2xl p-6 border border-purple-100 flex flex-col gap-4">
                    <span className="block text-xs font-mono font-bold text-purple-600 tracking-wider uppercase border-b border-purple-200 pb-2">
                      Project Details
                    </span>

                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-purple-600" />
                      <div>
                        <span className="block text-[10px] font-mono text-gray-400 uppercase">Client</span>
                        <span className="text-xs font-bold text-gray-800">{selectedProject.client}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <div>
                        <span className="block text-[10px] font-mono text-gray-400 uppercase">Year</span>
                        <span className="text-xs font-bold text-gray-800">{selectedProject.year}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <div>
                        <span className="block text-[10px] font-mono text-gray-400 uppercase">Timeline</span>
                        <span className="text-xs font-bold text-gray-800">4 Business Days</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Tag className="w-4 h-4 text-purple-600 mt-1" />
                      <div>
                        <span className="block text-[10px] font-mono text-gray-400 uppercase">Tags</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {selectedProject.tags.map((tg, i) => (
                            <span key={i} className="bg-white text-[9px] text-[#6A0DAD] font-mono uppercase font-black py-0.5 px-2 rounded border border-purple-200">
                              {tg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100 my-8" />

                {/* Footer buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedProject(null);
                      const contactSec = document.getElementById('contact');
                      if (contactSec) {
                        scrollBy(0, contactSec.getBoundingClientRect().top - 80);
                      }
                    }}
                    className="flex-1 bg-black text-white hover:bg-purple-950 py-3.5 px-6 rounded-xl font-semibold text-center transition-all cursor-pointer text-sm flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    Inquire For Similar Concept
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black py-3.5 px-6 rounded-xl font-semibold text-center transition-all cursor-pointer text-sm"
                  >
                    Close Showcase
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
