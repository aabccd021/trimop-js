import { Failure } from './failure';

export type ShouldBeUnreachableFailure = Failure & {
  readonly _failureType: 'ShouldBeUnreachableFailure';
  readonly shouldBeUnreachable: never;
};

export function ShouldBeUnreachableFailure(shouldBeUnreachable: never): ShouldBeUnreachableFailure {
  return {
    _failureType: 'ShouldBeUnreachableFailure',
    shouldBeUnreachable,
  };
}
