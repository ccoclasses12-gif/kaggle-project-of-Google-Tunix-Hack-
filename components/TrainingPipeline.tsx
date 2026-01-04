
import React from 'react';
import { motion } from 'framer-motion';

interface TrainingPipelineProps {
  currentStage: number;
  isTraining: boolean;
}

const TrainingPipeline: React.FC<TrainingPipelineProps> = ({ currentStage, isTraining }) => {
  // Cast motion to any to bypass missing property type errors (initial, animate, etc.)
  const Motion = motion as any;
  const stages = [
    { id: 1, title: 'Checkpoint', desc: 'Base Weights' },
    { id: 2, title: 'Reasoning SFT', desc: 'Logic Alignment' },
    { id: 3, title: 'Reward Model', desc: 'Consistency Check' },
    { id: 4, title: 'Distillation', desc: 'Optimization' },
  ];

  return (
    <div className="w-full py-8 px-4">
      <div className="relative flex justify-between items-center">
        {/* Background Connector */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>
        
        {/* Active Connector Path */}
        {/* Use cast motion component to satisfy missing property types */}
        <Motion.div 
          className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 z-0"
          initial={{ width: '0%' }}
          animate={{ width: `${(Math.max(0, currentStage - 1) / (stages.length - 1)) * 100}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {stages.map((stage, idx) => {
          const isActive = currentStage >= stage.id;
          const isProcessing = isTraining && currentStage === stage.id;

          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center">
              {/* Use cast motion component to satisfy missing property types */}
              <Motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.8,
                  backgroundColor: isActive ? '#10b981' : '#1e293b',
                  borderColor: isProcessing ? '#60a5fa' : isActive ? '#059669' : '#334155',
                }}
                className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center shadow-2xl transition-all duration-500`}
              >
                {isProcessing ? (
                  /* Use cast motion component to satisfy missing property types */
                  <Motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full"
                  />
                ) : (
                  <span className={`text-xs font-black ${isActive ? 'text-white' : 'text-slate-500'}`}>
                    0{stage.id}
                  </span>
                )}
                
                {/* Pulse for processing state */}
                {isProcessing && (
                  /* Use cast motion component to satisfy missing property types */
                  <Motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-2xl bg-emerald-500"
                  />
                )}
              </Motion.div>
              
              <div className="mt-4 text-center min-w-[80px]">
                <h4 className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-slate-600'}`}>
                  {stage.title}
                </h4>
                <p className="text-[8px] text-slate-500 font-medium mt-1 truncate">
                  {stage.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Animated Data Particles during training */}
      {isTraining && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden h-40">
          {Array.from({ length: 6 }).map((_, i) => (
            /* Use cast motion component to satisfy missing property types */
            <Motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              initial={{ 
                x: `${(Math.max(0, currentStage - 2) / (stages.length - 1)) * 100}%`,
                y: '50%',
                opacity: 0 
              }}
              animate={{ 
                x: `${(currentStage / stages.length) * 100}%`,
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.3,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainingPipeline;
