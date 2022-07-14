import { HisViewWrapper } from '@alkuip/jsonforms';

export const CommodityList = (props) => {
  return ( 
 
      <HisViewWrapper
        {...props}
        path = {`/api/dataStore/ugx_elmis/data` }
        setupPath = { `/api/dataStore/ugx_elmis/products`}
        footer= {``} 
        appName = { `elmis`}
        appDataStore ={ `alkuistore`}
        appSetupStore ={ `metadata`}
        useDhis2Import = { true }
      /> 
          
  );
};

export default CommodityList;
