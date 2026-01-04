
import React, { useState, useEffect, memo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { geminiService } from '../services/geminiService';
import { ModelType, PredictionResult, ReasoningLevel } from '../types';
import ReasoningFlow from './ReasoningFlow';
import NeuralArchitecture3D, { VizMode } from './NeuralArchitecture3D';

const MemoizedNeuralArchitecture3D = memo(NeuralArchitecture3D);

const ReasoningLab: React.FC = () => {
  const Motion = motion as any;
  const [error, setError] = useState<string | null>(null);
  const [modelType, setModelType] = useState<ModelType>(ModelType.REASONING_ENABLED);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [view, setView] = useState<'flow' | 'raw' | '3d'>('flow');
  const [activeStepIn3D, setActiveStepIn3D] = useState(-1);
  const [selectedBenchmark, setSelectedBenchmark] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const triggerTuni = useCallback((mood: string, message: string) => {
    window.dispatchEvent(new CustomEvent('tuni-action', { detail: { mood, message } }));
  }, []);

  useEffect(() => {
    let interval: any;
    if (view === '3d' && result?.reasoningTrace) {
      interval = setInterval(() => {
        setActiveStepIn3D(prev => (prev + 1) % result.reasoningTrace.length);
      }, 1200);
    } else {
      setActiveStepIn3D(-1);
    }
    return () => clearInterval(interval);
  }, [view, result]);

  const executeInference = async (query: string, label: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setSelectedBenchmark(label);
    
    const isCustom = label === "Custom Logic";
    triggerTuni('thinking', isCustom 
      ? `Processing manual logic probe. Dissecting user-defined tokens...` 
      : `Initializing ${label} Benchmark trace. Analyzing logical predicates...`);

    try {
      const data = await geminiService.runPrediction(query, modelType, ReasoningLevel.FULL);
      setResult(data);
      triggerTuni('celebrating', `${label} evaluation complete. Reasoning flow is now visualized.`);
    } catch (err) {
      setError("Kernel synchronization error.");
      triggerTuni('error', "Model inference timeout during logic cycle.");
    } finally {
      setLoading(false);
    }
  };

  const benchmarks = [
    { label: "Math Logic", icon: "∑", query: "A farmer has 17 sheep, all but 9 die. How many are left?" },
    { label: "Syllogism", icon: "∴", query: "All Gemma models are JAX-native. Some JAX-native tools use TPU. Are all Gemma models TPU-compatible?" },
    { label: "Calculus", icon: "∫", query: "If a car travels 60 miles in 1 hour and 15 minutes, what is its average speed in mph?" },
    { label: "Ethics", icon: "⚖", query: "Explain why 'Think first, talk later' improves LLM reliability." },
    { label: "Coding", icon: "</>", query: "Write a JAX function to compute the softmax of a tensor efficiently." }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 box-contained">
      <header>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-[0.2em] mb-3">
          Logic Verification Lab
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none mb-2">Reasoning Lab</h2>
        <p className="text-slate-400 text-sm font-medium">Test architectural alignment through benchmarks or manual probes.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Benchmarks & Custom Input */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 shadow-xl lg:sticky lg:top-8 transition-all">
            <div className="space-y-6">
              {/* Architecture Selector */}
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Architecture</label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setModelType(ModelType.REASONING_ENABLED)} className={`px-4 py-2.5 rounded-xl border text-[9px] font-black uppercase transition-all ${modelType === ModelType.REASONING_ENABLED ? 'bg-blue-600/10 border-blue-500/40 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.1)]' : 'border-white/5 text-slate-500 hover:text-slate-300'}`}>Tunix</button>
                  <button onClick={() => setModelType(ModelType.BASELINE)} className={`px-4 py-2.5 rounded-xl border text-[9px] font-black uppercase transition-all ${modelType === ModelType.BASELINE ? 'bg-slate-800 border-white/20 text-white' : 'border-white/5 text-slate-500 hover:text-slate-300'}`}>Standard</button>
                </div>
              </div>

              {/* Custom Input Section */}
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Custom Logic Probe</label>
                <div className="relative group">
                  <textarea
                    ref={inputRef}
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Enter manual query..."
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white font-medium outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all min-h-[100px] resize-none custom-scrollbar"
                  />
                  <button 
                    disabled={loading || !customInput.trim()}
                    onClick={() => executeInference(customInput, "Custom Logic")}
                    className={`absolute bottom-3 right-3 p-2 rounded-xl transition-all ${customInput.trim() ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-600'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>

              {/* Automated Benchmarks Matrix */}
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Benchmarks</label>
                <div className="grid grid-cols-1 gap-2">
                  {benchmarks.map((b) => (
                    <button
                      key={b.label}
                      disabled={loading}
                      onClick={() => executeInference(b.query, b.label)}
                      className={`group flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all duration-200 ${selectedBenchmark === b.label ? 'bg-blue-600 border-blue-500 text-white' : 'bg-black/20 border-white/5 text-slate-400 hover:border-white/20'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-sm opacity-60 group-hover:scale-110 transition-transform">{b.icon}</span>
                        <span className="text-[10px] font-black uppercase tracking-wider">{b.label}</span>
                      </div>
                      <div className={`w-1 h-1 rounded-full ${selectedBenchmark === b.label ? 'bg-white shadow-[0_0_5px_white]' : 'bg-slate-800'}`}></div>
                    </button>
                  ))}
                </div>
              </div>
              
              {error && <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest text-center">{error}</p>}
            </div>
          </div>
        </div>

        {/* Right Side: Results & Visualizations */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            {!result && !loading ? (
              <Motion.div key="idle" className="h-[600px] bg-slate-900/40 border border-white/5 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
                 <div className="w-full h-full absolute inset-0 opacity-10">
                   <MemoizedNeuralArchitecture3D intensity={0.2} mode="architecture" color="#3b82f6" activeNodes={20} />
                 </div>
                 <div className="relative z-10">
                    <h3 className="text-2xl font-black text-white mb-2">Kernel Standby</h3>
                    <p className="text-slate-500 max-w-xs text-sm font-medium">Select a benchmark or input custom logic to begin the reasoning trace.</p>
                 </div>
              </Motion.div>
            ) : loading ? (
              <Motion.div key="loading" className="h-[600px] bg-slate-900/40 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center relative">
                 <div className="w-full h-full absolute inset-0">
                   <MemoizedNeuralArchitecture3D isTraining intensity={2} mode="tokens" color="#3b82f6" activeNodes={40} />
                 </div>
                 <div className="relative z-10 text-center">
                    <span className="text-[12px] font-black text-blue-400 uppercase tracking-[0.4em] animate-pulse">Syncing Logic Nodes</span>
                 </div>
              </Motion.div>
            ) : (
              <Motion.div key="res" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {[
                     { l: 'Consistency', v: `${(result.logicalCoherenceScore*100).toFixed(0)}%`, c: 'text-cyan-400' },
                     { l: 'Confidence', v: `${(result.confidence*100).toFixed(0)}%`, c: 'text-blue-400' },
                     { l: 'Latency', v: `${result.executionTimeMs}ms`, c: 'text-indigo-400' },
                     { l: 'Steps', v: result.reasoningTrace.length, c: 'text-violet-400' }
                   ].map((k, i) => (
                    <div key={i} className="bg-slate-900/80 border border-white/5 p-5 rounded-[2rem] text-center shadow-lg">
                      <div className="text-[8px] text-slate-500 font-black uppercase mb-1 tracking-widest">{k.l}</div>
                      <div className={`text-xl font-black ${k.c}`}>{k.v}</div>
                    </div>
                   ))}
                </div>

                {/* Primary Viz Canvas */}
                <div className="bg-slate-900 border border-white/5 rounded-[3rem] p-6 md:p-10 shadow-xl relative overflow-hidden min-h-[600px]">
                   <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-black/40 rounded-xl w-fit border border-white/5">
                    <button onClick={() => setView('flow')} className={`px-5 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${view === 'flow' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>Flow Map</button>
                    <button onClick={() => setView('raw')} className={`px-5 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${view === 'raw' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>XML Trace</button>
                    <button onClick={() => setView('3d')} className={`px-5 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${view === '3d' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>3D Trace</button>
                  </div>

                  <div className="min-h-[450px]">
                    {view === 'flow' ? (
                      <ReasoningFlow steps={result.reasoningTrace} query={result.prediction} prediction={result.prediction} />
                    ) : view === 'raw' ? (
                      <div className="h-[450px] bg-black/80 rounded-[1.5rem] p-8 border border-white/10 font-mono text-[11px] leading-relaxed overflow-y-auto custom-scrollbar shadow-inner text-blue-300">
                        <div className="text-slate-600 mb-4 select-none italic">// Tunix Native Protocol | v2.1</div>
                        <span className="text-emerald-400">&lt;reasoning&gt;</span>
                        <div className="pl-4 py-2 border-l border-emerald-500/20 my-1">
                          {result.reasoningTrace.map(s => (
                            <div key={s.step} className="mb-3">
                              <span className="text-blue-500/80 font-black mr-2">[NODE_{s.step.toString().padStart(2, '0')}]</span>
                              {s.detail}
                            </div>
                          ))}
                        </div>
                        <span className="text-emerald-400">&lt;/reasoning&gt;</span>
                        <br />
                        <span className="text-cyan-400">&lt;answer&gt;</span>
                        <div className="pl-4 py-2 border-l border-cyan-500/20 my-1 text-white font-bold">
                          {result.prediction}
                        </div>
                        <span className="text-cyan-400">&lt;/answer&gt;</span>
                      </div>
                    ) : view === '3d' ? (
                      <div className="h-[450px] bg-black/20 rounded-[2rem] border border-white/5 relative">
                        <MemoizedNeuralArchitecture3D 
                          activeNodes={result.reasoningTrace.length} 
                          intensity={1} 
                          color="#3b82f6" 
                          mode="reasoning" 
                          activeStep={activeStepIn3D}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ReasoningLab;
