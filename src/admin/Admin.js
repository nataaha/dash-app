import React from 'react';

import { AdminContext } from './AdminContext';
import { AdminUI}  from './AdminUi';

export const Admin = (props) => {
    const {
        authProvider,
        children,
        loginPage,
        logoutButton,
        title = 'ALKUIP Platform Admin',
    } = props;

    return (
        <AdminContext
            authProvider={authProvider}
        >
            <AdminUI
                title={title}
                loginPage={loginPage}
                logout={authProvider ? logoutButton : undefined}
            >
                {children}
            </AdminUI>
        </AdminContext>
    );
};