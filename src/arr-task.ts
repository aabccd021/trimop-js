import { Arr, Task } from './type';

/**
 *
 */
export type Fn<T, TResult> = (t: Arr<Task<T>>) => TResult;

/**
 *
 * @param tasks
 * @returns
 */
export function parallel<T>(tasks: Arr<Task<T>>): Task<Arr<T>> {
  return () => Promise.all(tasks.map((task) => task()));
}
