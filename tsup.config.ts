import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  shims: true,
  external: ["@typescript-eslint/eslint-plugin", "@typescript-eslint/parser", "vue-eslint-parser"],
  format: ["esm"],
});
