import { GoogleGenAI } from "@google/genai";
import { configDotenv } from "dotenv";
configDotenv();

const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY});

async function GEMINI(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are a gemini ai, your task is to generat short answers to answer the user'a query correctly",
    },
  });
  return (response.text);
}

export default GEMINI;