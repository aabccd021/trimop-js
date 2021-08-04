/* eslint-disable functional/no-throw-statement */

/**
 * Throwing error here is allowed here since it's never happen. There must be bugs on typescript or
 * on user defined typeguards.
 * @param value that should be never called
 */
export function assertNever(value: never): never {
  throw new Error(`Should be never: ${value}`);
}
