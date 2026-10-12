import pluginUnicorn from "eslint-plugin-unicorn";
import type { TypedFlatConfigItem } from "../types";
import { GLOB_SRC, GLOB_VUE } from "../globs";

export function unicorn(): TypedFlatConfigItem[] {
  return [
    {
      name: "unicorn",
      plugins: {
        unicorn: pluginUnicorn,
      },
      files: [GLOB_SRC, GLOB_VUE],
      rules: {
        ...pluginUnicorn.configs.recommended.rules,

        "unicorn/consistent-boolean-name": "off",
        "unicorn/consistent-conditional-object-spread": "off",
        "unicorn/consistent-function-scoping": "off",
        "unicorn/filename-case": "off",
        "unicorn/import-style": "off",
        "unicorn/max-nested-calls": "off",
        "unicorn/name-replacements": "off",
        "unicorn/no-array-callback-reference": "off",
        "unicorn/no-computed-property-existence-check": "off",
        "unicorn/no-null": "off",
        "unicorn/no-this-outside-of-class": "off",
        "unicorn/no-top-level-assignment-in-function": "off",
        "unicorn/no-top-level-side-effects": "off",
        "unicorn/prefer-await": "off",
        "unicorn/prefer-dom-node-html-methods": "off",
        "unicorn/prefer-global-this": "off",
        "unicorn/prefer-https": "off",
        "unicorn/prefer-string-replace-all": "off",
        "unicorn/prefer-structured-clone": "off",
        "unicorn/prefer-ternary": "off",
        "unicorn/prefer-top-level-await": "off",
        "unicorn/prevent-abbreviations": "off",
        "unicorn/single-line-block-comment-style": "off",
      },
    },
  ];
}
