
export enum ModelType {
  BASELINE = 'baseline',
  REASONING_ENABLED = 'reasoning_enabled'
}

export enum ReasoningLevel {
  NONE = 'none',
  SHORT = 'short',
  FULL = 'full'
}

export interface ReasoningStep {
  step: number;
  label: string;
  detail: string;
  confidence: number;
}

export interface FeatureImportance {
  feature: string;
  weight: number;
}

export interface PredictionResult {
  prediction: string;
  confidence: number;
  reasoningTrace: ReasoningStep[];
  featureImportance: FeatureImportance[];
  executionTimeMs: number;
  logicalCoherenceScore: number;
  rawOutput: string; // The strict <reasoning><answer> format
}

export interface TrainingRecipe {
  id: string;
  name: string;
  model: string;
  lossFunction: string;
  learningRate: string;
  epochs: number;
  description: string;
  configYaml: string;
}

export interface TrainingLog {
  epoch: number;
  loss: number;
  answerAccuracy: number;
  reasoningQuality: number;
}
