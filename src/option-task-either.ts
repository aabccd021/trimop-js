import * as O from './option';
import * as TE from './task-either';
import { Either, Option, Task } from './type';

export type Fn<L, R, T> = (ote: Option<Task<Either<L, R>>>) => T;

/**
 *
 * @param mapper
 * @returns
 */
export function getOrLeft<L, R>(mapper: () => L): Fn<L, R, Task<Either<L, R>>> {
  return O.getOrElse<Task<Either<L, R>>>(() => TE.left(mapper()));
}

/**
 *
 * @param mapper
 * @returns
 */
export function getOrRight<L, R>(mapper: () => R): Fn<L, R, Task<Either<L, R>>> {
  return O.getOrElse<Task<Either<L, R>>>(() => TE.right(mapper()));
}
