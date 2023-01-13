import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { isErrorWithMessage, isFetchBaseQueryError } from '../store/helpers';

function ShowError(error: any) {
  if (isFetchBaseQueryError(error)) {
    const errMsg = 'error' in error ? error.error : JSON.stringify({ status: error.status, data: error.data }, null, 2);
    return (
      <div>
        Error! <pre>{errMsg}</pre>
      </div>
    );
  } else if (isErrorWithMessage(error)) {
    return <div>Error! {error.message}</div>;
  }
  return <></>;
}

export default ShowError;
