/**
 *  Returns string representation of converted mega bytes.
 *
 * @param bytes - Total number of bytes to be converted to mega bytes.
 * @returns String representation for total number of converted mega bytes.
 */
export function formatBytesToMB(bytes: number): string {
  const numOfMegaBytes = bytes / 1024 ** 2;
  return `${numOfMegaBytes.toFixed(2)} MB`;
}
