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
        "unicorn/no-array-sort": "off",
        "unicorn/no-asterisk-prefix-in-documentation-comments": "off",
        "unicorn/no-break-in-nested-loop": "off",
        "unicorn/no-computed-property-existence-check": "off",
        "unicorn/no-duplicate-loops": "off",
        "unicorn/no-mismatched-map-key": "off",
        "unicorn/no-null": "off",
        "unicorn/no-this-outside-of-class": "off",
        "unicorn/no-top-level-assignment-in-function": "off",
        "unicorn/no-top-level-side-effects": "off",
        "unicorn/no-unreadable-for-of-expression": "off",
        "unicorn/no-unreadable-object-destructuring": "off",
        "unicorn/prefer-await": "off",
        "unicorn/prefer-continue": "off",
        "unicorn/prefer-dom-node-html-methods": "off",
        "unicorn/prefer-early-return": "off",
        "unicorn/prefer-global-this": "off",
        "unicorn/prefer-https": "off",
        "unicorn/prefer-iterator-to-array": "off",
        "unicorn/prefer-simple-condition-first": "off",
        "unicorn/prefer-string-replace-all": "off",
        "unicorn/prefer-structured-clone": "off",
        "unicorn/prefer-ternary": "off",
        "unicorn/prefer-top-level-await": "off",
        "unicorn/prevent-abbreviations": "off",
        "unicorn/require-array-sort-compare": "off",
        "unicorn/single-line-block-comment-style": "off",
      },
    },
  ];
}
