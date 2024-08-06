import { configs } from "eslint-plugin-regexp";
import type { OptionsOverrides, TypedFlatConfigItem } from "../types";

export function regexp(options: OptionsOverrides = {}): TypedFlatConfigItem[] {
  const config = configs["flat/recommended"] as TypedFlatConfigItem;

  return [
    {
      ...config,
      name: "regexp",
      rules: {
        ...config.rules,
        ...options.overrides,
      },
    },
  ];
}
