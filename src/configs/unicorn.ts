import pluginUnicorn from "eslint-plugin-unicorn";
import type { TypedFlatConfigItem } from "../types";

export function unicorn(): TypedFlatConfigItem[] {
  return [
    {
      name: "unicorn",
      plugins: {
        unicorn: pluginUnicorn,
      },
      rules: {
        ...pluginUnicorn.configs.recommended.rules,

        "unicorn/consistent-function-scoping": "off",
        "unicorn/filename-case": "off",
        "unicorn/import-style": "off",
        "unicorn/no-array-callback-reference": "off",
        "unicorn/no-null": "off",
        "unicorn/prefer-string-replace-all": "off",
        "unicorn/prefer-structured-clone": "off",
        "unicorn/prefer-top-level-await": "off",
        "unicorn/prevent-abbreviations": "off",
        "unicorn/prefer-global-this": "off",
      },
    },
  ];
}
