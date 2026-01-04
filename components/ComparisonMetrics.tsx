
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { INITIAL_COMPARISON_DATA, TAB_THEMES } from '../constants';
import { formatCompactNumber } from '../utils/formatters';

const ComparisonMetrics: React.FC = () => {
  const theme = TAB_THEMES.metrics;
  const radarData = [
    { subject: 'Consistency', pre: 55, post: 94 },
    { subject: 'Logic', pre: 10, post: 98 },
    { subject: 'Accuracy', pre: 78, post: 92 },
    { subject: 'Trust', pre: 35, post: 89 },
    { subject: 'Safety', pre: 40, post: 91 },
  ];

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-500 box-contained">
      <header className="min-w-0">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest mb-4">
          Empirical Validation
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-2 break-words tracking-tighter leading-none">Evaluation Suite</h2>
        <p className="text-slate-400 font-medium truncate">Benchmarking logical coherence gains across architecture variants.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 min-w-0 box-contained">
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 shadow-2xl box-contained min-h-[400px] group hover:border-amber-500/20 transition-colors">
          <h3 className="text-sm md:text-lg font-black text-white mb-8 truncate flex items-center">
            <span className="w-2 h-2 rounded-full bg-amber-500 mr-3"></span>
            Performance Metrics
          </h3>
          <div className="h-[300px] md:h-[350px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INITIAL_COMPARISON_DATA} margin={{ bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="modelType" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', fontSize: '10px' }} />
                <Legend verticalAlign="top" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', textTransform: 'uppercase', fontWeight: 800 }} />
                <Bar name="Accuracy" dataKey="avgAccuracy" fill="#f59e0b" radius={[6, 6, 0, 0]} animationDuration={1500} />
                <Bar name="Trust" dataKey="trustScore" fill="#d97706" radius={[6, 6, 0, 0]} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 shadow-2xl box-contained min-h-[400px] group hover:border-orange-500/20 transition-colors">
          <h3 className="text-sm md:text-lg font-black text-white mb-8 truncate flex items-center">
             <span className="w-2 h-2 rounded-full bg-orange-500 mr-3"></span>
             Attribute Radar
          </h3>
          <div className="h-[300px] md:h-[350px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} tick={{fontWeight: 600}} />
                <Radar name="Baseline" dataKey="pre" stroke="#64748b" fill="#64748b" fillOpacity={0.1} />
                <Radar name="Tunix" dataKey="post" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', fontSize: '10px' }} />
                <Legend verticalAlign="top" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 min-w-0 box-contained">
         {[
           { label: 'Consistency Delta', val: '+22%', color: 'text-amber-400', bg: 'bg-amber-500/10' },
           { label: 'Logic Multiplier', val: '9.8x', color: 'text-orange-400', bg: 'bg-orange-500/10' },
           { label: 'Benchmark Score', val: '92.4%', color: 'text-yellow-400', bg: 'bg-yellow-500/10' }
         ].map((stat, i) => (
           <div key={i} className={`bg-slate-900 border border-slate-800 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] text-center shadow-xl box-contained min-w-0 shrink-0 group hover:border-amber-500/20 transition-all active:scale-98`}>
             <h4 className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-hover:text-slate-400 transition-colors">{stat.label}</h4>
             <p className={`text-2xl md:text-4xl font-black ${stat.color} truncate`}>{stat.val}</p>
           </div>
         ))}
      </div>
    </div>
  );
};

export default ComparisonMetrics;
