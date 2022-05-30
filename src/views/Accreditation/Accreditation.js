import React from 'react';
import { HisViewWrapper } from '@alkuip/jsonforms';

export const Accreditation = (props) => {
  return ( 
      <HisViewWrapper 
        {...props}
        footer= {``}
        appName = { `accreditation`}
        appDataStore ={ `alkuistore`}
        appSetupStore ={ `alkuistore`}
        isDefaultUiSchema = { false }  

      />          
  );
};
export default Accreditation;
