import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { setupStore } from './api/store';
import { Provider } from 'react-redux';
import { ToastProvider } from './components/notify/ToastControl';
import { LoadingWaitProvider } from './components/notify/LoadingWaitControl';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
console.dir(root);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider position="bottom-end" className="p-2">
        <LoadingWaitProvider position="top-end" className="p-2">
          <App />
        </LoadingWaitProvider>
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
);
//
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
