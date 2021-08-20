import * as D from './dict';
import { _ } from './function';
import * as O from './option';
import { Dict, Option } from './type';

export function compact<S>(d: Dict<Option<NonNullable<S>>>): Dict<S> {
  return _(d)
    ._(
      D.reduce({}, (acc, oVal, key) =>
        _(oVal)
          ._(
            O.fold(
              () => acc,
              (val) => ({ ...acc, [key]: val })
            )
          )
          ._v()
      )
    )
    ._v();
}
