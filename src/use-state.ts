/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-let */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-expression-statement */

const STATE_RECORD: Record<string, unknown> = {};

let latestStateId = 0;

export type StateController<T> = {
  readonly get: () => T | undefined;
  readonly set: (value: T) => void;
};

export function useState<T>(initialValue?: T): StateController<T> {
  latestStateId += 1;
  const stateId = latestStateId;
  STATE_RECORD[stateId] = initialValue;
  return {
    get: () => STATE_RECORD[stateId] as T | undefined,
    set: (value) => {
      STATE_RECORD[stateId] = value;
    },
  };
}
