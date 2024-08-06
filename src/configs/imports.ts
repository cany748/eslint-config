import * as pluginImport from "eslint-plugin-import-x";
import type { TypedFlatConfigItem } from "../types";

export function imports(): TypedFlatConfigItem[] {
  return [
    {
      name: "imports",
      plugins: {
        import: pluginImport,
      },
      rules: {
        "import/export": "error",
        "import/first": "error",
        "import/newline-after-import": ["error", { considerComments: true, count: 1 }],
        "import/no-duplicates": "error",
        "import/no-mutable-exports": "error",
        "import/no-named-default": "error",
        "import/no-self-import": "error",
        "import/no-webpack-loader-syntax": "error",
        "import/order": "error",
      },
    },
  ];
}
