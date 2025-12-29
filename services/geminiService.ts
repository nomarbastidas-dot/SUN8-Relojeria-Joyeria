
import { GoogleGenAI } from "@google/genai";
import { Product, Language } from "../types";

class GeminiService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  private getAiInstance(): GoogleGenAI | null {
    const apiKey = this.getApiKey();
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  }

  async generateResponse(history: {role: string, parts: {text: string}[]}[], userMessage: string, products: Product[], language: Language): Promise<string> {
    const ai = this.getAiInstance();
    
    if (!ai) {
      return language === 'es' 
        ? "Lo siento, no puedo conectar con mi base de datos de estilo en este momento (Falta clave API)." 
        : language === 'fr'
        ? "Désolé, je ne peux pas me connecter à ma base de données de style pour le moment (Clé API manquante)."
        : "I apologize, but I cannot connect to my styling database at the moment. (Missing API Key)";
    }

    const productContext = products.map(p => 
      `- ${p.title} (${p.category}): $${p.price}. ${p.description}. Features: ${p.features.join(', ')}`
    ).join('\n');

    const systemInstruction = `
      You are "Aura", the AI Concierge for SUN8, a luxury brand selling high-end watches and jewelry.
      
      Current Language Setting: ${language.toUpperCase()}
      
      Your Tone:
      - Sophisticated, polite, elegant, and helpful.
      - Use a premium vocabulary appropriate for the selected language.
      - Keep responses concise but warm.
      
      Your Goal:
      - Assist customers in finding the perfect item from our catalog.
      - Answer questions about styling.
      - If a user asks for a recommendation, suggest specific products from the catalog below.
      
      Catalog Data:
      ${productContext}
      
      Rules:
      - Do not invent products not in the list.
      - You MUST respond in the language: ${language === 'es' ? 'Spanish (Español)' : language === 'fr' ? 'French (Français)' : 'English'}.
      - If asked about price, state it clearly.
    `;

    try {
        const contents = [
            ...history.map(h => ({
                role: h.role,
                parts: h.parts
            })),
            {
                role: 'user',
                parts: [{ text: userMessage }]
            }
        ];

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
            maxOutputTokens: 500,
        }
      });

      return result.text || (language === 'es' ? "Lo siento, hubo un silencio momentáneo." : "I apologize, I am having a moment of silence.");
    } catch (error) {
      console.error("Gemini API Error:", error);
      return language === 'es' 
        ? "No puedo acceder a los servidores de estilo en este momento. Por favor, inténtalo de nuevo."
        : "I am currently unable to access the styling servers. Please try again in a moment.";
    }
  }

  async generateVeoVideo(imageBase64: string, mimeType: string, prompt: string, aspectRatio: '16:9' | '9:16'): Promise<string> {
    const ai = this.getAiInstance();
    if (!ai) throw new Error("API Key missing");

    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt || 'Cinematic animation of the object',
      image: {
        imageBytes: imageBase64,
        mimeType: mimeType,
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio
      }
    });

    // Poll for completion
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({operation: operation});
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) throw new Error("Video generation failed - No URI returned");
    
    // Fetch video bytes using API Key
    const apiKey = this.getApiKey();
    const videoRes = await fetch(`${videoUri}&key=${apiKey}`);
    
    if (!videoRes.ok) {
        throw new Error("Failed to download generated video");
    }

    const blob = await videoRes.blob();
    return URL.createObjectURL(blob);
  }
}

export const geminiService = new GeminiService();
