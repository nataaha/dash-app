import React from 'react';
import { AdminContext } from './AdminContext';
import { AdminUI}  from './AdminUi';

export const Admin = (props) => {
    const {
        authProvider,
        children,
        loginPage,
        registerPage,
        logoutButton,
        title = 'ALKIP Platform Admin',
        store,
        theme,
        basename,
        catchAll,
        dashboard,
        notification,
        requireAuth,
        ready,
        layout,
        apiConfig
    } = props;

    return (
        <AdminContext
            authProvider={authProvider}
            basename={basename}
            store={store}
            theme={theme}
            apiConfig = { apiConfig }
        >
            <AdminUI
                title={title}
                loginPage={loginPage}
                registerPage = { registerPage }
                logout={authProvider ? logoutButton : undefined}
                layout={layout}
                dashboard={dashboard}
                catchAll={catchAll}
                notification={notification}
                requireAuth={requireAuth}
                ready={ready}
                
            >
                {children}
            </AdminUI>
        </AdminContext>
    );
};

export default Admin;