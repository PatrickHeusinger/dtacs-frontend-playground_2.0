import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/App';
import { SeidrProvider } from 'seidr-react';
import reportWebVitals from './reportWebVitals';
import {store} from "./app/store";

const pathname = new URL(document.baseURI).pathname;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
    <BrowserRouter basename={pathname}>
      <SeidrProvider baseUrl={pathname + 'api/v1'}>
        <App />
      </SeidrProvider>
    </BrowserRouter>
      </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
