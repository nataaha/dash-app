import { memo, useState, useEffect, useReducer } from 'react';
import { HisViewWrapper } from '@alkuip/jsonforms';
import { useParams  } from 'react-router-dom';
import { 
  RouteWithLayout,
  Minimal as MinimalLayout
} from '@alkuip/components';
import {
  Main as MainLayout
} from '../../admin/layout';
import { 
  useFetchApi,
  useConfig,
  Authenticated,
  UiMenuSchemaContext
} from '@alkuip/core';
import { 
  useAppUiSchemaReducer, 
  getFhirSchema, 
  getDefaultApp, 
  getNavigationQuery
} from '../../admin/util';
import * as qs from 'qs';
import isEmpty from 'lodash/isEmpty';

export const Accreditation = memo((props) => {
  const {
      layout: Layout,
      catchAll: CatchAll,
      dashboard,
      loading: LoadingPage,
      title,
      resources, resource 
  } = props;
  const appRoute = useParams();
  const { appName } = appRoute;
  const { 
    dataStore,
    headers,
    apps,
    defaultPage 
  } = useConfig();

  const defaultApp = getDefaultApp(apps,defaultPage);
  const [state,dispatch] = useReducer(useAppUiSchemaReducer,{
      app: defaultApp,
      query: getNavigationQuery(defaultApp)
  });
  const { 
    app, 
    query 
  } = state;
  const [schema,setSchema] = useState(undefined);
  const [uiApp,setUiApp] = useState(undefined);
  const [appQuery,setAppQuery] = useState(undefined);
  const [uiSchema,setUiSchema] = useState([]);

  const { data:uischemas } = useFetchApi(uiApp?.appId?`${dataStore}/uischemas?appId=${uiApp?.appId}`:null,headers,false);
  const { data:schemas } = useFetchApi((appQuery?.type && uiApp?.appId)?`${dataStore}/schemas?${ qs.stringify(appQuery) }`:null,headers,false);
  useEffect(()=>{
      if(!isEmpty(schemas?.data)){
          if(appQuery?.type ==='fhir'){
              const fhirSchema = getFhirSchema(schemas.data,appQuery?.type,appQuery?.version,['Account']);
              setSchema(fhirSchema);
          }
          setSchema(schemas?.data);
      }
      if(!isEmpty(uischemas?.data)){
          setUiSchema(uischemas?.data);
      }
  },[uischemas?.data,schemas?.data,appQuery?.type,appQuery?.version])

  
  useEffect(()=>{
    if(app?.appId !== appName){
      setUiApp(app);
      setAppQuery(query);
    }
    else{
      const menuApp = getDefaultApp(apps,appName);
      setUiApp(menuApp);
      setAppQuery(getNavigationQuery(menuApp));

    }
    return ()=> false;
  },[app,apps,appName,query]);
  return ( 
    <Authenticated>
      <UiMenuSchemaContext.Provider value ={
          {
              uischemas: uiSchema,
              schemas: schema,
              app: state?.app
          }
        }
      >
        <Layout dashboard={dashboard} title={title} resources={ resources }>
          {
            resource.layout === 'minimal'?
              (
                <MinimalLayout 
                  routes={ resources }
                  dispatch={ dispatch }
                >
                  <RouteWithLayout
                    route = { resource }
                    {...props}
                    footer= {``}
                    appDataStore ={ `alkuistore`}
                    appSetupStore ={ `alkuistore`}
                    isDefaultUiSchema = { false }  
                    component =  { HisViewWrapper } 
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
                    {...props}
                    footer= {``}
                    appDataStore ={ `alkuistore`}
                    appSetupStore ={ `alkuistore`}
                    isDefaultUiSchema = { false }  
                    component =  { HisViewWrapper } 
                  />
                </MainLayout> 
              )
          }
        </Layout>
      </UiMenuSchemaContext.Provider>
    </Authenticated>                 
  );
});
export default Accreditation;
