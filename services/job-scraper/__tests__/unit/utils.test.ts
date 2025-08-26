import { getEnvVarBoolean, getEnvVarNumber, getEnvVarString } from '@/utils/env';
import { preLoadFn } from '../config';
import logger from '@/utils/logger';

beforeAll(() => {
    preLoadFn(); // Ensure the environment variables are loaded before testing
});

describe('env utility functions', () => {
    test('getEnvVar functions with valid variables', () => {
        const sampleString = getEnvVarString('TEST_SAMPLE_STRING');
        const sampleNumber = getEnvVarNumber('TEST_SAMPLE_NUMBER');
        const sampleBoolean = getEnvVarBoolean('TEST_SAMPLE_BOOLEAN');

        expect(typeof sampleString).toBe('string');
        expect(typeof sampleNumber).toBe('number');
        expect(typeof sampleBoolean).toBe('boolean');
    });

    test('getEnvVar functions with optional non-existing variables', () => {
        const nullString = getEnvVarString('TEST_NOT_FOUND_STRING', true);
        const nullNumber = getEnvVarNumber('TEST_NOT_FOUND_NUMBER', true);
        const nullBoolean = getEnvVarBoolean('TEST_NOT_FOUND_BOOLEAN', true);

        expect(nullString).toBeNull();
        expect(nullNumber).toBeNull();
        expect(nullBoolean).toBeNull();
    });

    test('getEnvVar functions with non-optional non-existing variables', () => {
        expect(() => getEnvVarString('TEST_NOT_FOUND_STRING')).toThrow();
        expect(() => getEnvVarNumber('TEST_NOT_FOUND_NUMBER')).toThrow();
        expect(() => getEnvVarBoolean('TEST_NOT_FOUND_BOOLEAN')).toThrow();
    });
});

describe('logger', () => {
    it('logs as expected', () => {
        const spy = jest.spyOn(logger, 'error');
        const logText = 'TEST';
        logger.error(logText);
        expect(spy).toHaveBeenCalledWith(logText);

        spy.mockReset();
        spy.mockRestore();
    });
});
