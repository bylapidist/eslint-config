import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/**
 * Base ESLint flat config for Lapidist TypeScript packages.
 *
 * @param {object} options
 * @param {string} options.tsconfigRootDir - Absolute path to the package root (pass `dirname(fileURLToPath(import.meta.url))`).
 * @param {string} [options.tsconfigProject='./tsconfig.eslint.json'] - Path to the tsconfig used by ESLint.
 * @param {string[]} [options.ignores] - Additional glob patterns to ignore (merged with dist/node_modules defaults).
 * @returns {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray}
 */
export function createConfig({
  tsconfigRootDir,
  tsconfigProject = './tsconfig.eslint.json',
  ignores = [],
}) {
  return [
    {
      ignores: ['dist/**', 'node_modules/**', ...ignores],
    },
    {
      files: ['**/*.ts'],
      languageOptions: {
        parser: tsParser,
        parserOptions: {
          project: tsconfigProject,
          tsconfigRootDir,
        },
      },
      plugins: { '@typescript-eslint': tsPlugin },
      rules: {
        ...tsPlugin.configs['strict-type-checked'].rules,
        ...tsPlugin.configs['stylistic-type-checked'].rules,
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          { assertionStyle: 'never' },
        ],
      },
    },
    {
      files: ['tests/**/*.ts'],
      rules: {
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
  ];
}
