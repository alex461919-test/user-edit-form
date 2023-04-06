import React from 'react';
import { Toast, ToastContainer, ToastContainerProps, ToastProps } from 'react-bootstrap';
import useMap from 'src/lib/useMap';

interface CustomToastProps extends ToastProps {
  header: React.ReactNode;
  body: React.ReactNode;
}
type ToastContextType = (arg1: CustomToastProps) => () => void;

const ToastContext = React.createContext<ToastContextType>((arg1: CustomToastProps) => () => {});
ToastContext.displayName = 'ToastContext';

const useShowToast = () => React.useContext(ToastContext);

const ToastProvider: React.FC<React.PropsWithChildren<ToastContainerProps>> = ({ children, ...toastContainerProps }) => {
  const [map, { set, remove }] = useMap<CustomToastProps, number>();
  const contextValue = React.useCallback<ToastContextType>(
    toastProps => {
      set(toastProps, Math.random());
      return () => remove(toastProps);
    },
    [remove, set],
  );

  return (
    <>
      <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>
      <ToastContainer {...toastContainerProps}>
        {Array.from(map.entries()).map(item => {
          const { header, body, bg, ...toastProps } = item[0];
          return (
            <Toast key={item[1]} {...toastProps} bg={bg} onClose={() => remove(item[0])}>
              <Toast.Header>
                <strong className="me-auto">{header}</strong>
              </Toast.Header>
              <Toast.Body>
                <div className={bg?.toLowerCase() === 'dark' ? 'text-white' : ''}>{body}</div>
              </Toast.Body>
            </Toast>
          );
        })}
      </ToastContainer>
    </>
  );
};

export { ToastProvider, useShowToast };

/*







class ToastListBase extends Set<{ toast: React.FC<ToastProps>; id: number }> {
  setContent: React.Dispatch<React.SetStateAction<React.ReactNode>> | null = null;

  addElement(id: number) {
    throw new Error('Function not implemented.');
  }

  deleteElement(id: number) {
    throw new Error('Function not implemented.');
  }
  render() {
    throw new Error('Function not implemented.');
  }

  get value() {
    const show = () => {
      const id = Math.random();
      this.addElement(id);
      return () => {
        this.deleteElement(id);
      };
    };
    return { show };
  }
  get useContentValueState() {
    return () => {
      const [content, setContent] = React.useState<React.ReactNode>(null);
      this.setContent = setContent;
      return content;
    };
  }
  get show() {
    return (toast: React.FC<ToastProps>) => {
      const el = { toast, id: Math.random() };
      this.add(el);
      return () => {
        this.delete(el);
      };
    };
  }
}
*/
