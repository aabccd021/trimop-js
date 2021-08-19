import * as O from './option';
import { Dict, DictEntry, Option } from './type';

/**
 *
 * @param key
 * @returns
 */
export function createEntry<D>(key: string): (value: NonNullable<D>) => DictEntry<D> {
  return (value) => [key, value];
}

/**
 *
 * @param entries
 * @returns
 */
export function fromEntry<D>(entries: readonly DictEntry<D>[]): Dict<D> {
  return Object.fromEntries(entries);
}

/**
 *
 */
export type Fn<D, T> = (dict: Dict<D>) => T;

/**
 *
 * @param key
 * @returns
 */
export function lookup<D>(key: string): Fn<D, Option<D>> {
  return (dict) => O.fromNullable(dict[key]);
}

/**
 *
 * @param f
 * @returns
 */
export function mapEntries<V, T>(f: (val: V, key: string, idx: number) => T): Fn<V, readonly T[]> {
  return (dict) => Object.entries(dict).map(([key, val], idx) => f(val, key, idx));
}

/**
 *
 * @param f
 * @returns
 */
export function filter<V>(f: (val: V, key: string, idx: number) => boolean): Fn<V, Dict<V>> {
  return (dict) =>
    Object.fromEntries(Object.entries(dict).filter(([key, val], idx) => f(val, key, idx)));
}

/**
 *
 * @param f
 * @returns
 */
export function mapValues<V, T>(
  f: (val: V, key: string, idx: number) => NonNullable<T>
): (dict: Dict<V>) => Dict<T> {
  return (dict) =>
    Object.fromEntries(Object.entries(dict).map(([key, val], idx) => [key, f(val, key, idx)]));
}

/**
 *
 * @param initialAcc
 * @param reducer
 * @returns
 */
export function reduce<V, T>(
  initialAcc: T,
  reducer: (acc: T, value: V, key: string, idx: number) => T
): (dict: Dict<V>) => T {
  return (dict) =>
    Object.entries(dict).reduce(
      (acc, [key, value], idx) => reducer(acc, value, key, idx),
      initialAcc
    );
}
