import React from 'react';
import { 
    AuthContext,
    StoreContextProvider, 
    memoryStore,
    NotificationContextProvider 
} from '@alkuip/core';
import PropTypes from 'prop-types';
import AdminThemeContext from './AdminThemeContext';
import AdminApp from './AdminApp';

export const CoreAdminContext = (props) => {
    const {
        authProvider,
        store,
        children,
        apiConfig
    } = props;
    return (
        <AuthContext.Provider value={authProvider}>
            <StoreContextProvider value={store}>
                <NotificationContextProvider>
                    <AdminThemeContext apiConfig ={ apiConfig }>
                        <AdminApp>
                            {children}
                        </AdminApp>
                    </AdminThemeContext>
                </NotificationContextProvider>
            </StoreContextProvider>
        </AuthContext.Provider>
    );
};

CoreAdminContext.defaultProps = {
    store: memoryStore(),
};
CoreAdminContext.propTypes= {
    basename: PropTypes.string
}