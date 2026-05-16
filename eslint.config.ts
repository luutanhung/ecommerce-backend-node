import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import simpleSortImport from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js, "simple-import-sort": simpleSortImport },
    extends: ["js/recommended"],

    languageOptions: { globals: globals.node },

    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Node.js builtins
            ["^node:"],

            // Third-party packages
            ["^@?\\w"],

            // Absolute imports
            ["^@/"],

            // Relative imports
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  tseslint.configs.recommended,
]);
