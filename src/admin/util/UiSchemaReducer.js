export const useAppUiSchemaReducer =(state,action)=>{
    if(action.type === "UPDATE_APP_UISCHEMA"){
        return {
            ...state,
            app: action.payload.app,
            uischemas: action.payload.uischemas,
            schemas: action.payload.schemas
        }
    }
    else{
        return state;
    }
}