import { Hash } from 'crypto';
import React from 'react';
import { Button, Container, Toast, ToastProps } from 'react-bootstrap';
import { ToastProvider, useAddToast } from './Notify/toasts';
import Table from './table/UsersTable';
const hash = require('object-hash');

function App() {
  return (
    <ToastProvider>
      <Container className="my-4">
        <Test />
        <Table />
      </Container>
    </ToastProvider>
  );
}

export default App;

let i = 1;
function Test() {
  const add = useAddToast();
  const [remove, setRemove] = React.useState<Array<{ fn: () => void; key: string }>>([]);

  const handlerClick = (j: number) => {
    const _remove = add((props: ToastProps) => (
      <Toast {...props}>
        <Toast.Header>
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message. №{j} </Toast.Body>
      </Toast>
    ));
    setRemove(list => [...list, { fn: _remove, key: hash(Math.random()) }]);
  };
  console.log('---------------------------');

  return (
    <>
      <Button onClick={() => handlerClick(i++)}>Add Toast</Button>
      {remove.map(item => {
        return (
          <Button
            key={item.key}
            onClick={() => {
              item.fn();

              setRemove(list => {
                const index = list.indexOf(item);
                return index < 0 ? list : [...list.splice(index, 1)];
              });
            }}>
            Remove
          </Button>
        );
      })}
    </>
  );
}
