import dotenv from 'dotenv';
import { getEnvVarBoolean, getEnvVarNumber, getEnvVarString } from './utils/env';

dotenv.config({ quiet: true });

interface Config {
    geminiApiKey: string;
    containerModeOn: boolean | null;
}

function loadEnvConfig(preLoadFn?: () => any): Config {
    if (preLoadFn) {
        preLoadFn();
    }

    return {
        geminiApiKey: getEnvVarString('GEMINI_API_KEY'),
        containerModeOn: getEnvVarBoolean('CONTAINER_MODE_ON', true)
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
