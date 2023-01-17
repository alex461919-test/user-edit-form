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
