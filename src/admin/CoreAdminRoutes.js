import React from 'react';
import {
    useState, 
    useEffect
} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { 
    RouteWithLayout,
    Main as MainLayout, 
    Minimal as MinimalLayout
  } from '@alkuip/components';
import { 
    WithPermissions, 
    useCheckAuth,
    useCreatePath,
    useTimeout,
    Authenticated
} from '@alkuip/core';
import { routes as resources } from '../Routes';

export const CoreAdminRoutes = React.memo((props ) => {
    const oneSecondHasPassed = useTimeout(1000);
    //useScrollToTop();
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
            {/*
                Render the custom routes that were outside the child function.
            */}
            <Route
                path="/*"
                element={
                    <div>
                        <Authenticated>
			<Layout dashboard={dashboard} title={title} resources={ resources }>
                            <Routes>
                                { resources?.map((resource,i) => (
                                    <Route
                                    key={`route-${resource.path}-${i}`}
                                        path={`${resource.path}/*`}
                                        element={
                                            resource.layout === 'minimal'?
                                            (
                                                
                                                    <MinimalLayout {...props } routes={ resources } >
                                                        <RouteWithLayout
                                                            route = { resource }
                                                            component = { resource?.component??(<div></div>) }
                                                        />
                                                    </MinimalLayout>
                                               
                                            ):
                                            (     
                                                                                     
                                                    <MainLayout {...props} routes={ resources } >
                                                        <RouteWithLayout
                                                            route = { resource }
                                                            component = { resource?.component??(<div></div>) }
                                                        />
                                                    </MainLayout>
                                                
                                          
                                            )
                                        }
                                    />
                                ))}
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
                        </Layout>
			</Authenticated>
                    </div>
                }
            />
        </Routes>
    );
});

CoreAdminRoutes.defaultProps = {
    customRoutes: [],
};

const defaultAuthParams = { 
    route: 'dashboard' 
};
