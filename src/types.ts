import type { FlatGitignoreOptions } from "eslint-config-flat-gitignore";
import type { ParserOptions } from "@typescript-eslint/parser";
import type { Linter } from "eslint";
import type { RuleOptions } from "./typegen";

export type Awaitable<T> = T | Promise<T>;

export type Rules = Record<string, Linter.RuleEntry<any> | undefined> & RuleOptions;

/**
 * An updated version of ESLint's `Linter.Config`, which provides autocompletion
 * for `rules` and relaxes type limitations for `plugins` and `rules`, because
 * many plugins still lack proper type definitions.
 */
export type TypedFlatConfigItem = Omit<Linter.Config, "plugins" | "rules"> & {
  /**
   * An object containing a name-value mapping of plugin names to plugin objects.
   * When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>;

  /**
   * An object containing the configured rules. When `files` or `ignores` are
   * specified, these rule configurations are only available to the matching files.
   */
  rules?: Rules;
};

export interface OptionsFiles {
  /**
   * Override the `files` option to provide custom globs.
   */
  files?: string[];
}

export interface OptionsVue extends OptionsOverrides {
  /**
   * Vue version. Apply different rules set from `eslint-plugin-vue`.
   *
   * @default 3
   */
  vueVersion?: 2 | 3;
}

export type OptionsTypescript = (OptionsTypeScriptWithTypes & OptionsOverrides) | (OptionsTypeScriptParserOptions & OptionsOverrides);

export interface OptionsFormatters {
  /**
   * Enable formatting support for CSS, Less, Sass, and SCSS.
   */
  css?: boolean;

  /**
   * Enable formatting support for HTML.
   */
  html?: boolean;

  /**
   * Enable formatting support for Markdown.
   */
  markdown?: boolean;

  /**
   * Enable formatting support for GraphQL.
   */
  graphql?: boolean;
}

export interface OptionsComponentExts {
  /**
   * Additional extensions for components.
   *
   * @example ['vue']
   * @default []
   */
  componentExts?: string[];
}

export interface OptionsTypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>;

  /**
   * Glob patterns for files that should be type aware.
   * @default ['**\/*.{ts,tsx}']
   */
  filesTypeAware?: string[];
  /**
   * Glob patterns for files that should not be type aware.
   * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
   */
  ignoresTypeAware?: string[];
}

export interface OptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string;

  /**
   * Override type aware rules.
   */
  overridesTypeAware?: TypedFlatConfigItem["rules"];
}

export interface OptionsHasTypeScript {
  typescript?: boolean;
}

export interface OptionsOverrides {
  overrides?: TypedFlatConfigItem["rules"];
}

export interface OptionsProjectType {
  /**
   * Type of the project. `lib` will enable more strict rules for libraries.
   *
   * @default 'app'
   */
  type?: "app" | "lib";
}

export interface OptionsIsInEditor {
  isInEditor?: boolean;
}

export interface OptionsConfig extends OptionsComponentExts, OptionsProjectType {
  /**
   * Enable gitignore support.
   *
   * Passing an object to configure the options.
   *
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   * @default true
   */
  gitignore?: boolean | FlatGitignoreOptions;

  /**
   * Core rules. Can't be disabled.
   */
  javascript?: OptionsOverrides;

  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * Requires installing:
   * - `typescript-eslint`
   *
   * @default auto-detect based on the dependencies
   */
  typescript?: boolean | OptionsTypescript;

  /**
   * Enable test support.
   *
   * @default true
   */
  test?: boolean | OptionsOverrides;

  /**
   * Enable Vue support.
   *
   * Requires installing:
   * - `eslint-plugin-vue`
   *
   * @default auto-detect based on the dependencies
   */
  vue?: boolean | OptionsVue;

  /**
   * Enable JSONC support.
   *
   * @default true
   */
  jsonc?: boolean | OptionsFiles;

  /**
   * Enable regexp rules.
   *
   * @see https://ota-meshi.github.io/eslint-plugin-regexp/
   * @default true
   */
  regexp?: boolean | OptionsOverrides;

  /**
   * Enable unocss rules.
   *
   * Requires installing:
   * - `@unocss/eslint-plugin`
   *
   * @default auto-detect based on the dependencies
   */
  unocss?: boolean;

  /**
   * Use prettier to format files.
   *
   * When set to `true`, it will enable all formatters.
   *
   * @default true
   */
  formatters?: boolean | OptionsFormatters;

  /**
   * Control to disable some rules in editors.
   * @default auto-detect based on the process.env
   */
  isInEditor?: boolean;
}

export type { ConfigNames } from "./typegen";
