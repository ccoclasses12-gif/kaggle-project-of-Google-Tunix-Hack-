
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReasoningStep } from '../types';

interface ReasoningFlowProps {
  steps: ReasoningStep[];
  query: string;
  prediction: string;
}

const getStepIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes('verify') || l.includes('check')) return '✓';
  if (l.includes('analyze') || l.includes('process')) return '⚙';
  if (l.includes('input') || l.includes('premise')) return '⊕';
  if (l.includes('conclude') || l.includes('result')) return '★';
  return '•';
};

const ReasoningFlow: React.FC<ReasoningFlowProps> = ({ steps, query, prediction }) => {
  const Motion = motion as any;
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div className="relative py-8 md:py-16 px-4 md:px-8 min-w-0 box-contained overflow-hidden bg-slate-950/20 rounded-[3rem] border border-slate-800/50">
      {/* Zoom Controls */}
      <div className="absolute top-6 right-6 z-30 flex space-x-2">
         <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.1, 1.5))} className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white">+</button>
         <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.1, 0.7))} className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white">−</button>
         <button onClick={() => setZoomLevel(1)} className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white">⟲</button>
      </div>

      <div style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.3s ease' }} className="origin-top transition-transform">
        {/* Connection Spine */}
        <div className="absolute left-1/2 top-40 bottom-40 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-emerald-500/0 hidden lg:block"></div>

        {/* Input Start */}
        <Motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="inline-block bg-slate-950 border border-blue-500/30 p-6 rounded-[2.5rem] shadow-2xl relative max-w-lg">
            <div className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-2">Initial Signal</div>
            <p className="text-sm text-white italic font-medium leading-relaxed">"{query}"</p>
          </div>
        </Motion.div>

        {/* Logic Nodes */}
        <div className="space-y-16 relative">
          <AnimatePresence mode="popLayout">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = hoveredNode === step.step;

              return (
                <Motion.div
                  key={`step-${step.step}`}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24 ${!isEven && 'lg:flex-row-reverse'}`}
                >
                  {/* Detailed Explanation Card */}
                  <div 
                    onMouseEnter={() => setHoveredNode(step.step)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="w-full lg:flex-1 max-w-sm"
                  >
                    <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 bg-slate-900 shadow-2xl relative overflow-hidden group ${isActive ? 'border-blue-500 shadow-blue-500/10' : 'border-slate-800'}`}>
                      <div className="flex items-center space-x-3 mb-4">
                         <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black border transition-colors ${step.confidence > 0.9 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'}`}>
                            0{step.step}
                         </div>
                         <h4 className="text-xs font-black text-white uppercase tracking-wider">{step.label}</h4>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium transition-colors group-hover:text-slate-200">
                        {step.detail}
                      </p>
                      
                      {/* Interactive Token Path Display */}
                      <AnimatePresence>
                        {isActive && (
                          <Motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                             <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase"><span>Latent Activation</span><span>0x{step.step.toString(16)}FA</span></div>
                             <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                               <Motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 1 }} className="h-full bg-blue-500/40" />
                             </div>
                          </Motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Visual Node Hub */}
                  <div className="relative shrink-0 flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-[2rem] bg-slate-950 border-2 flex items-center justify-center text-xl font-black shadow-2xl transition-all duration-500 ${isActive ? 'border-blue-400 scale-110' : 'border-slate-800 text-slate-500'}`}>
                       <span className={isActive ? 'text-blue-400' : 'text-slate-600'}>{getStepIcon(step.label)}</span>
                    </div>
                    {/* Floating Confidence Gauge */}
                    <div className="absolute -right-4 -top-2 px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-black text-emerald-400">
                      {(step.confidence * 100).toFixed(0)}%
                    </div>
                  </div>

                  {/* Empty spacer for grid alignment on desktop */}
                  <div className="hidden lg:block lg:flex-1"></div>
                </Motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Final Conclusion */}
        <Motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30 p-10 rounded-[3rem] shadow-[0_0_50px_rgba(16,185,129,0.1)] relative group">
            <div className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-4">Synthesized Result</div>
            <p className="text-2xl md:text-4xl text-white font-black tracking-tighter max-w-2xl leading-tight">
              {prediction}
            </p>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default ReasoningFlow;
