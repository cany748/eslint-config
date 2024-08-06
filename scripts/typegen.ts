import { writeFileSync } from "node:fs";
import { flatConfigsToRulesDTS } from "eslint-typegen/core";
import { builtinRules } from "eslint/use-at-your-own-risk";
import {
  combine,
  comments,
  formatters,
  imports,
  javascript,
  jsonc,
  node,
  regexp,
  sortPackageJson,
  test,
  typescript,
  unicorn,
  unocss,
  vue,
} from "../src";

const configs = await combine(
  {
    plugins: {
      "": {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  comments(),
  formatters(),
  imports(),
  javascript(),
  jsonc(),
  node(),
  regexp(),
  sortPackageJson(),
  test(),
  typescript(),
  unicorn(),
  unocss(),
  vue(),
);

const configNames = configs.map((i) => i.name).filter(Boolean) as string[];

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
});

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map((i) => `'${i}'`).join(" | ")}
`;

writeFileSync("src/typegen.d.ts", dts);
