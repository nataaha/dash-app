import { 
  EidsrUiSchema,
  EidsrSchema,
} from '@alkuip/schemas';
import { HisViewWrapper } from '@alkuip/jsonforms';

const idsrSchema = EidsrSchema;
const idsrUiSchema = EidsrUiSchema;
const EidsrList = (props) => {
  return (
      <HisViewWrapper 
        {...props }
        formSchema={ idsrSchema } 
        uiSchema = { idsrUiSchema }
        path = {`/api/dataStore/ugx_eidsr/data` }
        footer= {``}        
        uischemas ={
          [
            { action: 'dashboard',uischema: idsrUiSchema},
            { action: 'add',uischema:idsrUiSchema },
          ]
        }
        appName = { `eidsr`}
        appDataStore ={ `eidsr`}
        appSetupStore ={ `eidsr`}       
      /> 
  );            
}
export default EidsrList;
