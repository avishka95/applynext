// eslint.config.js (or .mjs)
import { defineConfig } from 'eslint/config';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
    },
    rules: {
      // TypeScript-specific
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      // Import ordering
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          // Optionally adjust pathGroups for alias directories
        },
      ],
    },
  },
  eslintConfigPrettier, // Turn off any conflicting rules with Prettier
]);
