import React, {
    useState, 
    useEffect,
    useReducer
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
    Authenticated,
    useFetchApi,
    useConfig,
    UiMenuSchemaContext
} from '@alkuip/core';
import { routes as resources } from '../Routes';
import { useAppUiSchemaReducer } from './util';

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
    const { dataStore,headers,apps } = useConfig();
    const [state,dispatch] = useReducer(useAppUiSchemaReducer,{
        app:apps?.[0]??{}
    });
    const { app } = state;
    const [canRender, setCanRender] = useState(!requireAuth);
    const checkAuth = useCheckAuth();

    const [schema,setSchema] = useState(undefined);
    const [uiApp,setUiApp] = useState(undefined);
    const [uiSchema,setUiSchema] = useState([]);
   
    const { data:schemas } = useFetchApi(uiApp?.appId?`${dataStore}/schemas?type=${uiApp?.appId}`:null,headers,false);
    const { data:uischemas } = useFetchApi(uiApp?.appId?`${dataStore}/uischemas?appName=${uiApp?.appId}`:null,headers,false);
    useEffect(()=>{
        if(schemas){
            setSchema(schemas?.data);
        }
        if(uischemas){
            setUiSchema(uischemas?.data);
        }
    },[uischemas,schemas])

    useEffect(() => {
        if (requireAuth) {
            checkAuth()
                .then(() => {
                    setCanRender(true);
                })
                .catch(() => {});
        }
    }, [checkAuth, requireAuth]);
    useEffect(()=>{
        setUiApp(app);
    },[app]);
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
                    <Authenticated>
                        <UiMenuSchemaContext.Provider value ={
                            {
                                uischemas: uiSchema,
                                schemas: schema
                            }
                        }>
                            <Layout dashboard={dashboard} title={title} resources={ resources }>
                                <Routes>
                                    { resources?.[0]?.children?.map((resource,i) => (
                                        <Route
                                        key={`route-${resource.path}-${i}`}
                                            path={`${resource.path}`}
                                            element={
                                                resource.layout === 'minimal'?
                                                (
                                                    
                                                        <MinimalLayout 
                                                            
                                                            routes={ resources }
                                                            dispatch={ dispatch }
                                                        >
                                                            <RouteWithLayout
                                                                route = { resource }
                                                                component = { resource?.component??(<div></div>) }
                                                            />
                                                        </MinimalLayout>
                                                
                                                ):
                                                (     
                                                                                        
                                                        <MainLayout 
                                                            routes={ resources }
                                                            dispatch = { dispatch } 
                                                        >
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
                        </UiMenuSchemaContext.Provider>
                    </Authenticated>
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
