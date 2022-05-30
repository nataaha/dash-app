import { setToken,getToken } from '@alkuip/core';
import { Buffer } from 'buffer';
/**
 * This represents some generic auth provider API, like Firebase.
 */
 const AuthDhis2Provider ={
    isAuthenticated: false,
    login: async({url, username, password }) =>{
      const token = getToken();
      let authEncoded =  token?.api;
      let headers = new Headers();
      if(username !==''){
        authEncoded = "Basic " + Buffer.from(username + ":" + password).toString('base64');
        setToken(undefined,authEncoded);
        headers = {
          ...headers,
          "Authorization": authEncoded
        }
      }
      const authRes = await fetch(`${url}/api/dataStore/ugx_elmis/setup`,{
        credentials: 'include',
        headers: headers
      });
      if (authRes.status < 200 || authRes.status >= 300) {
        throw new Error(authRes.statusText);
      }
      const auth = await authRes.json();
      setToken(auth?.apiKey,undefined); 
      AuthDhis2Provider.isAuthenticated = true;
      setTimeout(()=>{ return; }, 100);
      return auth;
    },
    logout: ()=> {
      localStorage.removeItem('auth');
      localStorage.removeItem('dsApiKey');
      setTimeout(()=>{}, 100);
    },
    checkError: (error) => {
      const status = error.status;
      if (status === 401 || status === 403) {
        AuthDhis2Provider.isAuthenticated = false;
        return Promise.reject({ redirectTo: '/login', logoutUser: false });
          
      }
      // other error code (404, 500, etc): no need to log out
      return Promise.resolve();
    },
    checkAuth: ({ url, username, password }) => (localStorage.getItem('auth') && localStorage.removeItem('dsApiKey'))
        ? Promise.resolve()
        : Promise.reject(),
  };

  export { 
    AuthDhis2Provider 
  };