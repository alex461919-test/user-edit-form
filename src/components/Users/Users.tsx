import React from 'react';
import { emptyArray, getHumanError } from '../../lib/helpers';
import { useGetAllUsersQuery } from 'src/api/store';
import { useShowToast } from '../notify/ToastControl';
import { useShowLoadingWait } from '../notify/LoadingWaitControl';
import { Button, Stack } from 'react-bootstrap';
import UsersTable from './UsersTable/UsersTable';

function Users() {
  const { data = emptyArray, isLoading, isError, error, isFetching, refetch } = useGetAllUsersQuery();

  const showToast = useShowToast();
  const showLoadingWait = useShowLoadingWait();

  React.useEffect(() => {
    if (isLoading) {
      return showLoadingWait();
    }
  }, [isLoading, showLoadingWait]);

  React.useEffect(() => {
    if (isError && error) {
      return showToast({
        header: 'Ошибка',
        body: (
          <Stack gap={2}>
            {getHumanError(error)}
            <Button variant="primary" size="sm" className="align-self-end" onClick={refetch}>
              Повторить?
            </Button>
          </Stack>
        ),
        bg: 'danger',
      });
    }
  }, [error, isError, refetch, showToast]);

  return <UsersTable data={data} isFetching={isFetching}></UsersTable>;
}
export default Users;
