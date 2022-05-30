
import * as React from 'react';
import { CoreAdminContext } from './CoreAdminContext';

import { defaultTheme } from './DefaultTheme';

export const AdminContext = (props) => {
    const { theme = defaultTheme, apiConfig, children, ...rest } = props;
    return (
        <CoreAdminContext
            apiConfig ={ apiConfig }
            {...rest}
        >
            {children}
        </CoreAdminContext>
    );
};