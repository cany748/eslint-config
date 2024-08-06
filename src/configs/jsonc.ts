import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from "../globs";
import { interopDefault } from "../utils";
import type { OptionsFiles, TypedFlatConfigItem } from "../types";

export async function jsonc(options: OptionsFiles = {}): Promise<TypedFlatConfigItem[]> {
  const { files = [GLOB_JSON, GLOB_JSON5, GLOB_JSONC] } = options;

  const [pluginJsonc, parserJsonc] = await Promise.all([
    interopDefault(import("eslint-plugin-jsonc")),
    interopDefault(import("jsonc-eslint-parser")),
  ] as const);

  return [
    {
      name: "jsonc",
      files,
      languageOptions: {
        parser: parserJsonc,
      },
      plugins: {
        jsonc: pluginJsonc,
      },
      rules: {
        ...(pluginJsonc.configs["recommended-with-jsonc"].rules as TypedFlatConfigItem["rules"]),
        ...(pluginJsonc.configs.prettier.rules as TypedFlatConfigItem["rules"]),
      },
    },
  ];
}
