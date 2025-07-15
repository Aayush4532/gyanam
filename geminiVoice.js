import {GoogleGenAI} from '@google/genai';
import wav from 'wav';
import { configDotenv } from 'dotenv';
configDotenv();

const gemini_api_key = process.env.GEMINI_API_KEY;

async function saveWaveFile(
   filename,
   pcmData,
   channels = 1,
   rate = 24000,
   sampleWidth = 2,
) {
   return new Promise((resolve, reject) => {
      const writer = new wav.FileWriter(filename, {
            channels,
            sampleRate: rate,
            bitDepth: sampleWidth * 8,
      });

      writer.on('finish', resolve);
      writer.on('error', reject);

      writer.write(pcmData);
      writer.end();
   });
}


async function geminiVoice(prompt) {
   const ai = new GoogleGenAI({apiKey : gemini_api_key});

   const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
               voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'kore' },
               },
            },
      },
   });

   const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
   const audioBuffer = Buffer.from(data, 'base64');

   const fileName = 'audio/out.wav';
   await saveWaveFile(fileName, audioBuffer);
}

// await geminiVoice();


export default geminiVoice;