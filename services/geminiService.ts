import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Generates a 2-choice question based on a topic
export const generateMajorityQuestion = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a provocative "Ultimate 2-Choice Question" for Japanese university students about the topic: "${topic}". 
      It should be a question where opinions would likely be split. 
      Examples: "Love vs Money", "Forgive cheating vs Break up".
      Output ONLY valid JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "The question text in Japanese" },
            optionA: { type: Type.STRING, description: "Option A text" },
            optionB: { type: Type.STRING, description: "Option B text" }
          },
          required: ["text", "optionA", "optionB"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback if API fails
    return {
      text: "もし100万円もらえるなら？",
      optionA: "親友の秘密を売る",
      optionB: "恋人のスマホを壊す"
    };
  }
};

// Generates an open-ended question for anonymous mode
export const generateAnonymousQuestion = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a question for a party game where university students answer anonymously to expose their hidden sides. Topic: "${topic}".
      The question should be funny, slightly edgy, or revealing.
      Output ONLY valid JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "The question text in Japanese" }
          },
          required: ["text"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "今までで一番「無駄だった」と思う高額な買い物は？"
    };
  }
};
