import React from 'react';
import { Spinner, Toast, ToastProps } from 'react-bootstrap';

function LoadingToast() {
  return function (props: ToastProps) {
    return (
      <Toast {...props}>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Загрузка</strong>
        </Toast.Header>
        <Toast.Body>
          <Spinner animation="border" role="status" as="span" className="align-middle me-4">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <span>Подождите ...</span>
        </Toast.Body>
      </Toast>
    );
  };
}
function ErrorToast(message: React.ReactNode) {
  return function (props: ToastProps) {
    return (
      <Toast {...props} bg="danger">
        <Toast.Header>
          <strong className="me-auto">Ошибка</strong>
        </Toast.Header>
        <Toast.Body>
          <div className="text-white">{message}</div>
        </Toast.Body>
      </Toast>
    );
  };
}

export { LoadingToast, ErrorToast };
