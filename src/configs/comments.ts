import pluginComments from "@eslint-community/eslint-plugin-eslint-comments";
import type { TypedFlatConfigItem } from "../types";

export function comments(): TypedFlatConfigItem[] {
  return [
    {
      name: "@eslint-community/eslint-comments",
      plugins: {
        "@eslint-community/eslint-comments": pluginComments,
      },
      rules: {
        ...pluginComments.configs.recommended.rules,
        "@eslint-community/eslint-comments/disable-enable-pair": "off",
      },
    },
  ];
}
