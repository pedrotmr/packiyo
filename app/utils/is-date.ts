/**
 * Checks if the provided input is a valid date string.
 *
 * @param {string | undefined} input - The string to check if it represents a valid date.
 * @returns {boolean} - Returns true if the input is a valid date string, otherwise false.
 */
export const isDateString = (
  input: string | number | null | boolean,
): boolean => {
  if (typeof input !== "string") return false;

  const date = new Date(input);
  return !isNaN(date.getTime());
};
