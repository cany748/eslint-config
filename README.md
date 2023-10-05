# @cany748/eslint-config

ESLint config for JavaScript, TypeScript, Vue 3 / Nuxt 3.

Based on [Anthony Fu](https://github.com/antfu/eslint-config) and [Kevin Deng](https://github.com/sxzz/eslint-config-legacy) configs.

## Usage

### Install

```bash
pnpm add -D eslint @cany748/eslint-config # JavaScript only
# Or yarn add -D / npm install -D
pnpm add -D eslint @cany748/eslint-config-ts # JavaScript and TypeScript
pnpm add -D eslint @cany748/eslint-config-vue # JavaScript, TypeScript, Vue 3 / Nuxt 3
```

### Config

```jsonc
// `.eslintrc` or `eslintConfig` on `package.json`
{
  "extends": "@cany748"
  // "extends": "@cany748/eslint-config-ts"
  // "extends": "@cany748/eslint-config-vue"
}
```
```jsonc
// `.prettierrc` or `prettier` on `package.json`
{
  "printWidth": 140
}
```

> You don't need `.eslintignore` normally as it has been provided by the preset.

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

## License

MIT License © 2021-PRESENT
