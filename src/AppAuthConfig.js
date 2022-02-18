/** @jsxImportSource @emotion/react */

import React,{ useState,useReducer} from 'react';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  ConfigContext,
  useLogin
} from '@alkuip/core';
import { ThemeProvider } from '@mui/material';
import AppConfig from './AppConfig';
import { LoginPage } from './admin';

/**
 * Auth Login Page
**/

const AppAuthConfig = ( props ) => {
  const { apiConfig } = props; 
  const [loading, setLoading] = useState(true);
  const login = useLogin();
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      j_username: '',
      j_password: ''
    }
  );
  const configCtx = {
    integration: apiConfig?.api,
    baseUrl: apiConfig?.url,
    dataStore: apiConfig?.dataStore,
    headers: {
      ...apiConfig?.headers,
      //'Authorization': authHeader
    },
    externalDataStore: true,
    externalConfigStore: true,
  }


  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };
  const handleClick = (_event)=>{
      _event.preventDefault();
      setLoading(true);
      login({ url: apiConfig?.url ,username: formInput?.j_username, password: formInput?.j_password }, '/').then((t) => {
        setLoading(false);
      });
  }
  return (
         <ThemeProvider theme={ theme}>
            <ConfigContext.Provider value={configCtx}>
              {
                !loading ?
                (
                  <AppConfig
                    apiConfig = { apiConfig }
                  />
                ):
                (
                  <LoginPage handleClick= { handleClick } handleInput = { handleInput } />
                )              
            }
            </ConfigContext.Provider>
          </ThemeProvider>
  );
}
export default AppAuthConfig;