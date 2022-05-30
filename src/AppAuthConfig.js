import React,{ useState,useReducer, useEffect } from 'react';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  ConfigContext,
  useLogin
} from '@alkuip/core';
import { ThemeProvider } from '@mui/material';
import AppConfig from './AppConfig';
import { Admin, LoginUiPage } from './admin';
import { SignUp } from 'views';
import { AppPublicRoutes } from 'Routes';

/**
 * Auth Login Page
**/

const AppAuthConfig = ( props ) => {
  const { apiConfig } = props; 
  const [loading, setLoading] = useState(true);
  const [isStandalone,setIsStandalone] = useState(false);
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
      ...apiConfig?.headers
    },
    defaultPage: apiConfig?.defaultPage
  }
  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };
  const handleClick = (_event)=>{
      _event.preventDefault();
      setLoading(true);
      if(!isStandalone){
        setLoading(false);
        return;
      }
      login({ url: apiConfig?.url ,username: formInput?.j_username, password: formInput?.j_password }).then((t) => {
        setLoading(false);
      });
  }
  useEffect(()=>{
    setIsStandalone(apiConfig?.standalone)
  },[apiConfig?.standalone])

  return (
         <ThemeProvider theme={ theme}>
            <ConfigContext.Provider value={configCtx}>
              {
                (!loading) ?
                (
                  <AppConfig
                    apiConfig = { apiConfig }
                  />
                ):
                (
                  
                  <LoginUiPage
                    handleClick= { handleClick } 
                    handleInput = { handleInput }
                    standaloneApp = { isStandalone }
                    apiConfig = { apiConfig }
                  />
                 
                )              
            }
            </ConfigContext.Provider>
          </ThemeProvider>
  );
}
export default AppAuthConfig;