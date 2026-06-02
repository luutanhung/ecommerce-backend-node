import { CURRENCY } from "../constants/currency.constants.js";

export type Currency = (typeof CURRENCY)[keyof typeof CURRENCY];
