import React from 'react';
import { ToastContainer, ToastContainerProps, ToastProps } from 'react-bootstrap';

interface ToastProviderProps extends ToastContainerProps {
  control: {
    context: React.Context<any>;
  };
}

const ToastProvider: React.FC<React.PropsWithChildren<ToastProviderProps>> = props => {
  const {
    control: { context: Context },
    children,
    ...ToastContainerProps
  } = props;

  const [content, setContent] = React.useState<React.ReactNode>(null);
  return (
    <>
      <Context.Provider value={setContent}>{children}</Context.Provider>
      <ToastContainer {...ToastContainerProps}>{content}</ToastContainer>
    </>
  );
};

export default ToastProvider;

class ToastListBase extends Set<{ toast: React.FC<ToastProps>; id: number }> {
  private setValue: React.Dispatch<React.SetStateAction<React.ReactNode>> | null = null;

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
  get useContextValueState() {
    return () => {
      const [value, setValue] = React.useState<React.ReactNode>(null);
      this.setValue = setValue;
      return value;
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
