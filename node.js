import { createConfig } from './index.js';

/**
 * ESLint flat config for Lapidist Node.js packages.
 *
 * Extends the base config and relaxes `no-require-imports` for packages that
 * mix CJS and ESM (e.g. `eslint.config.cjs` in design-lint).
 *
 * @param {object} options
 * @param {string} options.tsconfigRootDir - Absolute path to the package root.
 * @param {string} [options.tsconfigProject='./tsconfig.eslint.json'] - Path to the tsconfig used by ESLint.
 * @param {string[]} [options.ignores] - Additional glob patterns to ignore.
 * @param {boolean} [options.allowRequire=false] - Set to `true` to permit `require()` calls (needed for `.cjs` entry points).
 * @returns {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray}
 */
export function createNodeConfig({
  tsconfigRootDir,
  tsconfigProject = './tsconfig.eslint.json',
  ignores = [],
  allowRequire = false,
}) {
  const base = createConfig({ tsconfigRootDir, tsconfigProject, ignores });

  if (!allowRequire) return base;

  return [
    ...base,
    {
      files: ['**/*.ts', '**/*.cjs'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ];
}
