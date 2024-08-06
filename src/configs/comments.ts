import pluginComments from "eslint-plugin-eslint-comments";
import type { TypedFlatConfigItem } from "../types";

export function comments(): TypedFlatConfigItem[] {
  return [
    {
      name: "eslint-comments",
      plugins: {
        "eslint-comments": pluginComments,
      },
      rules: {
        ...pluginComments.configs.recommended.rules,
        "eslint-comments/disable-enable-pair": "off",
      },
    },
  ];
}
