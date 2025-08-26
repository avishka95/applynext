import fs from 'fs';
import path from 'path';
import { JobExtractionPromptName } from './types';
import logger from '@/utils/logger';

class PromptLoader {
    private static instance: PromptLoader;
    prompts: Map<string, string> = new Map();
    constructor() {
        if (PromptLoader.instance) {
            return PromptLoader.instance;
        }
        PromptLoader.instance = this;
    }

    async loadPrompts(): Promise<number> {
        const promptsDir = path.join(__dirname, '/prompts');
        const files = fs.readdirSync(promptsDir);
        for (const file of files) {
            if (file.endsWith('.md')) {
                const name = file.replace('.md', '');
                this.prompts.set(name, fs.readFileSync(path.join(promptsDir, file), 'utf8'));
            }
        }

        logger.debug(`✅ Loaded ${this.prompts.size} prompts`);
        return this.prompts.size;
    }

    getPrompt(promptName: JobExtractionPromptName): string | null {
        const prompt = this.prompts.get(promptName);
        return prompt || null;
    }
}

export default new PromptLoader();
