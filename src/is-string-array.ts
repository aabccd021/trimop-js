export function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((el) => typeof el === 'string');
}
