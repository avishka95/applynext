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
  try {
    if (fs.existsSync('/.dockerenv')) return true;

    const cgroup = fs.readFileSync('/proc/self/cgroup', 'utf8');
    if (cgroup.includes('docker') || cgroup.includes('kubepods')) return true;
  } catch {
    // ignore
  }

  return false;
}

/**
 * Retrieves the value of the specified environment variable as a string.
 *
 * @param varName - The name of the environment variable to retrieve.
 * @param configLoaderFn - Optional function to load configuration if needed.
 * @returns The value of the specified environment variable.
 * @throws {Error} If the environment variable is not defined.
 */
export function getEnvVarString(varName: string): string {
  const envVar = process.env[varName];
  if (envVar === undefined) {
    throw Error(`Following environment variable not provided: ${varName}`);
  }

  return envVar;
}

/**
 * Retrieves the value of the specified environment variable as a number.
 * Throws an error if the environment variable is not a valid number.
 *
 * @param varName - The name of the environment variable to retrieve.
 * @param configLoaderFn - Optional function to load configuration if needed.
 * @returns The numeric value of the environment variable.
 * @throws {Error} If the environment variable is not a valid number or not defined.
 */
export function getEnvVarNumber(varName: string): number {
  const envVar = Number(getEnvVarString(varName));
  if (isNaN(envVar)) {
    throw Error(`Environment variable ${varName} is not a valid number`);
  }

  return envVar;
}

/**
 * Retrieves the value of the specified environment variable as a boolean.
 * The environment variable must be set to the string "true" or "false" (case-insensitive).
 * Throws an error if the variable is not set to either "true" or "false".
 *
 * @param varName - The name of the environment variable to retrieve.
 * @param configLoaderFn - Optional function to load configuration if needed.
 * @returns `true` if the environment variable is "true", `false` if it is "false".
 * @throws {Error} If the environment variable is not set to "true", "false" or not defined.
 */
export function getEnvVarBoolean(varName: string): boolean {
  const envVar = getEnvVarString(varName).toLowerCase();
  if (envVar !== 'true' && envVar !== 'false') {
    throw Error(`Environment variable ${varName} must be 'true' or 'false'`);
  }

  return envVar === 'true';
}
