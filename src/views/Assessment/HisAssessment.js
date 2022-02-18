import React from 'react';
import { 
  HisSociSchema,
  HisSociUiSchema, 
  HisSociDashboardUiSchema,
} from '@alkuip/schemas';
import { 
  ElmisUiSchemaContext,
} from '@alkuip/core';
import { HisViewWrapper } from '@alkuip/jsonforms';

const schema = HisSociSchema;
const uiSchema = HisSociUiSchema;

export const HisAssessment = (props) => {
  return ( 
    <ElmisUiSchemaContext.Provider value = { { ui: uiSchema,custom: undefined } }>
      <HisViewWrapper 
        {...props}
        formSchema={ schema } 
        uiSchema = { uiSchema }
        path = {`/api/dataStore/ugx_assessment/assessments` }
        footer= {`
        This web-based version of HIS Stages of Continuous Improvement  Tool was created using source code/user guides developed with the support of the MEASURE Evaluation project at the University of North Carolina at Chapel Hill, and was funded by the U.S. Agency for International Development (USAID) under the terms of MEASURE Evaluation cooperative agreement AID-OAA-L-14-00004. The original tool can be found at: https://www.measureevaluation.org/his-strengthening-resource-center/his-stages-of-continuous-improvement-toolkit/his-stages-of-continuous-improvement-toolkit. Views expressed are not necessarily those of USAID or the United States government.	
        `}
        uischemas ={
          [
            { type: 'setup',uischema:uiSchema },
            { type: 'dashboard',uischema: HisSociDashboardUiSchema},
            { type: 'add',uischema:uiSchema },
          ]
        }
        appName = { `HisSOCI`}
        appDataStore ={ `hissoci`}
        appSetupStore ={ `hissoci`}  

      /> 
    </ElmisUiSchemaContext.Provider>             
  );
};
export default HisAssessment;
