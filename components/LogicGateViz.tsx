
import React from 'react';
import { motion } from 'framer-motion';

const LogicGateViz: React.FC = () => {
  const Motion = motion as any;

  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center p-6 bg-slate-950/40 rounded-[3rem] border border-slate-800/50 relative overflow-hidden group">
      {/* Decorative Binary Data Stream Background */}
      <div className="absolute inset-0 opacity-[0.02] mono text-[7px] md:text-[9px] grid grid-cols-8 gap-4 p-6 pointer-events-none overflow-hidden select-none">
        {Array.from({ length: 64 }).map((_, i) => (
          <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
            {Math.random() > 0.5 ? '1011' : '0010'}
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[600px] aspect-[16/9]">
        <svg viewBox="0 0 400 225" className="w-full h-full drop-shadow-[0_0_20px_rgba(59,130,246,0.1)]">
          <defs>
            <linearGradient id="gate-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Connection Lines (Paths) */}
          <g stroke="#1e293b" strokeWidth="1" fill="none">
            <Motion.path d="M50,112.5 C100,112.5 100,50 150,50" 
              animate={{ stroke: ['#1e293b', '#3b82f6', '#1e293b'] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <Motion.path d="M50,112.5 C100,112.5 100,175 150,175"
              animate={{ stroke: ['#1e293b', '#6366f1', '#1e293b'] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
            <Motion.path d="M150,50 L250,112.5" />
            <Motion.path d="M150,175 L250,112.5" />
            <Motion.path d="M250,112.5 L350,112.5" 
               animate={{ stroke: ['#1e293b', '#10b981', '#1e293b'] }}
               transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            />
          </g>

          {/* Pulsing Data Particles along paths */}
          <Motion.circle r="2" fill="#3b82f6" filter="url(#glow)">
            <animateMotion dur="3s" repeatCount="indefinite" path="M50,112.5 C100,112.5 100,50 150,50" />
          </Motion.circle>
          <Motion.circle r="2" fill="#10b981" filter="url(#glow)">
            <animateMotion dur="4s" repeatCount="indefinite" path="M250,112.5 L350,112.5" />
          </Motion.circle>

          {/* Logic Gates (Nodes) */}
          {/* Input Node */}
          <g>
            <circle cx="50" cy="112.5" r="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
            <Motion.circle cx="50" cy="112.5" r="18" fill="none" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.2"
              animate={{ r: [12, 22, 12] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </g>

          {/* Intermediate Nodes */}
          <circle cx="150" cy="50" r="10" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
          <circle cx="150" cy="175" r="10" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

          {/* Central Decision Hub */}
          <g>
            <rect x="235" y="97.5" width="30" height="30" rx="8" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
            <Motion.rect x="230" y="92.5" width="40" height="40" rx="10" fill="none" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.2"
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </g>

          {/* Output Node */}
          <g>
            <polygon points="340,102.5 365,112.5 340,122.5" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <Motion.circle cx="350" cy="112.5" r="20" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity="0.1"
              animate={{ r: [10, 30, 10] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </g>
        </svg>

        {/* Labels Overlay */}
        <div className="absolute inset-0 flex pointer-events-none text-[8px] md:text-[10px] font-black uppercase tracking-tighter text-slate-500">
           <span className="absolute left-0 top-[60%] -translate-x-1/2">Prompt</span>
           <span className="absolute left-[37.5%] top-[10%] -translate-x-1/2">Weighting</span>
           <span className="absolute left-[37.5%] bottom-[10%] -translate-x-1/2">Symmetry</span>
           <span className="absolute left-[62.5%] top-[60%] -translate-x-1/2 text-indigo-400">Tunix Hub</span>
           <span className="absolute right-0 top-[60%] translate-x-1/2 text-emerald-400">Trace</span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/80 px-8 py-2.5 rounded-full border border-slate-800 shadow-2xl flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Neural Core: Ready</span>
        </div>
        <div className="w-px h-3 bg-slate-800"></div>
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tunix: Standby</span>
        </div>
      </div>
    </div>
  );
};

export default LogicGateViz;
