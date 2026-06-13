import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RefreshCw, Eye, Sliders, Sparkles, Tv, RotateCcw, Flame } from 'lucide-react';

export default function EyesAnimation() {
  const leftEyeRef = useRef<HTMLDivElement | null>(null);
  const rightEyeRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Gaze Tracking Coordinates mapping
  const [leftOffset, setLeftOffset] = useState({ x: 0, y: 0 });
  const [rightOffset, setRightOffset] = useState({ x: 0, y: 0 });
  const [rawDelta, setRawDelta] = useState({ dx: 0, dy: 0 });

  // Control state
  const [isAutoPlay, setIsAutoPlay] = useState(false); // Auto wander or manual track
  const [isBlinking, setIsBlinking] = useState(false);
  const [gazeColor, setGazeColor] = useState<'white' | 'cyan' | 'purple' | 'amber' | 'emerald'>('white');
  const [showLightBeam, setShowLightBeam] = useState(true); // Toggle for White Light spotlight beam graphic
  
  // Video editing parameters
  const [dilation, setDilation] = useState(45); // pupil size in percentage
  const [glowIntensity, setGlowIntensity] = useState(60); // glow radius in pixel scale
  const [playbackFrame, setPlaybackFrame] = useState(24); // mock frame pointer (0-100)
  const [isPlayingTimeline, setIsPlayingTimeline] = useState(true);

  // Last mouse activity tracking for idle auto-movement
  const lastMouseMoveTime = useRef<number>(Date.now());
  const ambientAngle = useRef<number>(0);

  // Theme configuration for eye styles
  const colorThemes = {
    white: {
      iris: 'bg-gradient-to-r from-slate-200 via-white to-slate-400',
      glow: 'shadow-[0_0_35px_rgba(255,255,255,0.7)]',
      border: 'border-white/40',
      badge: 'bg-white/10 text-white border-white/20',
      text: 'text-white'
    },
    cyan: {
      iris: 'bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500',
      glow: 'shadow-[0_0_30px_rgba(34,211,238,0.5)]',
      border: 'border-cyan-500/30',
      badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
      text: 'text-cyan-400'
    },
    purple: {
      iris: 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500',
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.5)]',
      border: 'border-purple-500/30',
      badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
      text: 'text-purple-400'
    },
    amber: {
      iris: 'bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500',
      glow: 'shadow-[0_0_30px_rgba(245,158,11,0.5)]',
      border: 'border-amber-500/30',
      badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      text: 'text-amber-400'
    },
    emerald: {
      iris: 'bg-gradient-to-r from-emerald-400 via-green-400 to-teal-500',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.5)]',
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
      text: 'text-emerald-400'
    }
  };

  // Auto incremental playback frame counter (loop 0-100)
  useEffect(() => {
    let intervalId: any;
    if (isPlayingTimeline) {
      intervalId = setInterval(() => {
        setPlaybackFrame((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 120);
    }
    return () => clearInterval(intervalId);
  }, [isPlayingTimeline]);

  // Handle eyes blinking automatically at natural intervals
  useEffect(() => {
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 150);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        triggerBlink();
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Tracking Gaze Loop (Mouse Move + Idle Wander)
  useEffect(() => {
    const handleCoordinateTweak = (clientX: number, clientY: number) => {
      lastMouseMoveTime.current = Date.now();

      const calculateEyeOffset = (eyeElement: HTMLDivElement | null) => {
        if (!eyeElement) return { x: 0, y: 0 };
        const rect = eyeElement.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const dx = clientX - eyeCenterX;
        const dy = clientY - eyeCenterY;

        // Save raw deltas to present in telemetries
        setRawDelta({ dx: Math.round(dx), dy: Math.round(dy) });

        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        // Maximum displacement vector of pupil
        const maxRadius = Math.max(12, Math.min(22, dilation / 2));
        const finalDistance = Math.min(distance * 0.12, maxRadius);

        return {
          x: Math.cos(angle) * finalDistance,
          y: Math.sin(angle) * finalDistance
        };
      };

      setLeftOffset(calculateEyeOffset(leftEyeRef.current));
      setRightOffset(calculateEyeOffset(rightEyeRef.current));
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isAutoPlay) {
        handleCoordinateTweak(e.clientX, e.clientY);
      }
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (!isAutoPlay && e.touches.length > 0) {
        handleCoordinateTweak(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('touchmove', handleWindowTouchMove);

    // Dynamic Orbital wander system when idle or when AutoPlay is checked
    let animationFrameId: number;
    const updateAmbientGaze = () => {
      const isIdle = Date.now() - lastMouseMoveTime.current > 2000;
      if (isAutoPlay || isIdle) {
        ambientAngle.current += 0.02;
        
        // Organic Lissajous orbit calculations
        const ox = Math.cos(ambientAngle.current) * 14;
        const oy = Math.sin(ambientAngle.current * 1.5) * 8;

        setLeftOffset({ x: ox, y: oy });
        setRightOffset({ x: ox, y: oy });
        setRawDelta({ dx: Math.round(ox * 2), dy: Math.round(oy * 2) });
      }
      animationFrameId = requestAnimationFrame(updateAmbientGaze);
    };

    animationFrameId = requestAnimationFrame(updateAmbientGaze);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAutoPlay, dilation]);

  // Forces a brief keyframe blink
  const triggerManualBlink = () => {
    setIsBlinking(true);
    setTimeout(() => {
      setIsBlinking(false);
    }, 180);
  };

  const currentTheme = colorThemes[gazeColor];

  return (
    <section 
      id="eyes-animation-section" 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#15022c] to-[#0f001c] border-y border-purple-500/10"
      ref={containerRef}
    >
      {/* Decorative Grid backdrop and Long Architectural White Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Long Vertical White Grid Accent Lines */}
      <div className="absolute top-0 bottom-0 left-[15%] w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-0 left-[50%] w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-[85%] w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent pointer-events-none hidden md:block" />
      
      {/* Long Horizontal White Grid Accent Lines */}
      <div className="absolute left-0 right-0 top-[20%] h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
      <div className="absolute left-0 right-0 bottom-[18%] h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

      {/* Dynamic ambient orb overlay */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full filter blur-[150px] opacity-10 pointer-events-none transition-all duration-700 ${
        gazeColor === 'white' ? 'bg-white/40' :
        gazeColor === 'cyan' ? 'bg-cyan-500' : 
        gazeColor === 'purple' ? 'bg-purple-600' : 
        gazeColor === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
      }`} />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 mb-4`}
          >
            <Eye className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest font-bold uppercase text-purple-200">
              Kinetic Visual Engagement
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-3xl sm:text-4xl md:text-5xl text-white font-extrabold tracking-tight mb-4"
          >
            Digital Designs That <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-white">Command Focus</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-purple-200/70 text-base sm:text-lg"
          >
            Audiences decide in under 1.5 seconds. Our professional pacing schemes and layout guidelines ensure your thumbnails, video assets, and brand assets are geometrically aligned to capture absolute attention.
          </motion.p>
        </div>

        {/* Dynamic Interactive HUD Container (Designed to resemble a live vector post-production suite) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Main Visualizer Player Box (Takes 7 columns) */}
          <div className="lg:col-span-7 flex flex-col bg-[#140527] border border-purple-500/20 rounded-3xl overflow-hidden shadow-2xl relative">
            
            {/* Top Toolbar Panel Mock */}
            <div className="bg-[#1e0a36] px-5 py-3 border-b border-purple-500/15 flex items-center justify-between text-xs font-mono text-purple-300/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="h-4 w-px bg-purple-500/20 mx-1.5" />
                <span className="font-semibold text-white/90">GazeTracker_v2.0_Active.mp4</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${currentTheme.badge}`}>
                  REALTIME COMPOSITE
                </span>
                <span className="text-purple-400 font-bold">24.00 FPS</span>
              </div>
            </div>

            {/* Central Stage holding the Interactive Eyes */}
            <div 
              id="interactive-eyes-stage" 
              className="flex-1 bg-[#0b0118] relative min-h-[300px] flex items-center justify-center p-12 overflow-hidden group cursor-crosshair"
            >
              {/* Studio White Softbox Light Source Graphic */}
              <AnimatePresence>
                {showLightBeam && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
                  >
                    {/* Emitter softbox bar at the very top of the stage */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-4 rounded-b-xl shadow-[0_0_35px_rgba(255,255,255,0.7)] border-b border-x border-white/20 bg-gradient-to-b from-slate-200 to-white flex items-center justify-center">
                      <div 
                        className="w-16 h-1 rounded animate-pulse" 
                        style={{ 
                          backgroundColor: gazeColor === 'white' ? '#fff' : 
                            gazeColor === 'cyan' ? '#22d3ee' : 
                            gazeColor === 'purple' ? '#a855f7' : 
                            gazeColor === 'amber' ? '#f59e0b' : '#10b981'
                        }} 
                      />
                    </div>

                    {/* Volumetric light beam cone projecting from the emitter down */}
                    <div 
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-[380px] sm:w-[500px] h-full pointer-events-none origin-top mix-blend-screen transition-all duration-300"
                      style={{
                        background: gazeColor === 'white' 
                          ? 'linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 65%, rgba(255,255,255,0) 100%)'
                          : gazeColor === 'cyan'
                          ? 'linear-gradient(to bottom, rgba(34,211,238,0.22) 0%, rgba(34,211,238,0.03) 65%, rgba(34,211,238,0) 100%)'
                          : gazeColor === 'purple'
                          ? 'linear-gradient(to bottom, rgba(168,85,247,0.22) 0%, rgba(168,85,247,0.03) 65%, rgba(168,85,247,0) 100%)'
                          : gazeColor === 'amber'
                          ? 'linear-gradient(to bottom, rgba(245,158,11,0.22) 0%, rgba(245,158,11,0.03) 65%, rgba(245,158,11,0) 100%)'
                          : 'linear-gradient(to bottom, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.03) 65%, rgba(16,185,129,0) 100%)',
                        clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
                        filter: `blur(${15 - glowIntensity * 0.05}px)`
                      }}
                    />

                    {/* Tracking white glare flare spot reflecting slightly beneath the cursor */}
                    <div 
                      className="absolute w-32 h-32 rounded-full bg-white/5 blur-2xl pointer-events-none mix-blend-overlay transition-all duration-300"
                      style={{
                        left: `calc(50% + ${leftOffset.x * 1.5}px)`,
                        top: `calc(50% + ${leftOffset.y * 1.5}px)`,
                        transform: 'translate(-50%, -50%)',
                        opacity: gazeColor === 'white' ? 1 : 0.4
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Overlay Crosshair Targeting Guidelines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-full h-px border-t border-dashed border-purple-400/30 absolute" />
                <div className="h-full w-px border-l border-dashed border-purple-400/30 absolute" />
                <div className="w-40 h-40 border border-purple-500/40 rounded-full" />
                <div className="w-72 h-72 border border-purple-500/25 rounded-full" />
              </div>

              {/* Status HUD Data Overlays */}
              <div className="absolute top-4 left-4 font-mono text-[10px] text-purple-400/60 pointer-events-none flex flex-col gap-1">
                <span>STAGE RECT: ACTIVE</span>
                <span>TRACK_METHOD: {isAutoPlay ? 'AMBIENT_WANDER' : 'MOUSE_COORDINATES'}</span>
                <span>GAZE_DELTA_X: {rawDelta.dx}px</span>
                <span>GAZE_DELTA_Y: {rawDelta.dy}px</span>
              </div>

              <div className="absolute bottom-4 right-4 font-mono text-[10px] text-purple-400/60 pointer-events-none">
                <span>DECAY: SMOOTH_SPRING</span>
              </div>

              {/* EYES CONTAINER (Horizontal alignment) */}
              <div className="flex items-center gap-12 sm:gap-16 relative z-10">
                
                {/* LEFT EYE */}
                <div 
                  ref={leftEyeRef}
                  className="relative w-28 h-28 sm:w-32 sm:h-32 bg-slate-950 rounded-full border-2 border-purple-500/30 flex items-center justify-center overflow-hidden transition-all duration-300 shadow-[inset_0_4px_20px_rgba(0,0,0,0.9)]"
                >
                  <motion.div 
                    className="absolute inset-0 bg-[#160b29] rounded-full transition-transform duration-150"
                    animate={isBlinking ? { scaleY: 0.05 } : { scaleY: 1 }}
                    transition={{ duration: 0.12 }}
                  >
                    {/* Glowing Sclera backdrop */}
                    <div className="absolute inset-2 bg-gradient-to-t from-purple-950/20 to-transparent rounded-full opacity-70" />

                    {/* Left Pupil Iris Assembly */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        transform: `translate(${leftOffset.x}px, ${leftOffset.y}px)`,
                        transition: isAutoPlay ? 'transform 0.4s cubic-bezier(0.1, 0.8, 0.2, 1)' : 'transform 0.08s ease-out'
                      }}
                    >
                      {/* Iris Body */}
                      <div 
                        className={`rounded-full transition-all duration-500 flex items-center justify-center overflow-hidden border border-white/10 ${currentTheme.iris} ${currentTheme.glow}`}
                        style={{
                          width: `${50 + dilation * 0.4}px`,
                          height: `${50 + dilation * 0.4}px`,
                        }}
                      >
                        {/* Biometric detailing lines */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_90%)] pointer-events-none" />
                        <div className="w-[125%] h-1 bg-white/20 rotate-45 absolute" />
                        <div className="w-[125%] h-1 bg-white/15 -rotate-45 absolute" />

                        {/* Outer Glow Indicator */}
                        <div className="absolute inset-0 border border-white/30 rounded-full filter blur-[1px] opacity-70" />

                        {/* Pupil Center Core */}
                        <div 
                          className="bg-black rounded-full flex items-center justify-center relative transition-all duration-300"
                          style={{
                            width: `${dilation * 0.45}%`,
                            height: `${dilation * 0.45}%`
                          }}
                        >
                          {/* Catch-light glare asset */}
                          <div className="absolute top-1.5 left-2.5 w-2 h-2 rounded-full bg-white/90" />
                          <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-white/60" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* External Glass Reflection Arc */}
                  <div className="absolute inset-1.5 border-t border-l border-white/25 rounded-full pointer-events-none mix-blend-overlay" />
                </div>

                {/* RIGHT EYE */}
                <div 
                  ref={rightEyeRef}
                  className="relative w-28 h-28 sm:w-32 sm:h-32 bg-slate-950 rounded-full border-2 border-purple-500/30 flex items-center justify-center overflow-hidden transition-all duration-300 shadow-[inset_0_4px_20px_rgba(0,0,0,0.9)]"
                >
                  <motion.div 
                    className="absolute inset-0 bg-[#160b29] rounded-full transition-transform duration-150"
                    animate={isBlinking ? { scaleY: 0.05 } : { scaleY: 1 }}
                    transition={{ duration: 0.12 }}
                  >
                    {/* Glowing Sclera backdrop */}
                    <div className="absolute inset-2 bg-gradient-to-t from-purple-950/20 to-transparent rounded-full opacity-70" />

                    {/* Right Pupil Iris Assembly */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        transform: `translate(${rightOffset.x}px, ${rightOffset.y}px)`,
                        transition: isAutoPlay ? 'transform 0.4s cubic-bezier(0.1, 0.8, 0.2, 1)' : 'transform 0.08s ease-out'
                      }}
                    >
                      {/* Iris Body */}
                      <div 
                        className={`rounded-full transition-all duration-500 flex items-center justify-center overflow-hidden border border-white/10 ${currentTheme.iris} ${currentTheme.glow}`}
                        style={{
                          width: `${50 + dilation * 0.4}px`,
                          height: `${50 + dilation * 0.4}px`,
                        }}
                      >
                        {/* Biometric detailing lines */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_90%)] pointer-events-none" />
                        <div className="w-[125%] h-1 bg-white/20 rotate-[35deg] absolute" />
                        <div className="w-[125%] h-1 bg-white/15 -rotate-[35deg] absolute" />

                        {/* Outer Glow Indicator */}
                        <div className="absolute inset-0 border border-white/30 rounded-full filter blur-[1px] opacity-70" />

                        {/* Pupil Center Core */}
                        <div 
                          className="bg-black rounded-full flex items-center justify-center relative transition-all duration-300"
                          style={{
                            width: `${dilation * 0.45}%`,
                            height: `${dilation * 0.45}%`
                          }}
                        >
                          {/* Catch-light glare asset */}
                          <div className="absolute top-1.5 left-2.5 w-2 h-2 rounded-full bg-white/90" />
                          <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-white/60" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* External Glass Reflection Arc */}
                  <div className="absolute inset-1.5 border-t border-l border-white/25 rounded-full pointer-events-none mix-blend-overlay" />
                </div>

              </div>

              {/* Hover Cue */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-purple-200 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                MOVE CURSOR HERE TO BIND TRACKING
              </div>
            </div>

            {/* Video Editor-style Timeline Scrubber Control Footer */}
            <div className="bg-[#19072f] border-t border-purple-500/15 p-4 flex flex-col gap-3">
              {/* Timeline Track bar and cursor position indicator */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-purple-400/80">TIMELINE</span>
                <div className="flex-1 h-2 rounded bg-purple-950/80 relative overflow-hidden group/track">
                  {/* Track grid notches */}
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:10%_100%] pointer-events-none" />
                  
                  {/* Current Active Timeline Track Filled portion */}
                  <div 
                    className="h-full bg-purple-500/30 transition-all duration-100"
                    style={{ width: `${playbackFrame}%` }}
                  />

                  {/* Hover Marker or Pointer */}
                  <div 
                    className="absolute top-0 bottom-0 w-[3px] bg-purple-400 transition-all duration-100 shadow-[0_0_8px_white]"
                    style={{ left: `${playbackFrame}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-white bg-purple-950 px-2 py-0.5 rounded font-bold">
                  00:00:{playbackFrame < 10 ? `0${playbackFrame}` : playbackFrame}
                </span>
              </div>

              {/* Player control HUD buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-1 pt-3 border-t border-purple-500/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlayingTimeline(!isPlayingTimeline)}
                    title={isPlayingTimeline ? "Pause Timeline Loop" : "Play Timeline Loop"}
                    className="w-8 h-8 rounded-lg bg-purple-500/10 hover:bg-[#6A0DAD] border border-purple-500/30 text-white flex items-center justify-center hover:shadow-lg transition-all active:scale-90 cursor-pointer"
                  >
                    {isPlayingTimeline ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>

                  <button
                    onClick={() => setPlaybackFrame(0)}
                    title="Rewind Timeline Track"
                    className="w-8 h-8 rounded-lg bg-purple-500/10 hover:bg-[#6A0DAD]/70 border border-purple-500/25 text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <div className="h-5 w-px bg-purple-500/10 mx-1" />

                  {/* Wander vs Track Mode */}
                  <button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className={`h-8 px-3.5 rounded-lg border text-xs font-mono font-semibold transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer ${
                      isAutoPlay 
                        ? 'bg-purple-500 text-white border-purple-400' 
                        : 'bg-purple-950/40 text-purple-300 border-purple-500/20 hover:border-purple-500/40'
                    }`}
                  >
                    {isAutoPlay ? 'Auto-Wander Active' : 'Manual Cursor Gaze'}
                  </button>
                </div>

                {/* Instant Action Commands */}
                <button
                  onClick={triggerManualBlink}
                  className="h-8 px-4 bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded-lg text-xs font-mono font-semibold transition-all hover:border-purple-500/40 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <Tv className="w-3.5 h-3.5 text-purple-300" />
                  Force Blink (150ms)
                </button>
              </div>
            </div>

          </div>

          {/* Right Vector Parameter Adjustments Control Center (Takes 5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-[#140527] to-[#1d0a36] border border-purple-500/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            
            <div>
              {/* Box Header title */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
                <h3 className="font-sans text-sm font-bold tracking-wider text-purple-300 uppercase">
                  Rendering Parameters
                </h3>
              </div>

              <div className="space-y-6">
                
                {/* Style Palette Config */}
                <div className="space-y-3">
                  <label className="text-xs font-mono text-purple-200 tracking-wide block flex items-center justify-between">
                    <span>Style Profile Color Overlay</span>
                    <span className="text-[9px] text-[#A855F7] font-semibold bg-[#A855F7]/10 px-1.5 py-0.5 rounded">
                      STUDIO LIGHTS READY
                    </span>
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {(['white', 'cyan', 'purple', 'amber', 'emerald'] as const).map((color) => (
                      <button
                        key={color}
                        onClick={() => setGazeColor(color)}
                        className={`py-2 px-0.5 rounded-xl text-[9px] font-mono font-bold uppercase transition-all capitalize border flex flex-col items-center gap-1.5 cursor-pointer group ${
                          gazeColor === color 
                            ? 'bg-white/10 border-white/50 text-white shadow-md shadow-white/5' 
                            : 'bg-purple-950/20 border-purple-500/10 text-purple-400 hover:border-purple-500/20 hover:text-purple-300'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full transition-all duration-300 group-hover:scale-110 ${
                          color === 'white' ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]' :
                          color === 'cyan' ? 'bg-cyan-400' :
                          color === 'purple' ? 'bg-purple-500' :
                          color === 'amber' ? 'bg-amber-400' : 'bg-emerald-400'
                        }`} />
                        <span>{color}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Studio Spotlight Volumetric Toggle Control */}
                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs transition-all hover:bg-white/[0.04] hover:border-white/15">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                      <Sparkles className="w-4 h-4 animate-pulse text-white" />
                    </div>
                    <div>
                      <span className="font-mono text-white font-semibold block">Volumetric Light Beam</span>
                      <span className="text-[10px] text-purple-300/60 block">Cinematic projector guide path</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowLightBeam(!showLightBeam)}
                    className={`px-3.5 py-1 rounded-lg text-[10px] font-mono font-black tracking-wide transition-all active:scale-95 cursor-pointer ${
                      showLightBeam 
                        ? 'bg-white text-black hover:bg-slate-100 shadow-[0_0_12px_rgba(255,255,255,0.45)]' 
                        : 'bg-purple-950/40 text-purple-400 border border-purple-500/15 hover:border-purple-500/30'
                    }`}
                  >
                    {showLightBeam ? 'ON • RENDERING' : 'OFF • MUTED'}
                  </button>
                </div>

                {/* Pupil Dilation Slider */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-purple-200">Iris Dilation Range</span>
                    <span className="font-mono font-semibold text-purple-400">{dilation}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="90"
                    value={dilation}
                    onChange={(e) => setDilation(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-purple-950 accent-purple-500 cursor-pointer h-1 border-none appearance-none"
                  />
                  <div className="flex items-center justify-between text-[10px] font-mono text-purple-400/50">
                    <span>Focused (20%)</span>
                    <span>Wand (90%)</span>
                  </div>
                </div>

                {/* Glow Dispersion Curve */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-purple-200">Glow Dispersion Radius</span>
                    <span className="font-mono font-semibold text-purple-400">{glowIntensity}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={glowIntensity}
                    onChange={(e) => setGlowIntensity(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-purple-950 accent-purple-500 cursor-pointer h-1 border-none appearance-none"
                  />
                  <div className="flex items-center justify-between text-[10px] font-mono text-purple-400/50">
                    <span>Hard Matte</span>
                    <span>High Radiance</span>
                  </div>
                </div>

                {/* Professional Engagement Metrics Panel */}
                <div className="bg-[#0b0118] border border-purple-500/10 rounded-2xl p-4.5 space-y-3 mt-6">
                  <span className="text-[10px] font-mono text-purple-400 tracking-widest block uppercase">
                    Pacing Conversion Estimation
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-purple-400/50 block">Conversion Uplift</span>
                      <span className="text-xl sm:text-2xl font-sans font-extrabold text-white flex items-center gap-1">
                        +18.4% <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-purple-400/50 block">CTR Dropoff Risk</span>
                      <p className="text-white font-mono font-bold text-sm flex items-center gap-1.5 mt-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse block" />
                        ULTRA LOW
                      </p>
                    </div>
                  </div>
                  <div className="h-px bg-purple-500/10 my-1" />
                  <p className="text-[10px] text-purple-300/60 leading-relaxed font-serif italic">
                    "Eyes detect movement & direction instantly. We map editorial pacing around layout centers, guiding user gazes straight down your marketing conversion funnel."
                  </p>
                </div>

              </div>
            </div>

            {/* Micro Specs summary */}
            <div className="pt-6 mt-6 border-t border-purple-500/10 flex items-center justify-between text-[10px] font-mono text-purple-400/40">
              <span>MODULE ID: DYNAMIC_GAZE_ANIM_V2</span>
              <span>DEV: VASHU_SINGH_ENGINE</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
