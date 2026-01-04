
import React from 'react';
import { motion } from 'framer-motion';

interface BrainVizProps {
  isTraining: boolean;
  intensity: number;
}

const BrainViz: React.FC<BrainVizProps> = ({ isTraining, intensity }) => {
  // Cast motion to any to bypass missing property type errors (initial, animate, transition, etc.)
  const Motion = motion as any;
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 100 + 70 * Math.cos((i * 2 * Math.PI) / 12),
    y: 100 + 70 * Math.sin((i * 2 * Math.PI) / 12),
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <svg viewBox="0 0 200 200" className="w-full max-w-[300px] drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
        {/* Synapses (Lines) */}
        {nodes.map((node, i) => (
          <React.Fragment key={`lines-${i}`}>
            {nodes.slice(i + 1, i + 4).map((target, j) => (
              /* Use cast motion component to satisfy missing property types */
              <Motion.line
                key={`line-${i}-${j}`}
                x1={node.x}
                y1={node.y}
                x2={target.x}
                y2={target.y}
                stroke={isTraining ? '#10b981' : '#334155'}
                strokeWidth="0.5"
                initial={{ opacity: 0.1 }}
                animate={{
                  opacity: isTraining ? [0.1, 0.8, 0.1] : 0.1,
                  strokeWidth: isTraining ? [0.5, 1.5, 0.5] : 0.5,
                }}
                transition={{
                  duration: 2 / intensity,
                  repeat: Infinity,
                  delay: (i + j) * 0.1,
                }}
              />
            ))}
          </React.Fragment>
        ))}

        {/* Central Core */}
        {/* Use cast motion component to satisfy missing property types */}
        <Motion.circle
          cx="100"
          cy="100"
          r="25"
          fill="url(#coreGradient)"
          animate={{
            r: isTraining ? [25, 30, 25] : 25,
            opacity: isTraining ? [0.8, 1, 0.8] : 0.8,
          }}
          transition={{ duration: 1 / intensity, repeat: Infinity }}
        />

        {/* Outer Nodes */}
        {nodes.map((node) => (
          /* Use cast motion component to satisfy missing property types */
          <Motion.circle
            key={`node-${node.id}`}
            cx={node.x}
            cy={node.y}
            r="4"
            fill={isTraining ? '#10b981' : '#3b82f6'}
            animate={{
              r: isTraining ? [4, 6, 4] : 4,
              opacity: isTraining ? [0.5, 1, 0.5] : 0.6,
            }}
            transition={{
              duration: 1.5 / intensity,
              repeat: Infinity,
              delay: node.id * 0.1,
            }}
          />
        ))}

        <defs>
          <radialGradient id="coreGradient">
            <stop offset="0%" stopColor={isTraining ? '#10b981' : '#3b82f6'} />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Floating Tokens Effect */}
      {isTraining && Array.from({ length: 8 }).map((_, i) => (
        /* Use cast motion component to satisfy missing property types */
        <Motion.div
          key={`token-${i}`}
          className="absolute w-1 h-1 bg-emerald-400 rounded-full"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: (Math.random() - 0.5) * 150,
            y: (Math.random() - 0.5) * 150,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default BrainViz;
