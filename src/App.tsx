import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import './store/userAPI';
import { useGetAllUsersQuery, useGetUserByIdQuery } from './store/userAPI';

function App() {
  const { data: data1, data: error1, data: isLoading1 } = useGetAllUsersQuery();
  const { data, error, isLoading } = useGetUserByIdQuery('3');

  return (
    <Container fluid>
      <div className="App">
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{}</h3>
            <img src={data.avatar} alt={data.firstName} />
          </>
        ) : null}
      </div>
    </Container>
  );
}

export default App;
