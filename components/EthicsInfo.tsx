
import React from 'react';
import { RESOURCE_LINKS } from '../constants';

const EthicsInfo: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-widest mb-2">
          Safety First Architecture
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">AI Transparency & Ethics</h2>
        <p className="text-slate-400 text-lg font-medium">Understanding the implications of exposing internal model weights and logical paths.</p>
      </header>

      <section className="space-y-8">
        <h3 className="text-2xl font-black text-white flex items-center space-x-4">
          <span className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm border border-blue-500/20 shadow-lg">1</span>
          <span>When is Transparency Helpful?</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] hover:bg-slate-800 transition-all shadow-lg group hover:border-blue-500/30">
            <h4 className="text-blue-400 font-black mb-3 text-lg uppercase tracking-tight">High-Stakes Decisions</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              In medicine, law, or finance, knowing *why* a model recommends a course of action is more important than the action itself. It allows human experts to verify logical consistency.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] hover:bg-slate-800 transition-all shadow-lg group hover:border-emerald-500/30">
            <h4 className="text-emerald-400 font-black mb-3 text-lg uppercase tracking-tight">System Debugging</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Developers can use reasoning traces to identify hallucination sources or dataset bias, leading to more robust fine-tuning and safer model deployments.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h3 className="text-2xl font-black text-white flex items-center space-x-4">
          <span className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-sm border border-rose-500/20 shadow-lg">2</span>
          <span>When is Transparency Risky?</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] border-l-4 border-l-rose-500/50 shadow-lg hover:bg-slate-800 transition-all group hover:border-rose-500/30">
            <h4 className="text-rose-400 font-black mb-3 text-lg uppercase tracking-tight">Adversarial Attacks</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Exposing feature weights can make it easier for malicious actors to craft "poisoned" inputs that exploit specific logical shortcuts in the model's reasoning.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] border-l-4 border-l-amber-500/50 shadow-lg hover:bg-slate-800 transition-all group hover:border-amber-500/30">
            <h4 className="text-amber-400 font-black mb-3 text-lg uppercase tracking-tight">Cognitive Overload</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              For simple tasks, showing reasoning might overwhelm users, leading to slower decision cycles and "transparency fatigue."
            </p>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-rose-950/20 border border-slate-800 rounded-[3rem] p-12 relative overflow-hidden group hover:border-rose-500/20 transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl pointer-events-none"></div>
        <h3 className="text-2xl font-black text-white mb-6 tracking-tight flex items-center">
           <svg className="w-6 h-6 mr-3 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
           TUNIX Privacy Guarantee
        </h3>
        <p className="text-slate-300 text-base leading-loose max-w-2xl font-medium italic">
          "Our reasoning engines are trained using Differential Privacy. Feature importance metrics represent aggregate weights and do not expose sensitive training samples. We adhere to the Google AI Principles for responsible development."
        </p>
      </div>
    </div>
  );
};

export default EthicsInfo;
