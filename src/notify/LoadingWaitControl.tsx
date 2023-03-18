/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { ToastContainer, ToastContainerProps } from 'react-bootstrap';
import useSet from '../service/useSet';

type LoadingWaitContextType = () => () => void;

const LoadingWaitContext = React.createContext<LoadingWaitContextType>(() => () => {});
LoadingWaitContext.displayName = 'LoadingWaitContext';

const useShowLoadingWait = () => React.useContext(LoadingWaitContext);

const LoadingWaitProvider: React.FC<React.PropsWithChildren<ToastContainerProps>> = ({ children, ...toastContainerProps }) => {
  const [set, { add, remove }] = useSet<number>();

  const contextValue = React.useCallback<LoadingWaitContextType>(() => {
    const id = Math.random();
    add(id);
    return () => remove(id);
  }, [add, remove]);

  return (
    <>
      <LoadingWaitContext.Provider value={contextValue}>{children}</LoadingWaitContext.Provider>
      <ToastContainer {...toastContainerProps}>
        {set.size > 0 ? (
          <div css={waitStype}>
            <span className="spinner-border spinner-border-sm ms-2" role="status"></span>
            <span className="mx-3">Загрузка...</span>
          </div>
        ) : null}
      </ToastContainer>
    </>
  );
};
export { LoadingWaitProvider, useShowLoadingWait };

const waitStype = css`
  padding: 0.5rem;
  background-color: #fcf7d1;
  border: 1px solid #eacb6b;
  border-radius: 4px;
  font-size: 0.875rem;
`;
