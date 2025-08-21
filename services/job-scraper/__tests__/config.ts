import { getLoadedConfig } from "@/config";
import { getEnvVarString } from "@/utils/env";
import dotenv from "dotenv";

interface Config {
	validJobUrl: string;
}

export function preLoadFn() {
	dotenv.config({
		path: ".env.test",
        quiet: true,
	});
}

function loadEnvConfig(preLoadFn?: () => any): Config {
    if (preLoadFn) {
        preLoadFn();
    }
    
    const validJobUrl: string = getEnvVarString("TEST_VALID_JOB_URL");

    return {
        validJobUrl,
    };
}

const config: Config = getLoadedConfig(() => loadEnvConfig(preLoadFn));
export default config;
