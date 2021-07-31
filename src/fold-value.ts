import { Either } from './either';
import { Failure } from './failure';

export function foldValue<TResult, F extends Failure = Failure, V = unknown>(
  either: Either<F, V>,
  ifValue: (value: V) => Either<F, TResult>
): Either<F, TResult> {
  return either._tag === 'failed' ? either : ifValue(either.value);
}
