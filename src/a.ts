// /* eslint-disable import/exports-last */
// import { Dict } from '.';
// import { isNone, None, Option, Some } from './option';

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

// export function oGetOrElse<T>(none: T): OFold<T, T> {
//   return (option) => (isNone(option) ? none : option.value);
// }

// export function oFrom<T>(nullable: NonNullable<T> | undefined | null): Option<T> {
//   // eslint-disable-next-line no-null/no-null
//   if (nullable === undefined || nullable === null) {
//     return None();
//   }
//   return Some(nullable);
// }

// export function dGet<T>(dict: Dict<T>, key: string): Option<T> {
//   return oFrom(dict[key]);
// }

// function handleColTrigger(actionTrigger: ActionTrigger): number {
//   return 1;
// }

// type ActionTrigger = Option<number>;

// type ColTrigger = {
//   readonly onDelete: ActionTrigger;
// };

// const dd: Dict<ColTrigger> = {};

// const somekey = 'foo';

// const x = _(dGet(dd, somekey))
//   ._(oMapSome(({ onDelete }) => onDelete))
//   ._(oMapSome(handleColTrigger))
//   ._(oGetOrElse(1)).value;
