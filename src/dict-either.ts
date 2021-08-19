import * as D from './dict';
import * as E from './either';
import { _ } from './function';
import * as P from './tuple';
import * as PE from './tuple-either';
import { Dict, Either } from './type';

export function compact<E, T>(de: Dict<Either<E, NonNullable<T>>>): Either<E, Dict<T>> {
  return _(de)
    ._(
      D.reduce(E.right({}) as Either<E, Dict<T>>, (acc, value, key) =>
        _(acc)
          ._(P.bind2(() => value))
          ._(PE.compact2)
          ._(E.map2((acc, value) => ({ ...acc, [key]: value })))
          ._v()
      )
    )
    ._v();
}
