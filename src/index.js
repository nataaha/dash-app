import React from 'react';
import ReactDOM from 'react-dom';
import {
  CheckApi,
  getAppPath,
  awaitFetcher,
  AuthProvider
} from '@alkuip/core';
import reportWebVitals from './reportWebVitals';
import AppAuthConfig from './AppAuthConfig';
import { HashRouter as Router } from "react-router-dom";
import { AuthDhis2Provider  } from './AuthDhis2Provider';
//import $RefParser from "@apidevtools/json-schema-ref-parser";

/***
 * Exports 
 */
export { routes } from './Routes';


/**
 * Initialize the Platform Application
 */
const initApp = async () => {
  const appUrl = getAppPath('eLMIS');
  const appData  = await awaitFetcher(`${ appUrl }/AppConfig.json`,null);
  const checkUrl = CheckApi(appData);
  // log app info
  console.info(
    'ALKUIP Platform app'
  ); 
  /*try {
    let schema = await $RefParser.dereference("https://192.168.92.128/api/fhir/schemas/61e07d665679a84886ac9c73");
    console.log("Resolved Schema:",schema);
  }
  catch(err) {
    console.error(err);
  }*/
  ReactDOM.render(
    <Router>
      <AuthProvider authProvider={ AuthDhis2Provider }>
        <AppAuthConfig
          apiConfig = {checkUrl}
        />
      </AuthProvider>
    </Router>,document.getElementById('root')
  );
};

initApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();