import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from "../globs";
import { interopDefault } from "../utils";
import type { OptionsFiles, TypedFlatConfigItem } from "../types";

export async function jsonc(options: OptionsFiles = {}): Promise<TypedFlatConfigItem[]> {
  const { files = [GLOB_JSON, GLOB_JSON5, GLOB_JSONC] } = options;

  const pluginJsonc = await interopDefault(import("eslint-plugin-jsonc"));

  return [
    {
      name: "jsonc",
      files,
      language: "jsonc/x",
      plugins: {
        jsonc: pluginJsonc,
      },
      rules: {
        strict: "off",
        "no-unused-expressions": "off",
        "no-unused-vars": "off",
        "jsonc/no-bigint-literals": "error",
        "jsonc/no-binary-expression": "error",
        "jsonc/no-binary-numeric-literals": "error",
        "jsonc/no-dupe-keys": "error",
        "jsonc/no-escape-sequence-in-identifier": "error",
        "jsonc/no-hexadecimal-numeric-literals": "error",
        "jsonc/no-infinity": "error",
        "jsonc/no-irregular-whitespace": "error",
        "jsonc/no-multi-str": "error",
        "jsonc/no-nan": "error",
        "jsonc/no-number-props": "error",
        "jsonc/no-numeric-separators": "error",
        "jsonc/no-octal-numeric-literals": "error",
        "jsonc/no-octal": "error",
        "jsonc/no-parenthesized": "error",
        "jsonc/no-plus-sign": "error",
        "jsonc/no-regexp-literals": "error",
        "jsonc/no-sparse-arrays": "error",
        "jsonc/no-template-literals": "error",
        "jsonc/no-undefined-value": "error",
        "jsonc/no-unicode-codepoint-escapes": "error",
        "jsonc/no-useless-escape": "error",
        "jsonc/valid-json-number": "error",
        "jsonc/vue-custom-block/no-parsing-error": "error",
      },
    },
  ];
}
