/**
 * Get Schemas from the Schema REST API Provider
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
export const useAppUiSchemaReducer =(state,action)=>{
    let query = {
        type: action.payload.app?.appId
    };
    if(action.type === "UPDATE_APP_UISCHEMA"){
        if(action.payload.app?.fhirVersion && action.payload.app?.enableFhir){
            query = {
                type: 'fhir',
                version: action.payload.app?.fhirVersion || "4.3.0"
            }
        }
        return {
            ...state,
            app: action.payload.app,
            uischemas: action.payload.uischemas,
            schemas: action.payload.schemas,
            query: query
        }
    }
    else{
        return {
            ...state,
            query: query
        }
    }
}
/**
 * Find the default app to use
 * @param {*} apps 
 * @param {*} defaultApp 
 * @param { String } appName
 * @returns 
 */
export const getDefaultApp=(apps,appName)=>{
    return apps?.find((app)=> (app?.appId === appName || app?.path === appName));
}
/**
 * Get navigation query
 * @param {*} app 
 * @returns 
 */
export const getNavigationQuery =(app="dashboard")=>{
    if(app?.fhirVersion && app?.enableFhir){
        return {
            type: 'fhir',
            version: app?.fhirVersion || "4.3.0"
        }
    }
    else{
        return {
            type: app?.appId
        };
    }
}