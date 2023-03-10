import React from 'react';
import { ToastContainer, ToastProps } from 'react-bootstrap';

type ToastComponent = React.FunctionComponent<ToastProps>;

const toastContext = React.createContext((p1: ToastComponent) => () => {});
toastContext.displayName = 'ToastContext';

export const useAddToast = () => React.useContext(toastContext);

export function ToastProvider({ children }: React.PropsWithChildren) {
  const [set, { add, remove }] = useMemoSet<{ Component: ToastComponent; key: React.Key; remove: () => void }>();
  const { Provider } = toastContext;

  const addToast = React.useCallback(
    (component: ToastComponent) => {
      const toastItem = { Component: component, key: Math.random(), remove: () => {} };
      add(toastItem);
      return (toastItem.remove = () => remove(toastItem));
    },
    [add, remove],
  );

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        {Array.from(set).map(({ Component, key, remove }) => (
          <Component key={key} onClose={remove} />
        ))}
      </ToastContainer>
      <Provider value={addToast}>{children}</Provider>
    </>
  );
}

type UseMemoSet<T> = Readonly<[Set<T>, { add: (value: T) => Set<T>; remove: (value: T) => boolean }]>;

// !!!Объект Set остается всегда тем же самым, но мутабельным. Изменения происходят "на месте"
// Это что бы не менялись методы доступа(add,remove) после каждой мутации, как это обычно реализуют в хуках useSet.
function useMemoSet<T>(initialValue?: Iterable<T>) {
  const [, flash] = React.useState(0);
  return React.useMemo<UseMemoSet<T>>(() => {
    const set = initialValue === undefined ? new Set<T>() : new Set(initialValue);
    const add = (value: T) => {
      flash(Math.random);
      return set.add(value);
    };
    const remove = (value: T) => {
      flash(Math.random);
      return set.delete(value);
    };

    return [set, { add, remove }] as const;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
/*
const NotifyContext = React.createContext<(arg: React.ReactNode) => () => void>(() => () => {});
toastContext.displayName = 'NotifyContext';

export const NotifyProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { set, show } = useToastControl<React.ReactNode>();
  return (
    <>
      <NotifyContext.Provider value={show}>{children}</NotifyContext.Provider>
      <ToastContainer position="top-end" className="p-3">
        {Array.from(set).map(({ Component, key, remove }) => (
          <Component key={key} onClose={remove} />
        ))}
      </ToastContainer>
    </>
  );
};

function useToastControl<T>() {
  const [set, { add, remove }] = useSet<T>();
  const show = React.useCallback(
    (toast: T) => {
      add(toast);
      return () => remove(toast);
    },
    [add, remove],
  );
  return { set, show };
}

export interface StableActions<K> {
  add: (key: K) => void;
  remove: (key: K) => void;
  toggle: (key: K) => void;
  reset: () => void;
}

export interface Actions<K> extends StableActions<K> {
  has: (key: K) => boolean;
}

function useSet<K>(initialSet = new Set<K>()): [Set<K>, Actions<K>] {
  const [set, setSet] = React.useState(initialSet);

  const stableActions = React.useMemo<StableActions<K>>(() => {
    const add = (item: K) => setSet(prevSet => new Set([...Array.from(prevSet), item]));
    const remove = (item: K) => setSet(prevSet => new Set(Array.from(prevSet).filter(i => i !== item)));
    const toggle = (item: K) =>
      setSet(prevSet => (prevSet.has(item) ? new Set(Array.from(prevSet).filter(i => i !== item)) : new Set([...Array.from(prevSet), item])));
    return { add, remove, toggle, reset: () => setSet(initialSet) };
  }, [initialSet]);

  const utils = {
    has: React.useCallback(item => set.has(item), [set]),
    ...stableActions,
  } as Actions<K>;

  return [set, utils];
}
*/
