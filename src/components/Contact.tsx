import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, CheckCircle, Copy, Check, Instagram, Twitter, Linkedin, Youtube, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'video-editing',
    message: ''
  });

  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('svashu193@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formState.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formState.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formState.message.trim()) newErrors.message = 'Please describe your project guidelines.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate server ingestion
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset after submission
      setFormState({
        name: '',
        email: '',
        projectType: 'video-editing',
        message: ''
      });
    }, 1800);
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-[#0f001c]"
    >
      {/* Decorative Glow backdrops */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#6A0DAD]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/10 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Social Handles */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs text-purple-300 font-bold tracking-[0.25em] uppercase block mb-3 animate-pulse">
              GET IN TOUCH
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl text-white font-extrabold tracking-tight mb-6">
              Let's Build Something Powerful Together
            </h2>
            <p className="text-purple-200/70 text-sm sm:text-base leading-relaxed mb-10">
              Have a custom video sequence or brand direction you want to initiate? Use the form to submit your guidelines, or grab direct support details below. Vashu Singh replies in under 12 hours.
            </p>

            {/* Support Details box */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 mb-10">
              <span className="block text-[10px] font-mono tracking-widest font-black text-purple-300 uppercase mb-4">
                direct agency liaison
              </span>

              <div className="flex flex-col gap-6">
                <div>
                  <span className="block text-[10px] font-mono text-gray-400 uppercase">Studio Director</span>
                  <span className="text-base font-bold text-white">Vashu Singh</span>
                </div>

                <div>
                  <span className="block text-[10px] font-mono text-gray-400 uppercase">Support Email</span>
                  <div className="flex items-center gap-3 mt-1.5">
                    <a
                      href="mailto:svashu193@gmail.com"
                      className="text-base sm:text-lg font-sans font-extrabold text-white hover:text-purple-300 transition-colors flex items-center gap-2"
                    >
                      <Mail className="w-4.5 h-4.5 text-purple-400" />
                      svashu193@gmail.com
                    </a>
                    <button
                      id="copy-email-btn"
                      onClick={copyEmail}
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-purple-300 hover:text-white transition-all hover:bg-white/10 cursor-pointer"
                      title="Copy email to clipboard"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 mt-2">
                  <span className="block text-[10px] font-mono text-gray-400 uppercase mb-2">Standard Active Hours</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                      <span className="block text-[9px] font-mono text-purple-300 tracking-wider uppercase">Active Days</span>
                      <span className="text-xs sm:text-sm font-bold text-white mt-1 block">Monday — Saturday</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                      <span className="block text-[9px] font-mono text-purple-300 tracking-wider uppercase">Daily Timing</span>
                      <span className="text-xs sm:text-sm font-bold text-white mt-1 block">9:00 AM — 8:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Network Highlights */}
            <div>
              <span className="block text-[10px] font-mono tracking-widest font-black text-purple-300 uppercase mb-4">
                social portfolios
              </span>
              <div className="flex items-center gap-3.5">
                {[
                  { icon: Instagram, url: 'https://instagram.com', label: 'Instagram' },
                  { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
                  { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: Youtube, url: 'https://youtube.com', label: 'YouTube' }
                ].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-200 hover:bg-[#6A0DAD] hover:border-purple-400/40 hover:text-white transition-all transform hover:-translate-y-1"
                      aria-label={s.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form */}
          <div className="lg:col-span-7 w-full">
            <div className="relative bg-white/5 rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl shadow-purple-950/10 overflow-hidden">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div>
                        <label htmlFor="client-name" className="block text-xs font-mono font-bold text-purple-200 uppercase mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="client-name"
                          value={formState.name}
                          onChange={(e) => {
                            setFormState({ ...formState, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: undefined });
                          }}
                          placeholder="Vashu Singh"
                          className={`w-full bg-white/5 border rounded-2xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                            errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-purple-400 focus:ring-purple-400/20'
                          }`}
                        />
                        {errors.name && <span className="text-[11px] text-red-400 font-mono mt-1 block">{errors.name}</span>}
                      </div>

                      {/* Email input */}
                      <div>
                        <label htmlFor="client-email" className="block text-xs font-mono font-bold text-purple-200 uppercase mb-2">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          id="client-email"
                          value={formState.email}
                          onChange={(e) => {
                            setFormState({ ...formState, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: undefined });
                          }}
                          placeholder="client@agency.com"
                          className={`w-full bg-white/5 border rounded-2xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                            errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-purple-400 focus:ring-purple-400/20'
                          }`}
                        />
                        {errors.email && <span className="text-[11px] text-red-400 font-mono mt-1 block">{errors.email}</span>}
                      </div>
                    </div>

                    {/* Category Selection Dropdown */}
                    <div>
                      <label htmlFor="client-project-type" className="block text-xs font-mono font-bold text-purple-200 uppercase mb-2">
                        Project Category / Package Setup
                      </label>
                      <select
                        id="client-project-type"
                        value={formState.projectType}
                        onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                        className="w-full bg-[#180828] border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/20 focus:border-purple-400 transition-all cursor-pointer"
                      >
                        <option value="video-editing">Video Editing (Timeline / Motion Cuts)</option>
                        <option value="photo-editing">Photo Editing & Retouching</option>
                        <option value="brand-identity">Brand Identity Framework</option>
                        <option value="logo-design">Logo Design & Monograms</option>
                        <option value="social-media">Social Media Graphics</option>
                        <option value="youtube-thumbnails">YouTube Thumbnail Designs</option>
                        <option value="marketing-creatives">Marketing & Advertisement Sets</option>
                      </select>
                    </div>

                    {/* Guidelines textarea */}
                    <div>
                      <label htmlFor="client-message" className="block text-xs font-mono font-bold text-purple-200 uppercase mb-2">
                        How can we help you? *
                      </label>
                      <textarea
                        id="client-message"
                        value={formState.message}
                        onChange={(e) => {
                          setFormState({ ...formState, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: undefined });
                        }}
                        rows={5}
                        placeholder="Please describe project guidelines, active files, and turnaround requirements..."
                        className={`w-full bg-white/5 border rounded-2xl py-3.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.message ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-purple-400 focus:ring-purple-400/20'
                        }`}
                      />
                      {errors.message && <span className="text-[11px] text-red-400 font-mono mt-1 block">{errors.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      disabled={isSubmitting}
                      className="group w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#6A0DAD] to-[#8d2ef0] text-white font-bold tracking-wide text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-950/20 hover:brightness-110 active:scale-99 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Submitting guidelines...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Inquiry Guidelines
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-8 text-center flex flex-col items-center justify-center min-h-[350px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                      <CheckCircle className="w-9 h-9 text-emerald-400 animate-bounce" />
                    </div>

                    <h3 className="font-sans text-2xl font-black text-white mb-3">
                      Guidelines Received!
                    </h3>
                    <p className="text-purple-200/70 text-sm leading-relaxed max-w-sm mb-8">
                      Thank you for submitting your project request. Vashu Singh will review your request personally and contact you at your email address within 8-12 hours.
                    </p>

                    <button
                      id="back-to-form-btn"
                      onClick={() => setIsSubmitted(false)}
                      className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold py-2.5 px-6 rounded-xl transition-all cursor-pointer text-xs"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
