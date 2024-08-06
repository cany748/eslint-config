# @cany748/eslint-config

ESLint config for JavaScript, TypeScript, Vue 2/3.

Based on [Anthony Fu](https://github.com/antfu/eslint-config) configs.

## Usage

### Install

```bash
pnpm add -D @cany748/eslint-config
# Or yarn add -D / npm install -D / bun add -D
```

### Config

```ts
// eslint.config.ts
{
  import { factoryConfig } from "@cany748/eslint-config";

  export default factoryConfig({
    // Type of the project. 'lib' for libraries, the default is 'app'
    type: "lib",

    // TypeScript, Vue and UnoCSS are autodetected, you can also explicitly enable them:
    typescript: true,
    vue: true,
    unocss: true,

    // to enable type-aware rules use
    typescript: { tsconfigPath: "./tsconfig.json", filesTypeAware: ["**/*.{ts,tsx,vue}"] },
  });
}
```

```jsonc
// `.prettierrc` or `prettier` on `package.json`
{
  "printWidth": 140
}
```

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`:

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

and then

```bash
pnpm add -D lint-staged simple-git-hooks
```

### View what rules are enabled

Go to your project root that contains `eslint.config.*` and run:

```bash
npx @eslint/config-inspector
```
