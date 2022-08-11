import { HisViewWrapper } from '@alkuip/jsonforms';

export const Accreditation = (props) => {
  return ( 
      <HisViewWrapper 
        {...props}
        footer= {``}
        appDataStore ={ `alkuistore`}
        appSetupStore ={ `alkuistore`}
        isDefaultUiSchema = { false }  

      />          
  );
};
export default Accreditation;
