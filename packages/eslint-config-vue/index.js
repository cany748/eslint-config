/* eslint-disable unicorn/prefer-module */
const basic = require("@cany748/eslint-config");

module.exports = {
  extends: ["@cany748/eslint-config-ts", "plugin:vue/vue3-recommended", "plugin:vue/no-layout-rules"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    extraFileExtensions: [".vue"],
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    ...basic.overrides,
    {
      files: [
        // These pages are not used directly by users so they can have one-word names.
        "**/pages/**/*.{js,ts,jsx,tsx,vue}",
        "**/layouts/**/*.{js,ts,jsx,tsx,vue}",
        "**/app.{js,ts,jsx,tsx,vue}",
        "**/error.{js,ts,jsx,tsx,vue}",
        // These files should have multiple words in their names as they are within subdirectories.
        "**/components/*/**/*.{js,ts,jsx,tsx,vue}",
      ],
      rules: { "vue/multi-word-component-names": "off" },
    },
    {
      // Pages and layouts are required to have a single root element if transitions are enabled.
      files: ["**/pages/**/*.{js,ts,jsx,tsx,vue}", "**/layouts/**/*.{js,ts,jsx,tsx,vue}"],
      rules: { "vue/no-multiple-template-root": "error" },
    },
    {
      files: ["*.vue"],
      globals: {
        // script setup
        defineProps: "readonly",
        defineEmits: "readonly",
        defineOptions: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",
      },
      rules: {
        "no-undef": "off",
      },
    },
  ],
  rules: {
    "vue/no-v-html": "off",

    "vue/component-name-in-template-casing": "error",
    "vue/component-options-name-casing": "error",
    "vue/custom-event-name-casing": "error",
    "vue/define-macros-order": "error",
    "vue/no-restricted-v-bind": "error",
    "vue/no-useless-v-bind": "error",
    "vue/prefer-separate-static-class": "error",
    "vue/dot-notation": "warn",
    "vue/eqeqeq": ["error", "smart"],
    "vue/prefer-template": "error",
    "vue/no-unused-refs": "error",
    "vue/no-constant-condition": "error",
    "vue/no-empty-pattern": "error",
    "vue/no-irregular-whitespace": "error",
    "vue/no-loss-of-precision": "error",
    "vue/no-restricted-syntax": ["error", "DebuggerStatement", "LabeledStatement", "WithStatement"],
    "vue/no-sparse-arrays": "error",
    "vue/object-shorthand": ["warn", "properties"],
  },
};
