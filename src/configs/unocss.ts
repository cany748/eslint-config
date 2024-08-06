import { interopDefault } from "../utils";
import type { TypedFlatConfigItem } from "../types";

export async function unocss(): Promise<TypedFlatConfigItem[]> {
  const pluginUnoCSS = await interopDefault(import("@unocss/eslint-plugin"));

  return [
    {
      ...pluginUnoCSS.configs.flat,
      name: "unocss",
    },
  ];
}
