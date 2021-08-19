import { _ } from './function';
import * as O from './option';
import * as TE from './task-either';
import { Either, Option, Task } from './type';

export type GetOrElse<E, T> = (ote: Option<Task<Either<E, T>>>) => Task<Either<E, T>>;

export function getOrLeft<E, T>(mapper: () => E): GetOrElse<E, T> {
  return (option) =>
    _(option)
      ._(O.getOrElse<Task<Either<E, T>>>(() => TE.left(mapper())))
      ._v();
}

export function getOrRight<E, T>(mapper: () => T): GetOrElse<E, T> {
  return (option) =>
    _(option)
      ._(O.getOrElse<Task<Either<E, T>>>(() => TE.right(mapper())))
      ._v();
}
