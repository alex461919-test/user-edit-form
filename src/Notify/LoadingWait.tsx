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
function ErrorToast(message: string) {
  return function (props: ToastProps) {
    return (
      <Toast {...props} bg="danger">
        <Toast.Header>
          <strong className="me-auto">Ошибка</strong>
        </Toast.Header>
        <Toast.Body>
          <span className="text-white">{message}</span>
        </Toast.Body>
      </Toast>
    );
  };
}

export { LoadingToast, ErrorToast };
