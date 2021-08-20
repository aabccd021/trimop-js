import * as D from './dict';
import * as E from './either';
import { _ } from './function';
import * as P from './tuple';
import * as PE from './tuple-either';
import { Dict, Either } from './type';

export function compact<L, R>(de: Dict<Either<L, NonNullable<R>>>): Either<L, Dict<R>> {
  return _(de)
    ._(
      D.reduce(E.right({}) as Either<L, Dict<R>>, (acc, eVal, key) =>
        _(acc)
          ._(P.bind2(() => eVal))
          ._(PE.compact2)
          ._(E.map2((acc, val) => ({ ...acc, [key]: val })))
          ._v()
      )
    )
    ._v();
}
