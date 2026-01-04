import { GoogleGenAI, Type } from "@google/genai";
import { PredictionResult, ModelType, ReasoningLevel } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async chatWithTuni(question: string, context: string): Promise<string> {
    const systemInstruction = `
      You are TUNI (Tunix Universal Neural Interface), a Senior AI Engineer guide for the Tunix Hackathon.
      
      Core Mission:
      Explain how to fine-tune Gemma2/3 on Kaggle TPUs within 9 hours.
      Emphasize the strict output format: <reasoning>...</reasoning><answer>...</answer>.
      
      Personality: Proactive, technical, and precise. Use robotic but helpful metaphors.
      
      Current Workbench: ${context}
    `;

    try {
      // Use gemini-3-pro-preview for advanced technical engineering guidance
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: question,
        config: {
          systemInstruction,
          temperature: 0.8,
          maxOutputTokens: 300,
        },
      });

      return response.text || "Communication loop reset. Please restate the query.";
    } catch (error) {
      console.error("TUNI Comms Error:", error);
      return "JAX kernel synchronization failed. Please retry.";
    }
  }

  async runPrediction(query: string, mode: ModelType, level: ReasoningLevel = ReasoningLevel.FULL): Promise<PredictionResult> {
    const startTime = performance.now();
    const isReasoning = mode === ModelType.REASONING_ENABLED;
    
    const systemInstruction = `
      You are a Tunix-Aligned Gemma2 model.
      
      STRICT REQUIREMENT: You must produce output in this EXACT format:
      <reasoning>
      [Multi-step logical trace here]
      </reasoning>
      <answer>
      [Final concise answer here]
      </answer>
      
      Task: Respond to the user's query with high reasoning quality.
      
      Return the final response as a JSON object with:
      1. "rawOutput": The XML formatted string (<reasoning>...<answer>...)
      2. "prediction": Just the content of the <answer> tag.
      3. "confidence": A float 0-1.
      4. "logicalCoherenceScore": A float 0-1.
      5. "reasoningTrace": An array of steps extracted from the <reasoning> block.
      6. "featureImportance": Array of {feature: string, weight: number}.
    `;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        rawOutput: { type: Type.STRING },
        prediction: { type: Type.STRING },
        confidence: { type: Type.NUMBER },
        logicalCoherenceScore: { type: Type.NUMBER },
        reasoningTrace: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              step: { type: Type.INTEGER },
              label: { type: Type.STRING },
              detail: { type: Type.STRING },
              confidence: { type: Type.NUMBER }
            },
            required: ["step", "label", "detail", "confidence"]
          }
        },
        featureImportance: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              feature: { type: Type.STRING },
              weight: { type: Type.NUMBER }
            }
          }
        }
      },
      required: ["rawOutput", "prediction", "confidence", "reasoningTrace", "featureImportance", "logicalCoherenceScore"]
    };

    try {
      // Use gemini-3-pro-preview for complex reasoning benchmarks and structured JSON output
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: query,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema,
          temperature: isReasoning ? 0.7 : 0.1,
        },
      });

      const data = JSON.parse(response.text || '{}');
      const endTime = performance.now();

      return {
        ...data,
        executionTimeMs: Math.round(endTime - startTime),
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();