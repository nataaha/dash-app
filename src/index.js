import React from 'react';
import ReactDOM from 'react-dom';
import {
  getUrls,
  awaitFetcher,
  AuthProvider
} from '@alkuip/core';
import reportWebVitals from './reportWebVitals';
import AppAuthConfig from './AppAuthConfig';
import { HashRouter as Router } from "react-router-dom";
import { AuthDhis2Provider  } from './AuthDhis2Provider';
import { Admin, LoginPage,TestPage } from './admin';

/***
 * Exports 
 */
export { routes } from './Routes';


/**
 * Initialize the Platform Application
 */
const initApp = async () => {
  const appData  = await awaitFetcher(`AppConfig.json`,null);
  const checkUrl = getUrls(appData);
  ReactDOM.render(
    <Router>
      {/*
        <AuthProvider authProvider={ AuthDhis2Provider }>
          <AppAuthConfig
            apiConfig = {checkUrl}
          />
        </AuthProvider>
        */
      }
      {
        <Admin 
          loginPage={<LoginPage/> } 
          registerPage={<TestPage/> }
          appConfig = { checkUrl }
        >
        </Admin>
      }
    </Router>,document.getElementById('root')
  );
};

initApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();