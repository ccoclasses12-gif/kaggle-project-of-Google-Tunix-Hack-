import React, { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { TAB_THEMES } from '../constants';

interface CompanionRobotProps {
  mood: 'happy' | 'thinking' | 'helping' | 'celebrating' | 'error';
  message: string;
  currentTab: string;
}

const CompanionRobot: React.FC<CompanionRobotProps> = ({ mood: initialMood, message: initialMessage, currentTab }) => {
  const [minimized, setMinimized] = useState(false);
  const [mood, setMood] = useState(initialMood);
  const [message, setMessage] = useState(initialMessage);
  
  const theme = useMemo(() => TAB_THEMES[currentTab] || TAB_THEMES.dashboard, [currentTab]);

  useEffect(() => {
    setMood(initialMood);
    setMessage(initialMessage);
  }, [initialMood, initialMessage]);

  const moodColors = useMemo(() => ({
    happy: `from-${theme.primary} to-${theme.accent}`,
    thinking: 'from-blue-500 to-indigo-600',
    helping: 'from-emerald-400 to-cyan-500',
    celebrating: 'from-amber-400 to-orange-600',
    error: 'from-rose-500 to-red-600'
  }), [theme, mood]);

  // Optimized floating animation
  // Fix: Added explicit casting to any to resolve Framer Motion transition type mismatch for the ease property
  const floatTransition: any = {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: -window.innerWidth + 150, right: 0, top: -window.innerHeight + 150, bottom: 0 }}
      dragElastic={0.1}
      dragMomentum={false}
      className="fixed z-[100] right-10 bottom-10 cursor-grab active:cursor-grabbing pointer-events-auto"
      style={{ touchAction: 'none' }}
    >
      <div className="relative flex flex-col items-center w-[280px] max-w-[90vw]">
        
        <AnimatePresence mode="wait">
          {!minimized && (
            <motion.div
              key={message}
              initial={{ opacity: 0, scale: 0.9, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.9, y: 5, filter: 'blur(10px)' }}
              className="absolute bottom-full mb-6 p-5 rounded-[2rem] bg-slate-900/90 backdrop-blur-3xl border border-white/10 shadow-2xl w-full"
            >
              <div className="relative space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-1">
                  <div className="flex items-center space-x-2">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${moodColors[mood]} shadow-[0_0_8px_currentColor] animate-pulse`}></div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">TUNI v2.1</span>
                  </div>
                </div>
                
                <div className="max-h-[120px] overflow-y-auto custom-scrollbar">
                  <p className="text-[13px] text-slate-100 leading-relaxed font-medium tracking-tight">
                    {message}
                  </p>
                </div>

                <div className="pt-1">
                   <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest text-right">Autonomous Guide</div>
                </div>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); setMinimized(true); }}
                  className="absolute -top-4 -right-4 w-6 h-6 bg-slate-800 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                >
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {minimized && (
          <motion.button 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={(e) => { e.stopPropagation(); setMinimized(false); }}
            className={`absolute bottom-full mb-3 w-9 h-9 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center text-${theme.primary} shadow-xl hover:bg-slate-800 transition-colors`}
          >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </motion.button>
        )}

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={floatTransition}
          className="w-20 h-20 md:w-24 md:h-24 relative select-none pointer-events-none"
        >
          <div className="w-full h-full bg-slate-950 rounded-[1.5rem] border-[2px] border-white/10 shadow-2xl relative flex flex-col items-center justify-center">
            <div className="w-14 h-10 md:w-16 md:h-12 bg-black rounded-lg border border-white/5 flex items-center justify-center space-x-2.5">
              {[1, 2].map((i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    scaleY: mood === 'thinking' ? [1, 0.4, 1] : [1, 1, 0.1, 1],
                  }}
                  className={`w-1.5 h-3.5 rounded-full shadow-[0_0_8px_currentColor] ${mood === 'error' ? 'bg-rose-500' : mood === 'celebrating' ? 'bg-amber-400' : 'bg-blue-400'}`}
                  transition={{ duration: 0.15, repeat: mood === 'thinking' ? Infinity : 0, repeatDelay: 2.5 }}
                />
              ))}
            </div>
          </div>
          <div className="absolute -left-1 top-5 w-2.5 h-2.5 bg-slate-900 border border-white/10 rounded-full"></div>
          <div className="absolute -right-1 top-5 w-2.5 h-2.5 bg-slate-900 border border-white/10 rounded-full"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default memo(CompanionRobot);