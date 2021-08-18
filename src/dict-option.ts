import * as D from './dict';
import { _ } from './function';
import * as O from './option';
import { Dict, Option } from './type';

export function compact<T>(d: Dict<Option<NonNullable<T>>>): Dict<T> {
  return _(d)
    ._(
      D.reduce({}, (acc, field, fieldName) =>
        O.isNone(field) ? acc : { ...acc, [fieldName]: field.value }
      )
    )
    ._v();
}
