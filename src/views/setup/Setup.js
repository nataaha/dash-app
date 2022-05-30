import React from 'react';
import { HisViewWrapper } from '@alkuip/jsonforms';


export const HisSetup = (props) => {
  return ( 
      <HisViewWrapper
        {...props}
        path = {`/api/dataStore/ugx_elmis/products` }
        footer= {``} 
        appName = { `setup`}
        appDataStore ={ `metadata`}
        appSetupStore ={ `metadata`}  
        isConfigModule = { true } 
      />             
  );
};
export default HisSetup;
