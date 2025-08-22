import { JobExtractionPromptName } from "@/ai/types";
import promptLoader from "@/ai/promptLoader";
import { googleGenAI } from "@/ai/models";

describe("AI module testing", () => {
  const promptNames: JobExtractionPromptName[] = ["job_extraction"];
  var promptLoadResult: number;
  test("Test prompt loader", async () => {
    promptLoadResult = await promptLoader.loadPrompts();
    expect(promptLoadResult).toBeGreaterThan(0);
  });

  test.each(promptNames)("Test if all prompts are loaded", async (promptName: JobExtractionPromptName) => {
    const prompt = promptLoader.getPrompt(promptName);
    expect(prompt).not.toBeNull();
  });
});
