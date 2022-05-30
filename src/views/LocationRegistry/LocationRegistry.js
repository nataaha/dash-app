import React from 'react';
import { 
  LocationUiSchema,
  LocationSchema,
} from '@alkuip/schemas';
import { HisViewWrapper } from '@alkuip/jsonforms';

const locationSchema = LocationSchema;
const locationUiSchema = LocationUiSchema;
const LocationRegistry = (props) => {
  return (
    <HisViewWrapper 
      {...props }
      formSchema={ locationSchema } 
      uiSchema = { locationUiSchema }
      path = {`/api/dataStore/ugx_location/data` }
      footer= {``}        
      uischemas ={
        [
          { action: 'dashboard',uischema: locationUiSchema},
          { action: 'add',uischema:undefined },
        ]
      }
      appName = { `location`}
      appDataStore ={ `location`}
      appSetupStore ={ `location`}       
    /> 
);            
}
export default LocationRegistry;
