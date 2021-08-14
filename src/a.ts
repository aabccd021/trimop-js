// /* eslint-disable import/exports-last */
// import { _, Dict, optionFromNullable as oFrom } from '.';
// import { isNone, Option, Some } from './option';

// /**
//  *
//  */
// // eslint-disable-next-line functional/no-mixed-type
// export type _<T> = {
//   readonly _: <TResult>(mapper: (t: T) => TResult) => _<TResult>;
//   readonly value: T;
// };

// /**
//  *
//  */
// export function _<T>(t: T): _<T> {
//   return {
//     _: (mapper) => _(mapper(t)),
//     value: t,
//   };
// }

// export type OFold<TResult, T> = (option: Option<T>) => TResult;

// export type OMapR<TResult, T> = (option: Option<T>) => Option<TResult>;

// export function oFold<TResult, T>({
//   none,
//   some,
// }: {
//   readonly none: () => NonNullable<TResult>;
//   readonly some: (value: T) => NonNullable<TResult>;
// }): OFold<TResult, T> {
//   return (option) => (isNone(option) ? none() : some(option.value));
// }

// export function oMapSome<TResult, T>(some: (value: T) => NonNullable<TResult>): OMapR<TResult, T> {
//   return (option) => (isNone(option) ? option : Some(some(option.value)));
// }

// export function oMapNone<T>(none:  T): OFold<T, T> {
//   return (option) => (isNone(option) ? none : option.value);
// }

// export function dGet<T>(dict: Dict<T>, key: string): Option<T> {
//   return oFrom(dict[key]);
// }

// const dd: Dict<number> = {
//   foo: 10,
// };

// const somekey = 'foo';

// const x = _(dGet(dd, somekey))._(
// 	oMapNone()
// ).value;
