import React, { useCallback, useEffect, useState } from 'react';
import App from './App';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useToken } from '@alkuip/core';
import AppAuthConfig from 'AppAuthConfig';
/**
 * Config I18n Internationalization
**/

const AppConfig = ( props ) => {
  const { apiConfig } = props; 
  const token = useToken();
  const [authenticated,setAuthenticated] = useState(false);
  const [authMessage,setAuthMessage] = useState("NOT_AUTHENTICATED");
  const authenticate =useCallback(()=>{
    setAuthMessage('AUTHENTICATING');
    if(token?.ds && apiConfig?.dataStore){
      fetch(`${apiConfig?.dataStore}/dataStore`,
        {
          headers: {
            'x-api-key': token?.ds,
            'strategy': 'apiKey'
          }
        }
      ).then(async(res)=>{
        const auth = await res.json();
        if(auth?.authenticated && (auth !== 401 || auth !== 403)){
          setAuthenticated(true);
          setAuthMessage('AUTHENTICATED');
        }
        else{
          setAuthenticated(false);
          setAuthMessage('FAILED');
        }
      })
    }
    else{
      setAuthenticated(false);
      setAuthMessage('FAILED');
    }
    
  },[apiConfig?.dataStore,token?.ds]);

  useEffect(()=>{
      authenticate();
  },[authenticate]);
  return (
    authenticated?(
      <App/>
    ):
    (
      <div>
      { 
        authMessage ==='FAILED'?(
          <>
            <span>Log in failed. Please login.</span>
              <AppAuthConfig
              apiConfig = { apiConfig}
            />
          </>
          
        ):
        (
          <span>Logging in ..........</span>
        )
      }
      </div>
    )
  );
}
export default AppConfig;