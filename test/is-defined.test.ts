import { isDefined } from '../src';

describe('isDefined', () => {
  it('should return true when given defined value', () => {
    const result = isDefined('foo');
    expect(result).toBe(true);
  });

  it('should return false when undefined', () => {
    const result = isDefined(undefined);
    expect(result).toBe(false);
  });

  it('should return false when given null', () => {
    const result = isDefined(null);
    expect(result).toBe(false);
  });
});
