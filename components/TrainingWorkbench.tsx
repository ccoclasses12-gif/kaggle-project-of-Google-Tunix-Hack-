
import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MOCK_TRAINING_LOGS, TAB_THEMES } from '../constants';
import TrainingPipeline from './TrainingPipeline';
import NeuralArchitecture3D, { VizMode } from './NeuralArchitecture3D';

const MemoizedNeuralArchitecture3D = memo(NeuralArchitecture3D);

const TrainingWorkbench: React.FC = () => {
  const Motion = motion as any;
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sessionHours, setSessionHours] = useState(0); // 0 to 9 hours
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [currentStageId, setCurrentStageId] = useState(1);
  const [vizMode, setVizMode] = useState<VizMode>('training');
  
  const [lr, setLr] = useState('2e-5');
  const [batch, setBatch] = useState(128);

  useEffect(() => {
    let interval: any;
    if (isTraining && progress < 100) {
      const step = (0.2 * speedMultiplier);
      interval = setInterval(() => {
        setProgress(p => {
          const n = Math.min(p + step, 100);
          setCurrentStageId(Math.min(4, Math.floor(n / 25) + 1));
          setSessionHours((n / 100) * 9); // Map 100% to 9 hours
          return n;
        });
      }, 50);
    } else if (progress >= 100) {
      setIsTraining(false);
      window.dispatchEvent(new CustomEvent('tuni-action', { 
        detail: { mood: 'celebrating', message: "Kaggle TPU Session complete. Checkpoints exported and evaluation-ready." } 
      }));
    }
    return () => clearInterval(interval);
  }, [isTraining, progress, speedMultiplier]);

  const toggleTraining = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTraining) {
      setIsTraining(false);
    } else {
      setProgress(0);
      setSessionHours(0);
      setCurrentStageId(1);
      setIsTraining(true);
      window.dispatchEvent(new CustomEvent('tuni-action', { 
        detail: { mood: 'thinking', message: `Initializing Tunix Optimizer. 9-hour TPU budget allocated.` } 
      }));
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
            Kaggle TPU Session P0
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-2">Tunix TPU Trainer</h2>
          <p className="text-slate-400 font-medium">Fine-tuning logic benchmarks in a single 9-hour distributed run.</p>
        </div>
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/5 gap-1">
           {[1, 5, 10].map(s => (
             <button key={s} onClick={() => setSpeedMultiplier(s)} className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all ${speedMultiplier === s ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>{s}x Speed</button>
           ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Session Budget</h3>
              <span className={`text-[10px] font-black uppercase ${sessionHours > 8.5 ? 'text-rose-500' : 'text-emerald-400'}`}>
                {sessionHours.toFixed(1)} / 9.0 Hours
              </span>
            </div>
            
            <form onSubmit={toggleTraining} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-tighter">Learn Rate</label>
                  <input type="text" value={lr} onChange={e => setLr(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white font-mono outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-tighter">Precision</label>
                  <div className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-white">bfloat16</div>
                </div>
              </div>

              <button type="submit" className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95 ${isTraining ? 'bg-rose-600/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-600 text-white shadow-emerald-600/20'}`}>
                {isTraining ? 'Abort Session' : 'Start 9h Run'}
              </button>
            </form>

            <div className="pt-8 border-t border-white/5 space-y-6">
               <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase"><span>Kernel Logs</span><span className="text-emerald-500">TPU-v5p</span></div>
               <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2 font-mono text-[9px]">
                  {isTraining ? (
                    <div className="text-emerald-500/70 opacity-80 animate-pulse">
                      [{new Date().toLocaleTimeString()}] Optimizing &lt;reasoning&gt; loss...
                      <br />
                      [{new Date().toLocaleTimeString()}] TPU Pod Sync: Success
                    </div>
                  ) : progress === 100 ? (
                    <div className="text-emerald-400 font-bold">
                      Checkpoints generated: tunix_aligned_gemma.safetensors
                      <br />
                      Reproducibility Hash: d8a1f...
                    </div>
                  ) : (
                    <div className="text-slate-600">Waiting for training cycle...</div>
                  )}
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-white/5 rounded-[3rem] p-10 shadow-xl box-contained min-h-[350px]">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-12">Fine-Tuning Curriculum</h3>
            <div className="grid grid-cols-4 gap-4 mb-12">
               {["Load Base", "SFT (Reasoning)", "DPO (Alignment)", "Evaluation"].map((step, i) => (
                 <div key={step} className={`p-4 rounded-xl border ${currentStageId > i ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-950 border-white/5'} transition-all text-center`}>
                    <div className="text-[8px] font-black text-slate-500 mb-1">0{i+1}</div>
                    <div className="text-[10px] font-black text-white truncate">{step}</div>
                 </div>
               ))}
            </div>
            <TrainingPipeline currentStage={currentStageId} isTraining={isTraining} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
            <div className="md:col-span-7 bg-slate-900 border border-white/5 rounded-[3rem] p-8 shadow-xl h-[400px]">
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">Loss Curve (Reasoning Alignment)</h3>
               <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_TRAINING_LOGS.slice(0, Math.floor(progress/5) + 3)}>
                      <defs>
                        <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis hide />
                      <YAxis hide />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
                      <Area type="monotone" dataKey="answerAccuracy" stroke="#10b981" fill="url(#curveGrad)" strokeWidth={3} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="md:col-span-5 bg-slate-900 border border-white/5 rounded-[3rem] p-0 shadow-xl flex flex-col items-center justify-center relative overflow-hidden h-[400px] group">
               <div className="absolute top-8 left-8 text-[10px] font-black text-slate-600 uppercase tracking-widest z-10">Neural Stability</div>
               <div className="w-full h-full relative">
                  <MemoizedNeuralArchitecture3D isTraining={isTraining} intensity={isTraining ? speedMultiplier : 0.5} activeNodes={40} color="#10b981" mode={vizMode} />
               </div>
               <div className="absolute bottom-8 inset-x-8 z-10">
                  <div className="flex justify-between text-[10px] font-black text-emerald-400 mb-2 uppercase tracking-widest"><span>Training Completion</span><span>{progress.toFixed(1)}%</span></div>
                  <div className="w-full bg-black h-1.5 rounded-full overflow-hidden border border-white/10">
                     <Motion.div className="h-full bg-emerald-500 shadow-[0_0_10px_currentColor]" animate={{ width: `${progress}%` }} />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingWorkbench;
