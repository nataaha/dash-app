import { setToken } from '@alkuip/core';

/**
 * This represents some generic auth provider API, like Firebase.
 */
 const AuthDhis2Provider ={
    isAuthenticated: false,
    login: async({ url, username, password }) =>{
      const authEncoded = "Basic " + Buffer.from(username + ":" + password).toString('base64');
      const authRes = await fetch(`${url}/api/dataStore/ugx_elmis/setup`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Authorization": authEncoded
        }
      });
      if (authRes.status < 200 || authRes.status >= 300) {
        throw new Error(authRes.statusText);
      }
      const auth = await authRes.json();
      setToken(auth?.apiKey,authEncoded); 
      AuthDhis2Provider.isAuthenticated = true;
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