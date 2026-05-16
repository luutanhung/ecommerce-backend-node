/** @type {import("prettier").Config} */
export default {
  tabWidth: 2,
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  plugins: ["@trivago/prettier-plugin-sort-imports"],

  importOrder: [
    // Node.js
    "^node:(.*)$",

    // Third-party packages
    "<THIRD_PARTY_MODULES>",

    // Constants
    "^@/constants/(.*)$",
    "^\\.\\.?/constants/(.*)$",

    // Configs
    "^@/configs/(.*)$",
    "^\\.\\.?/configs/(.*)$",

    // Libs / Utils
    "^@/libs/(.*)$",
    "^@/utils/(.*)$",
    "^\\.\\.?/utils/(.*)$",

    // Models
    "^@/models/(.*)$",
    "^\\.\\.?/models/(.*)$",

    // Services
    "^@/services/(.*)$",
    "^\\.\\.?/services/(.*)$",

    // Controllers
    "^@/controllers/(.*)$",
    "^\\.\\.?/controllers/(.*)$",

    // Routers
    "^@/routes/(.*)$",
    "^\\.\\.?/routes/(.*)$",

    // Types
    "^@/types/(.*)$",
    "^\\.\\.?/types/(.*)$",

    // Relative imports
    "^\\.\\.(?!/?$).*$",
    "^\\.\\./?$",
    "^\\./(?=.*/)(?!/?$).*$",
    "^\\.(?!/?$).*$",
    "^\\./?$",
  ],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
