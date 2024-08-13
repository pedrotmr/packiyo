/**
 * Converts a snake_case string to Capital Case.
 *
 * @param str - The snake_case string to convert.
 * @returns The string converted to Capital Case.
 */
export const snakeToCapitalCase = (str: string): string => {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
