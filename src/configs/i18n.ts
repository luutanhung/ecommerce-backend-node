import path from "node:path";

import i18n from "i18n";

const __dirname = import.meta.dirname;

i18n.configure({
  locales: ["en", "vi"],
  directory: path.join(__dirname, "../locales"),
  defaultLocale: "en",
  queryParameter: "lang",
  autoReload: true,
  updateFiles: false,
  objectNotation: true,
  cookie: "lang",
  header: "accept-language",
  api: {
    __: "t",
    __n: "tn",
  },
});

export { i18n };
