import { getEnvVarBoolean, getEnvVarNumber, getEnvVarString } from '@/utils/env';
import { preLoadFn } from '../config';

beforeAll(() => {
    preLoadFn(); // Ensure the environment variables are loaded before testing
});

describe('env utility functions', () => {
    test('getEnvVar functions', () => {
        const sampleString = getEnvVarString('TEST_SAMPLE_STRING');
        const sampleNumber = getEnvVarNumber('TEST_SAMPLE_NUMBER');
        const sampleBoolean = getEnvVarBoolean('TEST_SAMPLE_BOOLEAN');

        expect(typeof sampleString).toBe('string');
        expect(typeof sampleNumber).toBe('number');
        expect(typeof sampleBoolean).toBe('boolean');
    });
});
