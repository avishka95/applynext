const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        ...tsJestTransformCfg
    },
    moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
    testMatch: ['**/__tests__/**/*.test.ts'],
    projects: [
        {
            displayName: 'unit',
            testMatch: ['**/__tests__/unit/**/*.test.ts'],
            preset: 'ts-jest',
            testEnvironment: 'node',
            transform: {
                ...tsJestTransformCfg
            },
            testMatch: ['**/__tests__/unit/**/*.test.ts'],
            moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' }
        },
        {
            displayName: 'integration',
            testMatch: ['**/__tests__/integration/**/*.test.ts'],
            preset: 'ts-jest',
            testEnvironment: 'node',
            transform: {
                ...tsJestTransformCfg
            },
            testMatch: ['**/__tests__/integration/**/*.test.ts'],
            moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' }
        },
        {
            displayName: 'e2e',
            testMatch: ['**/__tests__/e2e/**/*.test.ts'],
            preset: 'ts-jest',
            testEnvironment: 'node',
            transform: {
                ...tsJestTransformCfg
            },
            testMatch: ['**/__tests__/e2e/**/*.test.ts'],
            moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' }
        }
    ]
};
