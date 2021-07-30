import { Failure } from './failure';

export type ShouldBeUnreachableFailure = Failure & {
  readonly failureType: 'ShouldBeUnreachableFailure';
  readonly shouldBeUnreachable: never;
};

export function ShouldBeUnreachableFailure(shouldBeUnreachable: never): ShouldBeUnreachableFailure {
  return {
    failureType: 'ShouldBeUnreachableFailure',
    shouldBeUnreachable,
  };
}
