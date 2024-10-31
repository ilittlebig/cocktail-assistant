/**
 * In-house library allowing shared state between components.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-31
 */

type Listener<T> = (state: T) => void;
type SetState<T> = (newState: Partial<T> | ((prevState: T) => Partial<T>)) => void;
type Store<T> = {
  get: () => T;
  set: SetState<T>;
  subscribe: (listener: Listener<T>) => void;
}

export const writable = <T>(initialState: T): Store<T> => {
  let state = initialState;
  const listeners = new Set<Listener<T>>();

  const get = () => state;
  const set: SetState<T> = (newState) => {
    state = typeof newState === "function" ? {
      ...state, ...newState(state)
    } : {
      ...state, ...newState
    };
    listeners.forEach((listener: Listener<T>) => listener(state));
  }

  const subscribe = (listener: Listener<T>) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return { subscribe, get, set };
}
