import React from 'react';
import theme from '../theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  ConfigContext,
} from '@alkuip/core';
import { ThemeProvider } from '@mui/material';

/**
 * Admin Theme with Context Page
**/

const AdminThemeContext = ( { apiConfig, children } ) => {
  const configCtx = {
    integration: apiConfig?.api,
    baseUrl: apiConfig?.url,
    dataStore: apiConfig?.dataStore,
    headers: {
      ...apiConfig?.headers
    },
    defaultPage: apiConfig?.defaultPage,
    standalone: apiConfig?.standalone
  }
  return (
         <ThemeProvider theme={ theme}>
            <ConfigContext.Provider value={configCtx}>
              { children }
            </ConfigContext.Provider>
          </ThemeProvider>
  );
}
export default AdminThemeContext;