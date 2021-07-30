/**
 * Test wether a value is neither undefined nor null.
 * @param value value to be tested
 * @returns boolean wether the value is neither undefined nor null.
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  // eslint-disable-next-line no-null/no-null
  return value !== undefined && value !== null;
}
