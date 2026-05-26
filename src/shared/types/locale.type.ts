import { Locale } from "../../constants/locale.constants.js";

export type Locale = (typeof Locale)[keyof typeof Locale];
