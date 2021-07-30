/**
 * Test wether a value is array of string `string[]` or not.
 * @param value to be tested.
 * @returns boolean wether the value is array of string.
 */
export function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((el) => typeof el === 'string');
}
