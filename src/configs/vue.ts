import { interopDefault } from "../utils";
import type { OptionsFiles, OptionsHasTypeScript, OptionsOverrides, OptionsVue, TypedFlatConfigItem } from "../types";
import { GLOB_VUE } from "../globs";

export async function vue(
  options: OptionsVue & OptionsHasTypeScript & OptionsOverrides & OptionsFiles = {},
): Promise<TypedFlatConfigItem[]> {
  const { files = [GLOB_VUE], overrides = {}, vueVersion = 3 } = options;

  const [pluginVue, parserVue] = await Promise.all([
    interopDefault(import("eslint-plugin-vue")),
    interopDefault(import("vue-eslint-parser")),
  ] as const);

  return [
    {
      files,
      languageOptions: {
        parser: parserVue,
        globals: {
          computed: "readonly",
          defineEmits: "readonly",
          defineExpose: "readonly",
          defineProps: "readonly",
          onMounted: "readonly",
          onUnmounted: "readonly",
          reactive: "readonly",
          ref: "readonly",
          shallowReactive: "readonly",
          shallowRef: "readonly",
          toRef: "readonly",
          toRefs: "readonly",
          watch: "readonly",
          watchEffect: "readonly",
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: [".vue"],
          parser: options.typescript ? await interopDefault(import("@typescript-eslint/parser")) : null,
          sourceType: "module",
        },
      },
      name: "vue",
      processor: pluginVue.processors[".vue"],
      plugins: {
        vue: pluginVue,
      },
      rules: {
        ...pluginVue.configs.base.rules,

        ...(vueVersion === 2
          ? {
              ...pluginVue.configs.essential.rules,
              ...pluginVue.configs["strongly-recommended"].rules,
              ...pluginVue.configs.recommended.rules,
            }
          : {
              ...pluginVue.configs["vue3-essential"].rules,
              ...pluginVue.configs["vue3-strongly-recommended"].rules,
              ...pluginVue.configs["vue3-recommended"].rules,
            }),

        "vue/component-name-in-template-casing": ["error", "PascalCase"],
        "vue/component-options-name-casing": ["error", "PascalCase"],

        "vue/custom-event-name-casing": ["error", "camelCase"],
        "vue/define-macros-order": [
          "error",
          {
            order: ["defineOptions", "defineModel", "defineProps", "defineEmits", "defineSlots"],
          },
        ],
        "vue/dot-notation": "error",
        "vue/eqeqeq": ["error", "smart"],
        "vue/html-comment-content-spacing": ["error", "always", { exceptions: ["-"] }],
        "vue/no-constant-condition": "error",
        "vue/no-empty-pattern": "error",
        "vue/no-irregular-whitespace": "error",
        "vue/no-loss-of-precision": "error",
        "vue/no-restricted-syntax": ["error", "DebuggerStatement", "LabeledStatement", "WithStatement"],
        "vue/no-restricted-v-bind": ["error", "/^v-/"],
        "vue/no-sparse-arrays": "error",
        "vue/no-unused-refs": "error",
        "vue/no-useless-v-bind": "error",
        "vue/no-v-html": "off",
        "vue/object-shorthand": ["error", "always", { avoidQuotes: true, ignoreConstructors: false }],
        "vue/prefer-separate-static-class": "error",
        "vue/prefer-template": "error",

        "vue/padding-line-between-blocks": ["error", "always"],

        "vue/component-tags-order": "off",

        ...overrides,
      },
    },
  ];
}
