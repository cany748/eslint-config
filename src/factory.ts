import { isPackageExists } from "local-pkg";
import { FlatConfigComposer } from "eslint-flat-config-utils";
import type { Linter } from "eslint";
import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from "./types";
import {
  comments,
  disables,
  formatters,
  ignores,
  imports,
  javascript,
  jsonc,
  node,
  regexp,
  sortPackageJson,
  sortTsconfig,
  test,
  typescript,
  unicorn,
  unocss,
  vue,
} from "./configs";
import { interopDefault, isInEditorEnv } from "./utils";

const flatConfigProps = [
  "name",
  "languageOptions",
  "linterOptions",
  "processor",
  "plugins",
  "rules",
  "settings",
] satisfies (keyof TypedFlatConfigItem)[];

const VuePackages = ["vue", "nuxt", "vitepress", "@slidev/cli"];

/**
 * Construct an array of ESLint flat config items.
 *
 * @param {OptionsConfig & TypedFlatConfigItem} options
 *  The options for generating the ESLint configurations.
 * @param {Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]} userConfigs
 *  The user configurations to be merged with the generated configurations.
 * @returns {Promise<TypedFlatConfigItem[]>}
 *  The merged ESLint configurations.
 */
export const factoryConfig = function (
  options: OptionsConfig & Omit<TypedFlatConfigItem, "files" | "ignores"> = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.FlatConfig[]>[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const {
    componentExts = [],
    formatters: enableFormatters = true,
    gitignore: enableGitignore = true,
    ignores: userIgnores = [],
    jsonc: enableJSONC = true,
    regexp: enableRegexp = true,
    test: enableTest = true,
    typescript: enableTypeScript = isPackageExists("typescript"),
    unocss: enableUnoCSS = isPackageExists("unocss"),
    vue: enableVue = VuePackages.some((i) => isPackageExists(i)),
  } = options;

  let isInEditor = options.isInEditor;
  if (isInEditor == null) {
    isInEditor = isInEditorEnv();
    // eslint-disable-next-line no-console
    if (isInEditor) console.log("[@cany748/eslint-config] Detected running in editor, some rules are disabled.");
  }

  const configs: Awaitable<TypedFlatConfigItem[]>[] = [];

  if (enableGitignore) {
    if (typeof enableGitignore === "boolean") {
      configs.push(interopDefault(import("eslint-config-flat-gitignore")).then((r) => [r({ strict: false })]));
    } else {
      configs.push(interopDefault(import("eslint-config-flat-gitignore")).then((r) => [r(enableGitignore)]));
    }
  }

  // Base configs
  configs.push(
    comments(),
    ignores(userIgnores),
    imports(),
    javascript({
      isInEditor,
      overrides: options.javascript?.overrides,
    }),
    node(),
    unicorn(),
  );

  if (enableVue) {
    componentExts.push("vue");
  }

  if (enableTypeScript) {
    configs.push(
      typescript({
        ...(typeof enableTypeScript === "boolean" ? {} : enableTypeScript || {}),
        componentExts,
        type: options.type,
      }),
    );
  }

  if (enableRegexp) {
    configs.push(regexp(typeof enableRegexp === "boolean" ? {} : enableRegexp));
  }

  if (enableTest) {
    configs.push(
      test({
        isInEditor,
        overrides: typeof enableTest === "boolean" ? {} : enableTest?.overrides,
      }),
    );
  }

  if (enableVue) {
    configs.push(
      vue({
        ...(typeof enableVue === "boolean" ? {} : enableVue || {}),
        typescript: !!enableTypeScript,
      }),
    );
  }

  if (enableUnoCSS) {
    configs.push(unocss());
  }

  if (enableJSONC) {
    configs.push(jsonc(typeof enableJSONC === "boolean" ? {} : enableJSONC), sortPackageJson(), sortTsconfig());
  }

  if (enableFormatters) {
    configs.push(formatters(enableFormatters));
  }

  configs.push(disables());

  if ("files" in options) {
    throw new Error(
      '[@cany748/eslint-config] The first argument should not contain the "files" property as the options are supposed to be global. Place it in the second or later config instead.',
    );
  }

  // User can optionally pass a flat config item to the first argument
  // We pick the known keys as ESLint would do schema validation
  // eslint-disable-next-line unicorn/no-array-reduce
  const fusedConfig = flatConfigProps.reduce((acc, key) => {
    if (key in options) acc[key] = options[key] as any;
    return acc;
  }, {} as TypedFlatConfigItem);
  if (Object.keys(fusedConfig).length > 0) configs.push([fusedConfig]);

  let composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>();

  composer = composer.append(...configs, ...(userConfigs as any));

  return composer;
};
