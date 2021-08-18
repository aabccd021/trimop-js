import * as O from './option';
import { Dict, Option } from './type';

export type DEntry<T> = readonly [string, NonNullable<T>];

export function entry<T>(key: string): (value: NonNullable<T>) => DEntry<T> {
  return (value) => [key, value];
}

export function fromEntry<T>(entries: readonly DEntry<T>[]): Dict<T> {
  return Object.fromEntries(entries);
}

export function lookup<T>(key: string): (dict: Dict<T>) => Option<T> {
  return (dict) => O.fromNullable(dict[key]);
}

export function mapEntries<TR, T>(
  mapper: (val: T, key: string, idx: number) => TR
): (dict: Dict<T>) => readonly TR[] {
  return (dict) => Object.entries(dict).map(([key, val], idx) => mapper(val, key, idx));
}

export function filter<T>(
  elFilter: (val: T, key: string, idx: number) => boolean
): (d: Dict<T>) => Dict<T> {
  return (dict) =>
    Object.fromEntries(Object.entries(dict).filter(([key, val], idx) => elFilter(val, key, idx)));
}

export function mapValues<TR, T>(
  mapper: (val: T, key: string, idx: number) => NonNullable<TR>
): (dict: Dict<T>) => Dict<TR> {
  return (dict) =>
    Object.fromEntries(Object.entries(dict).map(([key, val], idx) => [key, mapper(val, key, idx)]));
}

export function reduce<TR, T>(
  initialState: TR,
  reducer: (acc: TR, value: T, key: string, idx: number) => TR
): (dict: Dict<T>) => TR {
  return (dict) =>
    Object.entries(dict).reduce(
      (acc, [key, value], idx) => reducer(acc, value, key, idx),
      initialState
    );
}
