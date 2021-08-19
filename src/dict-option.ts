import * as D from './dict';
import { _ } from './function';
import * as O from './option';
import { Dict, Option } from './type';

export function compact<T>(d: Dict<Option<NonNullable<T>>>): Dict<T> {
  return _(d)
    ._(D.reduce({}, (acc, oVal, key) => (O.isNone(oVal) ? acc : { ...acc, [key]: oVal.value })))
    ._v();
}
