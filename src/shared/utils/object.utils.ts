// eslint-disable-next-line
export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  // eslint-disable-next-line
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value == null) continue;
    // removes null + undefined

    if (Array.isArray(value)) {
      const cleanedArray = value
        .map((v) => (typeof v === "object" ? cleanObject(v) : v))
        .filter(Boolean);

      if (cleanedArray.length) {
        result[key] = cleanedArray;
      }

      continue;
    }

    if (typeof value === "object") {
      const cleaned = cleanObject(value);

      if (Object.keys(cleaned).length > 0) {
        result[key] = cleaned;
      }

      continue;
    }

    result[key] = value;
  }

  return result as Partial<T>;
}
