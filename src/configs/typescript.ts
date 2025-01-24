import { GLOB_ASTRO_TS, GLOB_MARKDOWN, GLOB_TS, GLOB_TSX } from "../globs";
import type {
  OptionsComponentExts,
  OptionsFiles,
  OptionsOverrides,
  OptionsProjectType,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptWithTypes,
  TypedFlatConfigItem,
} from "../types";
import { interopDefault } from "../utils";

export async function typescript(
  options: OptionsFiles &
    OptionsComponentExts &
    OptionsOverrides &
    OptionsTypeScriptWithTypes &
    OptionsTypeScriptParserOptions &
    OptionsProjectType = {},
): Promise<TypedFlatConfigItem[]> {
  const { componentExts = [], overrides = {}, overridesTypeAware = {}, parserOptions = {}, type = "app" } = options;

  const files = options.files ?? [GLOB_TS, GLOB_TSX, ...componentExts.map((ext) => `**/*.${ext}`)];

  const filesTypeAware = options.filesTypeAware ?? [GLOB_TS, GLOB_TSX];
  const ignoresTypeAware = options.ignoresTypeAware ?? [`${GLOB_MARKDOWN}/**`, GLOB_ASTRO_TS];
  const tsconfigPath = options?.tsconfigPath;
  const isTypeAware = !!tsconfigPath;

  const [pluginTs, parserTs] = await Promise.all([
    interopDefault(import("@typescript-eslint/eslint-plugin")),
    interopDefault(import("@typescript-eslint/parser")),
  ] as const);

  function makeParser(typeAware: boolean, files: string[], ignores?: string[]): TypedFlatConfigItem {
    return {
      files,
      ...(ignores ? { ignores } : {}),
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          extraFileExtensions: componentExts.map((ext) => `.${ext}`),
          sourceType: "module",
          ...(typeAware
            ? {
                projectService: {
                  allowDefaultProject: ["./*.js"],
                  defaultProject: tsconfigPath,
                },
                tsconfigRootDir: process.cwd(),
              }
            : {}),
          ...(parserOptions as any),
        },
      },
      name: `typescript/${typeAware ? "type-aware-parser" : "parser"}`,
    };
  }

  return [
    {
      // Install the plugins without globs, so they can be configured separately.
      name: "typescript/setup",
      plugins: {
        "@typescript-eslint": pluginTs,
      },
    },
    // assign type-aware parser for type-aware files and type-unaware parser for the rest
    ...(isTypeAware ? [makeParser(false, files), makeParser(true, filesTypeAware, ignoresTypeAware)] : [makeParser(false, files)]),
    {
      files,
      name: "typescript/rules",
      rules: {
        ...pluginTs.configs["eslint-recommended"].overrides![0].rules!,
        ...pluginTs.configs.strict.rules,

        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { disallowTypeAnnotations: false, prefer: "type-imports", fixStyle: "inline-type-imports" },
        ],
        "@typescript-eslint/method-signature-style": "error",
        "@typescript-eslint/no-dynamic-delete": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-import-type-side-effects": "error",
        "@typescript-eslint/no-invalid-void-type": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/triple-slash-reference": "off",
        "@typescript-eslint/unified-signatures": "off",

        // handled by unused-imports/no-unused-imports
        "@typescript-eslint/no-unused-vars": "off",

        "no-dupe-class-members": "off",
        "@typescript-eslint/no-dupe-class-members": "error",

        "no-invalid-this": "off",
        "@typescript-eslint/no-invalid-this": "error",

        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": ["error", { builtinGlobals: false }],

        "no-unused-expressions": "off",
        "@typescript-eslint/no-unused-expressions": ["error", { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }],

        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "error",

        ...(type === "lib"
          ? {
              "@typescript-eslint/explicit-function-return-type": [
                "error",
                {
                  allowExpressions: true,
                  allowHigherOrderFunctions: true,
                  allowIIFEs: true,
                },
              ],
            }
          : {}),

        ...overrides,
      },
    },
    ...(isTypeAware
      ? [
          {
            files: filesTypeAware,
            ignores: ignoresTypeAware,
            name: "typescript/rules-type-aware",
            rules: {
              ...(tsconfigPath
                ? ({
                    ...pluginTs.configs["recommended-type-checked-only"].rules,

                    "@typescript-eslint/no-confusing-void-expression": "error",
                    "@typescript-eslint/promise-function-async": "error",

                    "@typescript-eslint/restrict-template-expressions": "off",
                    "@typescript-eslint/strict-boolean-expressions": "off",

                    "dot-notation": "off",
                    "@typescript-eslint/dot-notation": ["error", { allowKeywords: true }],

                    "no-throw-literal": "off",
                    "@typescript-eslint/only-throw-error": "error",
                  } satisfies TypedFlatConfigItem["rules"])
                : {}),
              ...overridesTypeAware,
            },
          },
        ]
      : []),
  ];
}
