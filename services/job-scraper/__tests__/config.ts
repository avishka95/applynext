import { getLoadedConfig } from '@/config';
import { getEnvVarString } from '@/utils/env';
import dotenv from 'dotenv';

interface Config {
    validJobUrl: string;
    sampleUserId: string;
    sampleJobPostId: string;
}

export function preLoadFn() {
    dotenv.config({
        path: '.env.test',
        quiet: true
    });
}

function loadEnvConfig(preLoadFn?: () => any): Config {
    if (preLoadFn) {
        preLoadFn();
    }

    return {
        validJobUrl: getEnvVarString('TEST_VALID_JOB_URL'),
        sampleUserId: getEnvVarString('TEST_SAMPLE_USER_ID'),
        sampleJobPostId: getEnvVarString('TEST_SAMPLE_JOB_POST_ID')
    };
}

const config: Config = getLoadedConfig(() => loadEnvConfig(preLoadFn));
export default config;
