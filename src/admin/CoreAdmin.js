import React from 'react';
import { CoreAdminContext } from './CoreAdminContext';
import { CoreAdminUI } from './CoreAdminUi';

export const CoreAdmin = (props) => {
    const {
        authProvider,
        children,
        loading,
        loginPage,
        registerPage,
        logoutButton,
        title,
        basename,
        ready,
        requireAuth,
        layout
    } = props;
    return (
        <CoreAdminContext
            authProvider={authProvider}
            basename={basename}
        >
            <CoreAdminUI
                title={title}
                loading={loading}
                loginPage={loginPage}
                registerPage ={ registerPage }
                logout={
                    authProvider ? logoutButton : undefined
                }
                layout={layout}
                requireAuth={requireAuth}
                ready={ready}
            >
                {children}
            </CoreAdminUI>
        </CoreAdminContext>
    );
};
