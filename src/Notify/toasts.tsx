import React from 'react';
import { ToastContainer, ToastProps } from 'react-bootstrap';
import { useSet } from 'ahooks';

type ToastComponent = React.FunctionComponent<ToastProps>;

const toastContext = React.createContext((p1: ToastComponent) => () => {});

export const useAddToast = () => React.useContext(toastContext);

export function ToastProvider({ children }: React.PropsWithChildren) {
  const [set, { add, remove }] = useSet<{ Component: ToastComponent; key: React.Key; remove: () => void }>();
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
      <ToastContainer position="top-end">
        {Array.from(set).map(({ Component, key, remove }) => (
          <Component key={key} onClose={remove} />
        ))}
      </ToastContainer>
      <Provider value={addToast}>{children}</Provider>
    </>
  );
}
