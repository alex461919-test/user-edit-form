import { Container } from 'react-bootstrap';
import LoadingWaitControl from './notify/LoadingWait';
import UsersTable from './table-components/UsersTable';
import './notify/ToastProvider';

const { hook: useLoadingWaitControl, context: LoadingWaitContext } = new LoadingWaitControl();

function App() {
  return (
    <Container className="my-4">
      <UsersTable />
    </Container>
  );
}
export { useLoadingWaitControl };
export default App;
