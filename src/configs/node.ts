import pluginNode from "eslint-plugin-n";
import type { TypedFlatConfigItem } from "../types";

export function node(): TypedFlatConfigItem[] {
  return [
    {
      name: "node",
      plugins: {
        n: pluginNode,
      },
      rules: {
        "n/handle-callback-err": ["error", "^(err|error)$"],
        "n/no-deprecated-api": "error",
        "n/no-exports-assign": "error",
        "n/no-new-require": "error",
        "n/no-path-concat": "error",
        "n/prefer-global/buffer": ["error", "always"],
        "n/prefer-global/console": ["error", "always"],
        "n/prefer-global/process": ["error", "always"],
        "n/prefer-global/text-decoder": ["error", "always"],
        "n/prefer-global/text-encoder": ["error", "always"],
        "n/prefer-global/url": ["error", "always"],
        "n/prefer-global/url-search-params": ["error", "always"],
        "n/process-exit-as-throw": "error",
      },
    },
  ];
}
