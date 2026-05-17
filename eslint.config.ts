import js from "@eslint/js";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js, "unused-imports": unusedImports },
    extends: ["js/recommended"],

    languageOptions: { globals: globals.node },

    rules: {
      // Disable default unused-vars
      "@typescript-eslint/no-unused-vars": "off",

      "no-unused-vars": "off",

      // Remove unused imports automatically
      "unused-imports/no-unused-imports": "error",

      // Handle unused vars
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  tseslint.configs.recommended,
]);
