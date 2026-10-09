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
        "unicorn/name-replacements": "off",
        "unicorn/no-array-callback-reference": "off",
        "unicorn/no-computed-property-existence-check": "off",
        "unicorn/no-null": "off",
        "unicorn/no-top-level-assignment-in-function": "off",
        "unicorn/no-top-level-side-effects": "off",
        "unicorn/prefer-await": "off",
        "unicorn/prefer-global-this": "off",
        "unicorn/prefer-string-replace-all": "off",
        "unicorn/prefer-structured-clone": "off",
        "unicorn/prefer-top-level-await": "off",
        "unicorn/prevent-abbreviations": "off",
      },
    },
  ];
}
