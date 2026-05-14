import type { Linter } from "eslint";
import pluginE18e from "@e18e/eslint-plugin";
import type { OptionsE18e, OptionsIsInEditor, OptionsProjectType, TypedFlatConfigItem } from "../types";

export function e18e(options: OptionsIsInEditor & OptionsProjectType & OptionsE18e = {}): TypedFlatConfigItem[] {
  const {
    isInEditor = false,
    modernization = true,
    type = "app",
    moduleReplacements = type === "lib" && isInEditor,
    overrides = {},
    performanceImprovements = true,
  } = options;

  const configs = pluginE18e.configs as Record<string, Linter.Config>;

  return [
    {
      name: "e18e",
      plugins: {
        e18e: pluginE18e,
      },
      rules: {
        ...(modernization ? { ...configs.modernization.rules } : {}),
        ...(moduleReplacements ? { ...configs.moduleReplacements!.rules } : {}),
        ...(performanceImprovements ? { ...configs.performanceImprovements!.rules } : {}),

        // e18e/prefer-static-regex is too strict for non-lib projects, and most of the time the performance improvement is negligible, so we'll disable it by default for app projects
        ...(type === "lib"
          ? {}
          : {
              "e18e/prefer-static-regex": "off",
            }),

        ...overrides,
      },
    },
  ];
}
