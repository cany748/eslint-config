import { GLOB_SRC, GLOB_SRC_EXT } from "../globs";
import type { TypedFlatConfigItem } from "../types";

export function disables(): TypedFlatConfigItem[] {
  return [
    {
      files: [`**/scripts/${GLOB_SRC}`],
      name: "disables/scripts",
      rules: {
        "no-console": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
      },
    },
    {
      files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
      name: "disables/cli",
      rules: {
        "no-console": "off",
      },
    },
    {
      files: ["**/*.d.?([cm])ts"],
      name: "disables/dts",
      rules: {
        "@eslint-community/eslint-comments/no-unlimited-disable": "off",
        "import/no-duplicates": "off",
        "no-restricted-syntax": "off",
        "unused-imports/no-unused-vars": "off",
      },
    },
    {
      files: ["**/*.{test,spec}.([tj])s?(x)"],
      name: "disables/test",
      rules: {
        "no-unused-expressions": "off",
      },
    },
    {
      files: ["**/*.js", "**/*.cjs"],
      name: "disables/cjs",
      rules: {
        "@typescript-eslint/no-require-imports": "off",
      },
    },
    {
      files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
      name: "disables/config-files",
      rules: {
        "no-console": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
      },
    },
  ];
}
