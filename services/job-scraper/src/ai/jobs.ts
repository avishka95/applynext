import { Part, Type } from '@google/genai';
import { googleGenAI } from './models';
import promptLoader from './promptLoader';

type JobInfo = {
    jobTitle: string;
    company: string;
    location: string;
    employmentType: string;
    datePosted: string;
    description: string;
    requirements: string[];
};

export async function getJobInfoFromPDF(pdf: Buffer) {
    const contents: Part[] = [
        { text: promptLoader.getPrompt('job_extraction')! },
        {
            inlineData: {
                mimeType: 'application/pdf',
                data: Buffer.from(pdf).toString('base64')
            }
        }
    ];
    const response = await googleGenAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    jobTitle: {
                        type: Type.STRING
                    },
                    company: {
                        type: Type.STRING
                    },
                    location: {
                        type: Type.STRING
                    },
                    employmentType: {
                        type: Type.STRING
                    },
                    datePosted: {
                        type: Type.STRING
                    },
                    description: {
                        type: Type.STRING
                    },
                    requirements: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    }
                }
            }
        }
    });
    console.log(response.text);
}
