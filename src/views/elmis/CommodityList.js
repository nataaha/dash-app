import React from 'react';

import { 
  ElmisSchema,
  ElmisUiSchema,
  ElmisViewUiSchema,
  ElmisAddUiSchema, ElmisApprovalUiSchema, ElmisEditUiSchema
} from '@alkuip/schemas';
import { HisViewWrapper } from '@alkuip/jsonforms';

export const CommodityList = (props) => {
  return ( 
 
      <HisViewWrapper
        {...props}
        formSchema={ ElmisSchema } 
        uiSchema = { ElmisUiSchema }
        customSchema = { ElmisViewUiSchema}
        uischemas = {[
          { type: 'default',uischema:ElmisUiSchema },
          { type: 'dashboard',uischema:ElmisViewUiSchema },
          { type: 'add',uischema: ElmisAddUiSchema },
          { type:'approve',uischema: ElmisApprovalUiSchema },
          { type:'edit',uischema: ElmisEditUiSchema }
        ]}
        path = {`/api/dataStore/ugx_elmis/data` }
        setupPath = { `/api/dataStore/ugx_elmis/products`}
        footer= {``} 
        appName = { `elmis`}
        appDataStore ={ `alkuistore`}
        appSetupStore ={ `metadata`}  
      /> 
          
  );
};

export default CommodityList;
