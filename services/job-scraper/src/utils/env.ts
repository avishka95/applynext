import config from '@/config';
import fs from 'fs';

/**
 * Determines if the current process is running inside a Docker or Kubernetes container.
 *
 * This function checks for the presence of the `/.dockerenv` file and inspects
 * the `/proc/self/cgroup` file for indicators of Docker or Kubernetes environments.
 *
 * @returns {boolean} `true` if running inside Docker or Kubernetes, otherwise `false`.
 */
export function isContainerized(): boolean {
    if (typeof config.containerModeOn === 'boolean') {
        // If container mode is explicitly set in the config, return that value
        console.log(`Container mode is set to: ${config.containerModeOn}`);
        return config.containerModeOn;
    }

    try {
        if (fs.existsSync('/.dockerenv')) return true;

        const cgroup = fs.readFileSync('/proc/self/cgroup', 'utf8');
        if (cgroup.includes('docker') || cgroup.includes('kubepods')) return true;
    } catch {
        // ignore
    }

    return false;
}

type EnvVarOptionalIfTrue<T extends boolean, U> = T extends true ? U | null : U;

/**
 * Retrieves the value of the specified environment variable as a string.
 *
 * @param varName - The name of the environment variable to retrieve.
 * @param optional - If `true`, the function will not throw an error if the variable is not defined.
 * @returns The value of the specified environment variable.
 * @throws {Error} If the environment variable is not defined.
 */
export function getEnvVarString<T extends boolean = false>(
    varName: string,
    optional?: T
): EnvVarOptionalIfTrue<T, string> {
    const envVar = process.env[varName];
    if (envVar === undefined) {
        if (optional) return null as EnvVarOptionalIfTrue<T, string>;
        throw Error(`Following environment variable not provided: ${varName}`);
    }

    return envVar as EnvVarOptionalIfTrue<T, string>;
}

/**
 * Retrieves the value of the specified environment variable as a number.
 * Throws an error if the environment variable is not a valid number.
 *
 * @param varName - The name of the environment variable to retrieve.
 * @param optional - If `true`, the function will not throw an error if the variable is not defined.
 * @returns The numeric value of the environment variable.
 * @throws {Error} If the environment variable is not a valid number or not defined.
 */
export function getEnvVarNumber<T extends boolean = false>(
    varName: string,
    optional?: T
): EnvVarOptionalIfTrue<T, number> {
    const envVar = Number(getEnvVarString(varName, optional));
    if (isNaN(envVar)) {
        if (optional) return null as EnvVarOptionalIfTrue<T, number>;
        throw Error(`Environment variable ${varName} is not a valid number`);
    }

    return envVar as EnvVarOptionalIfTrue<T, number>;
}

/**
 * Retrieves the value of the specified environment variable as a boolean.
 * The environment variable must be set to the string "true" or "false" (case-insensitive).
 * Throws an error if the variable is not set to either "true" or "false".
 *
 * @param varName - The name of the environment variable to retrieve.
 * @param optional - If `true`, the function will not throw an error if the variable is not defined.
 * @returns `true` if the environment variable is "true", `false` if it is "false".
 * @throws {Error} If the environment variable is not set to "true", "false" or not defined.
 */
export function getEnvVarBoolean<T extends boolean = false>(
    varName: string,
    optional?: T
): EnvVarOptionalIfTrue<T, boolean> {
    const envVar = getEnvVarString(varName, optional)?.toLowerCase();
    if (envVar !== 'true' && envVar !== 'false') {
        if (optional) return null as EnvVarOptionalIfTrue<T, boolean>;
        throw Error(`Environment variable ${varName} must be 'true' or 'false'`);
    }

    return (envVar === 'true') as EnvVarOptionalIfTrue<T, boolean>;
}
