
import React from 'react';
import { TrainingRecipe } from './types';

export const TAB_THEMES: Record<string, { primary: string; secondary: string; accent: string; bg: string }> = {
  dashboard: { primary: 'indigo-500', secondary: 'violet-600', accent: 'cyan-400', bg: 'indigo-500/5' },
  lab: { primary: 'blue-500', secondary: 'cyan-500', accent: 'indigo-400', bg: 'blue-500/5' },
  training: { primary: 'emerald-500', secondary: 'teal-500', accent: 'cyan-400', bg: 'emerald-500/5' },
  recipes: { primary: 'fuchsia-500', secondary: 'violet-500', accent: 'pink-400', bg: 'fuchsia-500/5' },
  metrics: { primary: 'amber-500', secondary: 'orange-500', accent: 'yellow-400', bg: 'amber-500/5' },
  ethics: { primary: 'rose-500', secondary: 'red-500', accent: 'orange-400', bg: 'rose-500/5' },
};

export const RESOURCE_LINKS = {
  GEMMA_MODELS: "https://ai.google.dev/gemma",
  TUNIX_REPO: "https://github.com/google/tunix",
  JAX_DOCS: "https://jax.readthedocs.io/",
  KAGGLE_GEMMA: "https://www.kaggle.com/models/google/gemma",
  HUGGINGFACE_GEMMA: "https://huggingface.co/google/gemma-2-2b",
  GEMMA_SAFETY_WHITEPAPER: "https://storage.googleapis.com/gweb-uniblog-publish-prod/documents/Gemma_Technical_Report.pdf"
};

export const SAMPLE_QUERIES = [
  "Solve: A farmer has 17 sheep, all but 9 die. How many are left?",
  "Logical Syllogism: All Gemma models are JAX-native. Some JAX-native tools use TPU. Are all Gemma models TPU-compatible?",
  "Calculate: If a car travels 60 miles in 1 hour and 15 minutes, what is its average speed in mph?",
  "Philosophy: Explain why 'Think first, talk later' improves LLM reliability."
];

export const DOMAIN_PERFORMANCE = [
  { domain: 'Math', score: 92, color: '#6366f1' },
  { domain: 'Coding', score: 88, color: '#3b82f6' },
  { domain: 'Creative', score: 95, color: '#a855f7' },
  { domain: 'Science', score: 84, color: '#06b6d4' },
];

export const GEMMA_RECIPES: TrainingRecipe[] = [
  {
    id: 'gemma-2b-sft',
    name: 'Gemma2-2B Reasoning SFT',
    model: 'Gemma2-2B-IT',
    lossFunction: 'Cross-Entropy + Reasoning Reward',
    learningRate: '2e-5',
    epochs: 3,
    description: 'Standard Supervised Fine-Tuning focusing on step-by-step rationales using the Tunix JAX pipeline.',
    configYaml: `model: gemma2_2b\ntraining:\n  method: sft\n  dataset: reasoning_traces_v1\n  optimizer: adamw\n  scheduler: cosine`
  },
  {
    id: 'gemma-1b-dpo',
    name: 'Gemma3-1B Logic Alignment',
    model: 'Gemma3-1B-Base',
    lossFunction: 'DPO (Direct Preference Optimization)',
    learningRate: '5e-6',
    epochs: 5,
    description: 'Preference-based optimization using Tunix to penalize hallucinated reasoning steps in small-scale models.',
    configYaml: `model: gemma3_1b\ntraining:\n  method: dpo\n  beta: 0.1\n  reference_model: gemma3_1b_sft\n  tpu_cores: 8`
  }
];

export const INITIAL_COMPARISON_DATA = [
  { modelType: 'Base Gemma2', avgConfidence: 0.65, avgAccuracy: 72, trustScore: 35 },
  { modelType: 'Gemma-Tunix (SFT)', avgConfidence: 0.88, avgAccuracy: 92, trustScore: 89 },
];

export const MOCK_TRAINING_LOGS = Array.from({ length: 20 }, (_, i) => ({
  epoch: i + 1,
  loss: Math.exp(-i / 5) * 2 + Math.random() * 0.1,
  answerAccuracy: 50 + (i * 2) + Math.random() * 5,
  reasoningQuality: 30 + (i * 3) + Math.random() * 3,
}));

export const TUNIX_CURRICULUM = [
  { stage: 1, title: "Checkpoint Loading", tasks: "Gemma2 2B weights initialization on TPU", difficulty: "System" },
  { stage: 2, title: "Reasoning SFT", tasks: "Fine-tuning on verified CoT rationales", difficulty: "Medium" },
  { stage: 3, title: "Consistency Loop", tasks: "Tunix reward function alignment", difficulty: "High" },
  { stage: 4, title: "Final Distillation", tasks: "Compressing logic into 2B parameters", difficulty: "Extreme" },
];

export const ICONS = {
  Brain: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Chart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Training: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86 1.406l-2.435 2.124a3 3 0 01-1.938.88H5.25a2 2 0 01-2-2V5.25a2 2 0 012-2h10.23a2 2 0 011.644.86l2.125 2.91a2 2 0 01.351.688l.53 1.9a2 2 0 01-.11 1.44l-.791 1.6z" />
    </svg>
  ),
  Book: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Info: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};
