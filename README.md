# @lapidist/eslint-config

Shared ESLint flat config for the [Lapidist](https://lapidist.net) ecosystem.

## Installation

```sh
pnpm add --save-dev @lapidist/eslint-config
```

Peer dependencies (install once per repo):

```sh
pnpm add --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

## Usage

### `createConfig` — base config for ESM TypeScript packages

```js
// eslint.config.js
import { createConfig } from '@lapidist/eslint-config';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default createConfig({
  tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
});
```

### `createNodeConfig` — Node.js packages that mix CJS and ESM

```js
// eslint.config.js
import { createNodeConfig } from '@lapidist/eslint-config/node';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default createNodeConfig({
  tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
  allowRequire: true, // permits require() in .cjs entry points
});
```

## Options

### `createConfig(options)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tsconfigRootDir` | `string` | — | Absolute path to the package root. Pass `dirname(fileURLToPath(import.meta.url))`. |
| `tsconfigProject` | `string` | `'./tsconfig.eslint.json'` | Path to the tsconfig used by ESLint. |
| `ignores` | `string[]` | `[]` | Additional glob patterns to ignore (merged with `dist/**` and `node_modules/**`). |

### `createNodeConfig(options)`

Accepts all of the same options as `createConfig`, plus:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `allowRequire` | `boolean` | `false` | Set to `true` to permit `require()` calls. |

## What's included

Both configs apply:

- `@typescript-eslint/strict-type-checked` — strict type-aware rules
- `@typescript-eslint/stylistic-type-checked` — consistent TypeScript style
- `@typescript-eslint/consistent-type-assertions: ['error', { assertionStyle: 'never' }]` — no `as` assertions in source files

Test files (`tests/**/*.ts`) get relaxed overrides:

- `consistent-type-assertions` is turned off (assertions allowed in tests)
- `no-floating-promises` is turned off

## License

MIT
