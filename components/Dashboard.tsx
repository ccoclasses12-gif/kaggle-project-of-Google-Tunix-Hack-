
import React, { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TAB_THEMES, DOMAIN_PERFORMANCE } from '../constants';
import NeuralArchitecture3D from './NeuralArchitecture3D';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';

const MemoizedNeuralArchitecture3D = memo(NeuralArchitecture3D);

const Dashboard: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const Motion = motion as any;

  const radarData = [
    { subject: 'Consistency', value: 94 },
    { subject: 'Logic', value: 98 },
    { subject: 'Accuracy', value: 92 },
    { subject: 'Trust', value: 89 },
    { subject: 'Safety', value: 91 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Immersive Header: Cluster Status */}
      <header className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[3rem] shadow-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-3">
             <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></div>
             <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">System Live: Kaggle TPU Pod 01</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">Command Center</h2>
          <p className="text-slate-400 font-medium max-w-lg">Monitoring Tunix Aligned Model performance across logic benchmarks and TPU training cycles.</p>
        </div>
        
        <div className="flex items-center gap-8 relative z-10 pr-4">
           <div className="text-center">
              <div className="text-[10px] font-black text-slate-500 uppercase mb-1 tracking-widest">Global Latency</div>
              <div className="text-2xl font-black text-indigo-400">14ms</div>
           </div>
           <div className="w-px h-10 bg-slate-800"></div>
           <div className="text-center">
              <div className="text-[10px] font-black text-slate-500 uppercase mb-1 tracking-widest">Active Nodes</div>
              <div className="text-2xl font-black text-indigo-400">4,096</div>
           </div>
        </div>
      </header>

      {/* Main Grid: Core Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: 3D Neural Hub & CTAs */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-1 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-8 left-10 z-20">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Neural Core Activity</span>
            </div>
            <div className="h-[400px] w-full relative">
              <MemoizedNeuralArchitecture3D intensity={0.5} activeNodes={30} color="#6366f1" mode="tokens" />
              <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end pointer-events-none">
                 <div className="space-y-4">
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl">
                       <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Current Sync</div>
                       <div className="text-xs font-black text-white font-mono">HASH_D8A1F...99</div>
                    </div>
                 </div>
                 <div className="flex gap-4 pointer-events-auto">
                    <button onClick={() => setActiveTab('lab')} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95">Open Lab</button>
                    <button onClick={() => setActiveTab('training')} className="px-8 py-3 bg-slate-950/80 border border-white/10 text-slate-300 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-all active:scale-95">Train Now</button>
                 </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[3rem] shadow-xl group hover:border-indigo-500/20 transition-all">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Logical Consistency</h4>
                <div className="flex items-end justify-between">
                   <div className="text-5xl font-black text-indigo-400 tracking-tighter">94%</div>
                   <div className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">+12% Delta</div>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full mt-6 overflow-hidden border border-white/5">
                   <motion.div initial={{ width: 0 }} animate={{ width: '94%' }} transition={{ duration: 1.5 }} className="h-full bg-indigo-500 shadow-[0_0_10px_currentColor]" />
                </div>
             </div>
             <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[3rem] shadow-xl group hover:border-cyan-500/20 transition-all">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Kaggle Session Budget</h4>
                <div className="flex items-end justify-between">
                   <div className="text-5xl font-black text-cyan-400 tracking-tighter">7.2h</div>
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest pb-2">/ 9.0h Max</div>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full mt-6 overflow-hidden border border-white/5">
                   <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 1.5 }} className="h-full bg-cyan-400 shadow-[0_0_10px_currentColor]" />
                </div>
             </div>
          </div>
        </div>

        {/* Right: Domain Performance & Radar */}
        <div className="lg:col-span-5 space-y-8">
           <div className="bg-slate-900/40 border border-white/5 p-10 rounded-[3.5rem] shadow-xl h-full flex flex-col box-contained">
              <div className="mb-10">
                <h3 className="text-lg font-black text-white tracking-tight flex items-center mb-1">
                  Domain Benchmark Performance
                </h3>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Tunix Aligned Gemma2-2B</p>
              </div>

              <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={DOMAIN_PERFORMANCE} layout="vertical" margin={{ left: -20 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="domain" type="category" stroke="#475569" fontSize={10} width={100} tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontWeight: 800, style: { textTransform: 'uppercase' }}} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', fontSize: '10px' }}
                        cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                      />
                      <Bar dataKey="score" radius={[0, 10, 10, 0]} barSize={20}>
                        {DOMAIN_PERFORMANCE.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                   </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 text-center">Attribute Balancing Radar</div>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#1e293b" />
                        <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={9} tick={{fontWeight: 700, style: { textTransform: 'uppercase' }}} />
                        <Radar name="Tunix" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
                     </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Log / Feed */}
      <div className="bg-slate-900/20 border border-white/5 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6 overflow-hidden">
           <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
           </div>
           <div className="min-w-0">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Live Optimizer Log</div>
              <p className="text-xs text-white font-mono truncate max-w-xl">
                 [STAGE 03] DPO cycle alignment successful. Reasoning trace delta detected at node 0x4f...
              </p>
           </div>
        </div>
        <button onClick={() => setActiveTab('metrics')} className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em] hover:text-indigo-300 transition-colors shrink-0">
           View Full Metrics Trace →
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
