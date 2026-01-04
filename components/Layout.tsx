
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS, TAB_THEMES } from '../constants';
import CompanionRobot from './CompanionRobot';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const Motion = motion as any;
  const [robotMood, setRobotMood] = useState<'happy' | 'thinking' | 'helping' | 'celebrating' | 'error'>('happy');
  const [robotMessage, setRobotMessage] = useState('');
  const [debugMode, setDebugMode] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: ICONS.Brain, hint: "Welcome to Tunix. I'm TUNI. This dashboard provides a high-level view of our reasoning architecture. How can I assist?" },
    { id: 'lab', label: 'Reasoning Lab', icon: ICONS.Settings, hint: "This is the core laboratory. Input a query, and I'll help you dissect the logic gates and attention weights." },
    { id: 'training', label: 'Tunix TPU Trainer', icon: ICONS.Training, hint: "Observe the training curriculum. We use JAX and distributed TPU pods to align model reasoning paths." },
    { id: 'recipes', label: 'Gemma Recipes', icon: ICONS.Book, hint: "Technical blueprints for SFT and DPO cycles. I can help you understand the YAML configurations." },
    { id: 'metrics', label: 'Metrics & Eval', icon: ICONS.Chart, hint: "Quantitative validation. Look at the consistency delta between standard and Tunix models." },
    { id: 'ethics', label: 'Ethics & Safety', icon: ICONS.Info, hint: "Safe AI development. I'll explain our Differential Privacy and transparency protocols." },
  ];

  useEffect(() => {
    const mainContent = document.getElementById('main-scroll-container');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    const currentTab = tabs.find(t => t.id === activeTab);
    if (currentTab) {
      setRobotMessage(currentTab.hint);
      setRobotMood('helping');
      const timer = setTimeout(() => setRobotMood('happy'), 4000);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleRobotAction = (e: any) => {
      if (e.detail.mood) setRobotMood(e.detail.mood);
      if (e.detail.message) setRobotMessage(e.detail.message);
    };
    window.addEventListener('tuni-action', handleRobotAction);
    
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'd') {
        setDebugMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('tuni-action', handleRobotAction);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const currentTheme = TAB_THEMES[activeTab] || TAB_THEMES.dashboard;

  return (
    <div className={`flex h-screen bg-slate-950 overflow-hidden relative selection:bg-${currentTheme.primary}/30 ${debugMode ? 'debug-layout' : ''}`}>
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 bg-slate-900/90 backdrop-blur-3xl border-r border-slate-800 flex-col shrink-0 z-20 box-contained transition-colors duration-700">
        <div className="p-10 border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-4 mb-1 min-w-0">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-${currentTheme.primary} to-${currentTheme.secondary} flex items-center justify-center font-black text-white italic shadow-2xl transform rotate-3 shrink-0 transition-all duration-700 ring-2 ring-white/10`}>G</div>
            <div className="min-w-0">
              <h1 className="text-2xl font-black text-white tracking-tighter truncate">
                Tunix Lab
              </h1>
              <div className="flex items-center space-x-1.5 truncate">
                <span className={`w-2 h-2 rounded-full bg-${currentTheme.primary} animate-pulse shrink-0 transition-colors duration-700 shadow-[0_0_8px_currentColor]`}></span>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] truncate">v2.1 Stable</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
          {tabs.map((tab) => {
            const isTabActive = activeTab === tab.id;
            const theme = TAB_THEMES[tab.id];
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 relative group min-w-0 ${
                  isTabActive
                    ? `bg-${theme.primary}/10 text-${theme.primary} border border-${theme.primary}/30 shadow-xl`
                    : 'text-slate-500 hover:bg-slate-800/40 hover:text-slate-200'
                }`}
              >
                <div className={`transition-transform duration-500 shrink-0 ${isTabActive ? 'scale-110 rotate-3' : 'group-hover:scale-110'}`}>
                  <tab.icon />
                </div>
                <span className="font-black text-xs uppercase tracking-wider truncate">{tab.label}</span>
                {isTabActive && (
                  <Motion.div 
                    layoutId="activeTabIndicator"
                    className={`absolute left-0 w-1.5 h-10 bg-${theme.primary} rounded-r-full shadow-[0_0_20px_rgba(255,255,255,0.4)]`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-8 border-t border-slate-800 shrink-0">
          <div className={`bg-slate-950/80 rounded-[2rem] p-6 border border-slate-800/50 group hover:border-${currentTheme.primary}/40 transition-all duration-500 box-contained shadow-inner relative overflow-hidden`}>
            <div className="flex items-center justify-between mb-4 min-w-0">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] truncate">Core Thermal</span>
              <div className={`w-2.5 h-2.5 rounded-full bg-${currentTheme.primary} shadow-[0_0_12px_currentColor] transition-colors duration-700`}></div>
            </div>
            <p className="text-[11px] text-slate-300 font-mono leading-none mb-1 truncate">TPU-v5p-P01_RUNNING</p>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-4 overflow-hidden border border-white/5">
              <Motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className={`w-1/2 h-full bg-gradient-to-r from-transparent via-${currentTheme.primary} to-transparent transition-all duration-700`}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-5 bg-slate-900 border-b border-slate-800 shrink-0 z-30 min-w-0 shadow-2xl">
          <div className="flex items-center space-x-3 truncate">
            <div className={`w-10 h-10 rounded-xl bg-${currentTheme.primary} flex items-center justify-center font-black text-white italic shrink-0 transition-colors duration-700 shadow-xl`}>G</div>
            <span className="font-black text-lg text-white tracking-tighter truncate">Tunix Lab</span>
          </div>
          <div className="flex space-x-2.5 overflow-x-auto custom-scrollbar whitespace-nowrap px-4 flex-1 scroll-smooth no-scrollbar">
            {tabs.map((tab) => {
              const isTabActive = activeTab === tab.id;
              const theme = TAB_THEMES[tab.id];
              return (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${isTabActive ? `bg-${theme.primary} text-white border-${theme.primary} shadow-lg shadow-${theme.primary}/20` : 'bg-slate-800 text-slate-500 border-slate-700 hover:border-slate-600'}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </header>

        <main id="main-scroll-container" className="flex-1 overflow-y-auto relative bg-slate-950 scroll-smooth custom-scrollbar box-contained">
          {/* Enhanced Immersive Background */}
          <div className="fixed inset-0 pointer-events-none opacity-50 z-0">
             <div className={`absolute top-0 right-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-${currentTheme.primary}/5 blur-[180px] rounded-full -mr-40 -mt-40 transition-all duration-1000 animate-pulse`}></div>
             <div className={`absolute bottom-0 left-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-${currentTheme.secondary}/5 blur-[180px] rounded-full -ml-40 -mb-40 transition-all duration-1000`}></div>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
          </div>
          
          <div className="max-w-6xl mx-auto p-6 md:p-16 relative z-10 pb-48">
            <AnimatePresence mode="wait">
              <Motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full box-contained"
              >
                {children}
              </Motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
      
      <CompanionRobot 
        mood={robotMood} 
        message={robotMessage} 
        currentTab={activeTab}
      />
    </div>
  );
};

export default Layout;
