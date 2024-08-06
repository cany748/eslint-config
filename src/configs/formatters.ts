import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-plugin-prettier/recommended";

import { GLOB_CSS, GLOB_GRAPHQL, GLOB_HTML, GLOB_LESS, GLOB_MARKDOWN, GLOB_POSTCSS, GLOB_SCSS } from "../globs";
import { parserPlain } from "../utils";
import type { OptionsFormatters, TypedFlatConfigItem } from "../types";

export function formatters(options: OptionsFormatters | true = true): TypedFlatConfigItem[] {
  if (options === true) {
    options = {
      css: true,
      graphql: true,
      html: true,
      markdown: true,
    };
  }

  const configs: TypedFlatConfigItem[] = [
    {
      name: "formatter/setup",
      plugins: {
        prettier: pluginPrettier,
      },
      rules: configPrettier.rules,
    },
  ];

  if (options.css) {
    configs.push(
      {
        files: [GLOB_CSS, GLOB_POSTCSS],
        languageOptions: {
          parser: parserPlain,
        },
        name: "formatter/css",
        rules: {
          "prettier/prettier": ["error", { parser: "css" }],
        },
      },
      {
        files: [GLOB_SCSS],
        languageOptions: {
          parser: parserPlain,
        },
        name: "formatter/scss",
        rules: {
          "prettier/prettier": ["error", { parser: "scss" }],
        },
      },
      {
        files: [GLOB_LESS],
        languageOptions: {
          parser: parserPlain,
        },
        name: "formatter/less",
        rules: {
          "prettier/prettier": ["error", { parser: "less" }],
        },
      },
    );
  }

  if (options.graphql) {
    configs.push({
      files: [GLOB_GRAPHQL],
      languageOptions: {
        parser: parserPlain,
      },
      name: "formatter/graphql",
      rules: {
        "prettier/prettier": ["error", { parser: "graphql" }],
      },
    });
  }

  if (options.html) {
    configs.push({
      files: [GLOB_HTML],
      languageOptions: {
        parser: parserPlain,
      },
      name: "formatter/html",
      rules: {
        "prettier/prettier": ["error", { parser: "html" }],
      },
    });
  }

  if (options.markdown) {
    configs.push({
      files: [GLOB_MARKDOWN],
      languageOptions: {
        parser: parserPlain,
      },
      name: "formatter/markdown",
      rules: {
        "prettier/prettier": ["error", { parser: "markdown" }],
      },
    });
  }

  return configs;
}
