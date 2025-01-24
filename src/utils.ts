import type { Awaitable, TypedFlatConfigItem } from "./types";

export const parserPlain = {
  meta: {
    name: "parser-plain",
  },
  parseForESLint: (code: string) => ({
    ast: {
      body: [],
      comments: [],
      loc: { end: code.length, start: 0 },
      range: [0, code.length],
      tokens: [],
      type: "Program",
    },
    scopeManager: null,
    services: { isPlain: true },
    visitorKeys: {
      Program: [],
    },
  }),
};

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(...configs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]): Promise<TypedFlatConfigItem[]> {
  const resolved = await Promise.all(configs);
  return resolved.flat();
}

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;
  return (resolved as any).default || resolved;
}

export function isInGitHooksOrLintStaged(): boolean {
  return !!(
    // eslint-disable-next-line no-constant-binary-expression
    (false || process.env.GIT_PARAMS || process.env.VSCODE_GIT_COMMAND || process.env.npm_lifecycle_script?.startsWith("lint-staged"))
  );
}

export function isInEditorEnv(): boolean {
  if (process.env.CI) return false;
  if (isInGitHooksOrLintStaged()) return false;
  // eslint-disable-next-line no-constant-binary-expression
  return !!(false || process.env.VSCODE_PID || process.env.VSCODE_CWD || process.env.JETBRAINS_IDE || process.env.VIM || process.env.NVIM);
}
