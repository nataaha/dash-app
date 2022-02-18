import React, { useCallback, useEffect, useState } from 'react';
import App from './App';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useToken, awaitFetcher } from '@alkuip/core';
/**
 * Config I18n Internationalization
**/

const AppConfig = ( props ) => {
  const { apiConfig } = props; 
  const token = useToken();
  const [authenticated,setAuthenticated] = useState(false);
  const [authMessage,setAuthMessage] = useState("NOT_AUTHENTICATED");
  const authenticate =useCallback(async()=>{
    if(token){
      setAuthenticated(true);
      setAuthMessage('AUTHENTICATED');
    }
    else{
        setAuthMessage('AUTHENTICATING');
        const auth = await awaitFetcher(`${apiConfig?.dataStore}/dataStore`,
          {
            'x-api-key': token?.ds,
            'strategy': 'apiKey',
            'Authorization': token?.api
          }
        );
        if(auth?.authenticated && (auth !== 401 || auth !== 403)){
          setAuthenticated(true);
          setAuthMessage('AUTHENTICATED');
        }
        else{
          setAuthenticated(false);
          setAuthMessage('FAILED');
        }
    }
  },[apiConfig?.dataStore, token]);

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
          <span>Not Authenticated.</span>
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