
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GEMMA_RECIPES, RESOURCE_LINKS, TAB_THEMES } from '../constants';

const GemmaRecipeBook: React.FC = () => {
  const Motion = motion as any;
  const theme = TAB_THEMES.recipes;
  const [selectedRecipe, setSelectedRecipe] = useState(GEMMA_RECIPES[0]);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-[10px] font-black uppercase tracking-widest mb-4">
            Technical Blueprints
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-4">Gemma Recipes</h2>
          <p className="text-slate-400 text-lg font-medium">Fine-tuning logic benchmarks with Tunix post-training scripts.</p>
        </div>
        <div className="flex gap-4">
           <a href={RESOURCE_LINKS.TUNIX_REPO} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-300 hover:border-fuchsia-500/30 transition-all flex items-center shadow-xl">
             <svg className="w-4 h-4 mr-3 text-fuchsia-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
             Gemma GitHub
           </a>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Selection List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-3">
            {GEMMA_RECIPES.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className={`w-full text-left p-8 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden group ${
                  selectedRecipe.id === recipe.id
                    ? 'bg-fuchsia-600/10 border-fuchsia-500/50 shadow-2xl shadow-fuchsia-500/5'
                    : 'bg-slate-900/60 border-slate-800 hover:border-fuchsia-500/30'
                }`}
              >
                <div className="relative z-10">
                  <h3 className={`text-xl font-black tracking-tight ${selectedRecipe.id === recipe.id ? 'text-fuchsia-400' : 'text-white'}`}>
                    {recipe.name}
                  </h3>
                  <div className="flex items-center mt-3 space-x-2">
                     <span className="text-[10px] text-slate-500 font-mono tracking-tighter uppercase">{recipe.model}</span>
                     <div className={`w-1.5 h-1.5 rounded-full ${selectedRecipe.id === recipe.id ? 'bg-fuchsia-400 animate-pulse' : 'bg-slate-800'}`}></div>
                     <span className="text-[10px] text-slate-500 font-mono tracking-tighter uppercase">Recipe v2.1</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] shadow-xl relative overflow-hidden group hover:border-fuchsia-500/30 transition-colors">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-fuchsia-500/5 via-transparent to-transparent"></div>
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 relative z-10">Inference Strategy</h4>
            
            <div className="space-y-4 mb-8 relative z-10">
               <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500 shrink-0">BASE</div>
                  <div className="flex-1 h-0.5 bg-slate-800 relative">
                     <Motion.div 
                        animate={{ left: ['0%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-fuchsia-500/50 blur-sm rounded-full"
                     />
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center text-[10px] font-black text-fuchsia-400 shrink-0 shadow-lg">TUNIX</div>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Tunix post-training prioritizes step-by-step logic over direct token output.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800 relative z-10">
              <a href={RESOURCE_LINKS.HUGGINGFACE_GEMMA} target="_blank" rel="noopener noreferrer" className="text-[10px] text-fuchsia-400 font-black uppercase tracking-widest hover:text-fuchsia-300 transition-colors flex items-center group">
                Explore on HF <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Recipe View */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <Motion.div
              key={selectedRecipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900 border border-slate-800 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col h-full hover:border-fuchsia-500/20 transition-colors"
            >
              <div className="p-10 md:p-12 border-b border-slate-800 bg-fuchsia-950/10 relative">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-fuchsia-500 pointer-events-none">
                  <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start mb-8 min-w-0">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter break-words">{selectedRecipe.name}</h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-1.5 bg-slate-950 rounded-full text-[9px] font-black text-slate-400 border border-slate-800 tracking-widest uppercase">Gemma v2</span>
                      <span className="px-4 py-1.5 bg-fuchsia-500/10 rounded-full text-[9px] font-black text-fuchsia-400 border border-fuchsia-500/20 tracking-widest uppercase">Tunix-SFT</span>
                    </div>
                  </div>
                  <div className="mt-8 md:mt-0 text-left md:text-right shrink-0">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Base LR</span>
                    <span className="text-3xl font-mono text-fuchsia-400 font-black">{selectedRecipe.learningRate}</span>
                  </div>
                </div>
                <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl relative z-10 font-medium italic">
                  "{selectedRecipe.description}"
                </p>
              </div>

              <div className="p-10 md:p-12 space-y-12 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-950/80 p-8 rounded-[2rem] border border-slate-800 shadow-inner group transition-all hover:border-fuchsia-500/30">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center">
                       <div className="w-2 h-2 bg-fuchsia-500 rounded-full mr-3 shadow-[0_0_8px_currentColor]"></div>
                       Methodology
                    </div>
                    <div className="text-sm text-slate-200 font-black tracking-tight">{selectedRecipe.lossFunction}</div>
                  </div>
                  <div className="bg-slate-950/80 p-8 rounded-[2rem] border border-slate-800 shadow-inner group transition-all hover:border-blue-500/30">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center">
                       <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 shadow-[0_0_8px_currentColor]"></div>
                       Architecture
                    </div>
                    <div className="text-sm text-slate-200 font-black tracking-tight">{selectedRecipe.model}</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Tunix YAML Configuration</label>
                    <button className="text-[10px] text-fuchsia-400 font-black uppercase tracking-widest hover:text-fuchsia-300 transition-colors">
                      Copy Raw Payload
                    </button>
                  </div>
                  <div className="relative group">
                     <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-[2.5rem] blur opacity-5 group-hover:opacity-10 transition duration-1000"></div>
                     <pre className="relative bg-black/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-slate-800 text-xs md:text-sm text-fuchsia-300 font-mono leading-loose overflow-x-auto shadow-2xl custom-scrollbar">
                       {selectedRecipe.configYaml}
                     </pre>
                  </div>
                </div>
              </div>
            </Motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GemmaRecipeBook;
