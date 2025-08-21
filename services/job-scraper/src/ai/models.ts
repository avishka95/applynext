import config from '@/config';
import { GoogleGenAI } from '@google/genai';

export const googleGenAI = new GoogleGenAI({
  apiKey: config.geminiApiKey,
});
