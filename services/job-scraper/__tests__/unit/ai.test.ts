import { JobExtractionPromptName } from '@/ai/types';
import promptLoader from '@/ai/promptLoader';
import { googleGenAI } from '@/ai/models';

describe('AI module', () => {
    const promptNames: JobExtractionPromptName[] = ['job_extraction'];
    var promptLoadResult: number;
    test('if the prompt loader works', async () => {
        promptLoadResult = await promptLoader.loadPrompts();
        expect(promptLoadResult).toBeGreaterThan(0);
    });

    test.each(promptNames)(
        'if all prompts are loaded',
        async (promptName: JobExtractionPromptName) => {
            const prompt = promptLoader.getPrompt(promptName);
            expect(prompt).not.toBeNull();
        }
    );
});
