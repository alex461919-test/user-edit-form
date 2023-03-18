/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import NotifyBase from './NotifyBase';

interface IContextValue {
  show: () => () => void;
}

const waitStype = css`
  position: fixed;
  right: 0.75rem;
  top: 0.75rem;
  padding: 0.5rem;
  background-color: #fcf7d1;
  border: 1px solid #eacb6b;
  border-radius: 4px;
  text-align: center;
  z-index: 10000;
  font-size: 14px;
`;

class LoadingWaitControl extends NotifyBase {
  private loadingWaitContext: React.Context<IContextValue>;

  constructor() {
    super('loading-wait');
    this.loadingWaitContext = React.createContext<IContextValue>({ show: () => () => {} });
    this.loadingWaitContext.displayName = 'LoadingWaitContext';
  }

  addElement(id: number) {
    if (this.size === 0) {
      this.root.render(
        <div css={waitStype}>
          <span className="spinner-border spinner-border-sm ms-2" role="status"></span>
          <span className="mx-3">Загрузка...</span>
        </div>,
      );
    }
    this.add(id);
  }

  deleteElement(id: number) {
    this.delete(id);
    if (this.size < 1) this.root.render(null);
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
  get hook() {
    return () => React.useContext(this.loadingWaitContext);
  }
  get context() {
    return this.loadingWaitContext;
  }
}

/*
const LoadingSpinnerProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <LoadingSpinnerContext.Provider value={spinnerControl.contextValue}>{children}</LoadingSpinnerContext.Provider>
);
*/
const { context, value, hook } = new LoadingWaitControl();

export { context as LoadingWaitContext, value as LoadingWaitContextValue, hook as useLoadingWaitControl };

export default LoadingWaitControl;
