import React from 'react';
import { CoreAdminContext } from './CoreAdminContext';
import { CoreAdminUI } from './CoreAdminUi';

export const CoreAdmin = (props) => {
    const {
        authProvider,
        children,
        loading,
        loginPage,
        logoutButton,
        title = 'ALKUIP Platform Admin',
    } = props;
    return (
        <CoreAdminContext
            authProvider={authProvider}
        >
            <CoreAdminUI
                title={title}
                loading={loading}
                loginPage={loginPage}
                logout={authProvider ? logoutButton : undefined}
            >
                {children}
            </CoreAdminUI>
        </CoreAdminContext>
    );
};
