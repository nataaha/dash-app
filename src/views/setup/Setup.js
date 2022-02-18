import React from 'react';
import { 
  ConfigSchema,
  ConfigUiSchema, 
} from '@alkuip/schemas';
import { HisViewWrapper } from '@alkuip/jsonforms';


export const HisSetup = (props) => {
  return ( 
      <HisViewWrapper
        {...props}
        formSchema={ ConfigSchema } 
        uiSchema = { ConfigUiSchema }
        uischemas ={
          [
            { type: 'dashboard',uischema: ConfigUiSchema }
          ]
        }
        path = {`/api/dataStore/ugx_elmis/products` }
        footer= {``} 
        appName = { `elmis`}
        appDataStore ={ `metadata`}
        appSetupStore ={ `metadata`}  
        isConfigModule = { true } 
      />             
  );
};
export default HisSetup;
