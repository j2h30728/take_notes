import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    env: {
      browser: true,
      node: true,
    },
    rules: {
      quotes: ["error", "double"],
      semi: "error",
      "no-undef": "warn",
      "no-unused-vars": "warn",
    },
  },
  pluginJs.configs.recommended,
];
