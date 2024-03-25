import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './Store/store';
import { BrowserRouter, redirect } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
//import dotenv from 'dotenv';

//dotenv.config();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          }}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
