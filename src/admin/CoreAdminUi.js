import React, { createElement }  from 'react';
import { Route } from 'react-router-dom';


export const CoreAdminUI = (props) => {
    const {
        loginPage = false,
        title = 'ALKUIP Platform Admin',
    } = props;



    return (
        loginPage !== false && loginPage !== true ? (
            <Route
                exact
                path="/login"
                render={props =>
                    createElement(loginPage, {
                        ...props,
                        title,
                    })
                }
            />
        ) : null
    );
};