/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-let */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-expression-statement */

const STATE_RECORD: Record<number, unknown> = {};

let latestStateId = 0;

export type StateController<T> = {
  readonly get: () => T;
  readonly set: (value: T) => void;
};

export function useState<T>(initialValue: T): StateController<T> {
  latestStateId += 1;
  const stateId = latestStateId;
  return {
    get: () => (STATE_RECORD[stateId] as T | undefined) ?? initialValue,
    set: (value) => {
      STATE_RECORD[stateId] = value;
    },
  };
}
