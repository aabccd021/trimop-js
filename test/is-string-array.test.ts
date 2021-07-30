import { isStringArray } from '../src';

describe('isStringArray', () => {
  it('should return true when given string array', () => {
    const stringArray = ['foo', 'bar'];
    const result = isStringArray(stringArray);
    expect(result).toBe(true);
  });

  it('should return true when given empty array', () => {
    const emptyArray: readonly unknown[] = [];
    const result = isStringArray(emptyArray);
    expect(result).toBe(true);
  });

  it('should return false when given partially string array', () => {
    const partiallyStringArray: readonly unknown[] = ['foo', 1];
    const result = isStringArray(partiallyStringArray);
    expect(result).toBe(false);
  });
});
