import dotenv from 'dotenv';
import { getEnvVarNumber, getEnvVarString } from './utils/env';

dotenv.config({ quiet: true });

interface Config {
  geminiApiKey: string;
}

function loadEnvConfig(preLoadFn?: () => any): Config {
  if (preLoadFn) {
    preLoadFn();
  }

  const geminiApiKey: string = getEnvVarString('GEMINI_API_KEY');

  return {
    geminiApiKey,
  };
}

export function getLoadedConfig<T>(fn: () => T): T {
  try {
    return fn();
  } catch (error) {
    console.error('Failed to load configuration:', error);
    process.exit(1); // Exit the process if configuration loading fails
  }
}

const config: Config = getLoadedConfig(loadEnvConfig);

export default config;
