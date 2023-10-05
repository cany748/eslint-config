/* eslint-disable unicorn/prefer-module */
const basic = require("@cany748/eslint-config");

module.exports = {
  extends: ["@cany748/eslint-config", "plugin:import/typescript", "plugin:@typescript-eslint/recommended"],
  settings: {
    "import/resolver": {
      node: { extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx", ".d.ts"] },
    },
  },
  parserOptions: {
    tsconfigRootDir: process.cwd(),
    project: true,
  },
  overrides: [
    ...basic.overrides,
    {
      files: ["*.ts", "*.tsx", "*.mts", "*.cts", "*.vue"],
      extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking", "plugin:@typescript-eslint/strict"],
      rules: {
        // from @typescript-eslint/eslint-plugin/dist/configs/eslint-recommended.js
        "constructor-super": "off",
        "getter-return": "off",
        "no-const-assign": "off",
        "no-dupe-args": "off",
        "no-dupe-keys": "off",
        "no-func-assign": "off",
        "no-import-assign": "off",
        "no-new-symbol": "off",
        "no-obj-calls": "off",
        "no-redeclare": "off",
        "no-setter-return": "off",
        "no-this-before-super": "off",
        "no-undef": "off",
        "no-unreachable": "off",
        "no-unsafe-negation": "off",
        "no-var": "error",
        "prefer-const": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "error",

        "@typescript-eslint/consistent-type-exports": "error",
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            prefer: "type-imports",
            disallowTypeAnnotations: false,
            fixStyle: "separate-type-imports",
          },
        ],
        "@typescript-eslint/prefer-readonly": "error",
        "@typescript-eslint/promise-function-async": "error",
        "@typescript-eslint/no-confusing-void-expression": "error",

        "dot-notation": "off",
        "@typescript-eslint/dot-notation": "error",
        "no-throw-literal": "off",
        "@typescript-eslint/no-throw-literal": "error",

        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
      },
    },
    {
      files: ["*.test.ts", "*.spec.ts"],
      rules: {
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/ban-ts-comment": "off",
      },
    },
  ],
  rules: {
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-require-imports": "error",

    "@typescript-eslint/explicit-function-return-type": "off",
    // handled by unused-imports/no-unused-vars
    "@typescript-eslint/no-unused-vars": "off",

    "no-invalid-this": "off",
    "@typescript-eslint/no-invalid-this": "error",
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": "error",
    "no-dupe-class-members": "off",
    "@typescript-eslint/no-dupe-class-members": "error",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: true, classes: true, variables: true, enums: true, typedefs: true, ignoreTypeReferences: true },
    ],
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": ["error", { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }],
  },
};
