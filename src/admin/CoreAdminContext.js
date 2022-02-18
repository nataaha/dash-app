import React from 'react';
import { AuthContext } from '@alkuip/core';

export const CoreAdminContext = (props) => {
    const {
        authProvider,
        children,
    } = props;
    return (
        <AuthContext.Provider value={authProvider}>
            {children}
        </AuthContext.Provider>
    );
};