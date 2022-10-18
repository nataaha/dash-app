import {
  awaitFetcher,
} from '@alkuip/core';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router } from "react-router-dom";
import { AuthDhis2Provider  } from './AuthDhis2Provider';
import { Admin, SignInPage , LoginUiPage } from './admin';
import { createRoot } from 'react-dom/client';

/***
 * Exports 
 */
export { routes } from './Routes';


/**
 * Initialize the Platform Application
 */
const initApp = async () => {
  const appData  = await awaitFetcher(`AppConfig.json`,null);
  const container = document.getElementById('root');
  const root = createRoot(container); 
  root.render(
    <Router>
      {
        <Admin 
          authProvider={ AuthDhis2Provider }
          loginPage={ 
            <LoginUiPage/> 
          } 
          registerPage={<SignInPage/> }
          apiConfig = { appData }
          //layout={CustomLayout}
        />
      }
    </Router>
  );
};

initApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
