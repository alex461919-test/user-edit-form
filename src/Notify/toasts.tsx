import React from 'react';
import { ToastContainer, ToastProps } from 'react-bootstrap';

type ToastComponent = React.FunctionComponent<ToastProps>;

const toastContext = React.createContext((p1: ToastComponent) => () => {});

export const useAddToast = () => React.useContext(toastContext);

export function ToastProvider({ children }: React.PropsWithChildren) {
  const [set, { add, remove }] = useMemoSet<{ Component: ToastComponent; key: React.Key; remove: () => void }>();
  const { Provider } = toastContext;

  const addToast = React.useCallback(
    (component: ToastComponent) => {
      const toastItem = { Component: component, key: Math.random(), remove: () => {} };
      toastItem.remove = () => remove(toastItem);
      add(toastItem);
      return toastItem.remove;
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

function useMemoSet<T>(initialValue?: Iterable<T>) {
  const [, flash] = React.useState(true);
  const [memoSet] = React.useState<UseMemoSet<T>>(() => {
    const set = initialValue === undefined ? new Set<T>() : new Set(initialValue);
    const add = (value: T) => {
      flash(v => !v);
      return set.add(value);
    };
    const remove = (value: T) => {
      flash(v => !v);
      return set.delete(value);
    };

    return [set, { add, remove }];
  });
  return memoSet;
}