import { memo, useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { 
    WithPermissions, 
    useCheckAuth,
    useCreatePath,
    useTimeout
} from '@alkuip/core';
import { routes as resources } from '../Routes';
import {
    Accreditation as AccreditationView,
  } from '../views';
import { useScrollToTop } from './routing';

export const CoreAdminRoutes = memo((props ) => {
    const oneSecondHasPassed = useTimeout(1000);
    useScrollToTop();
    const createPath = useCreatePath();
    const {
        layout: Layout,
        catchAll: CatchAll,
        dashboard,
        loading: LoadingPage,
        requireAuth,
        title,
    } = props;

    const [canRender, setCanRender] = useState(!requireAuth);
    const checkAuth = useCheckAuth();
    useEffect(() => {
        if (requireAuth) {
            checkAuth()
                .then(() => {
                    setCanRender(true);
                })
                .catch(() => {});
        }
    }, [checkAuth, requireAuth]);

    if (!canRender) {
        return (
            <Routes>
                {oneSecondHasPassed ? (
                    <Route path="*" element={<LoadingPage />} />
                ) : (
                    <Route path="*" element={null} />
                )}
            </Routes>
        );
    }
    return (
        <Routes>
            {
                /*
                    Render the custom routes that were outside the child function.
                */
            }
            { 
                <Route
                    path="/*"
                    element={
                        <Routes>
                            {
                                resources?.[0]?.children?.map((resource,i) => (
                                    <Route
                                        path={ resource?.path }
                                        key={ `path-app-${i}` }
                                        element={
                                            <AccreditationView 
                                                { ...props }
                                                resources={ resources } 
                                                resource={ resource }
                                            />
                                        }
                                    />
                                ))
                            }
                            <Route
                                path="/"
                                element={
                                    dashboard ? (
                                        <WithPermissions
                                            authParams={defaultAuthParams}
                                            component={dashboard}
                                        />
                                    ) : resources.length > 0 ? (
                                        <Navigate
                                            to={
                                                createPath({
                                                resource: '/dashboard',
                                                type: 'list',
                                            })}
                                        />
                                    ) : null
                                }
                            />
                            <Route
                                path="*"
                                element={<CatchAll title={title} />}
                            /> 
                        </Routes>
                    }
                />
            }          
        </Routes>
    );
});

CoreAdminRoutes.defaultProps = {
    customRoutes: [],
};

const defaultAuthParams = { 
    route: 'dashboard' 
};
