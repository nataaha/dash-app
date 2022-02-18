import React from 'react';
import join from 'lodash/join';
import AppRoutes from './Routes'; //default
import {
  UserContext,
  useFetchApi,
  useConfig,
} from '@alkuip/core';
import { 
  getOrgUnitsWithoutGroup,
  isGroupValid,
  userIsSuperAdmin,
} from '@alkuip/dhis2';
import isEmpty from 'lodash/isEmpty';

const App = ( props ) => {
  const { baseUrl,headers } = useConfig();
  const { data:user } = useFetchApi(`${baseUrl}/api/me?paging=false&fields=id,displayName,phoneNumber,email,userCredentials[username,userRoles[id,name]],userGroups[id,name,code],authorities,organisationUnits[id],dataViewOrganisationUnits[id]`,headers,false);
  const ous = user?.organisationUnits?.map((i)=>i?.id);
  const ousView = user?.dataViewOrganisationUnits?.map((i)=>i?.id);
  let access = { 
    'dataEntry': [],
    'dataView': [],
    dataEntryLoading: false,
    dataViewLoading:false 
  };
  const entryUrl = !isEmpty(ous)?`${ baseUrl }/api/organisationUnits?paging=false&fields=id,path,ancestors[id,name],organisationUnitGroups[id,code,name],programs[id,name]&filter=ancestors.id:in:[${join(ous,',')}]&filter=id:in:[${join(ous,',')}]&rootJunction=OR`:null;
  const viewUrl = !isEmpty(ousView)?`${ baseUrl }/api/organisationUnits?paging=false&fields=id,path,ancestors[id,name],organisationUnitGroups[id,code,name],programs[id,name]&filter=ancestors.id:in:[${join(ousView,',')}]&filter=id:in:[${join(ousView,',')}]&rootJunction=OR`:null;
  const { data: entryData } = useFetchApi(entryUrl,headers,false);
  const { data: viewData } = useFetchApi(viewUrl,headers,false);
  // From User, get user props and check for restricted access group and create a flag on User Context
  
  const restrictedAccess = (isGroupValid(user?.userGroups,'specialforces','code') || isGroupValid(user?.userGroups,'special_forces','code')) ;
  const isAppAdmin = (isGroupValid(user?.userGroups,'ELMIS_ADMIN','code') || isGroupValid(user?.userGroups,'ELMISADMIN','code'));
  const isSuperAdmin = userIsSuperAdmin(user);
  console.log('Loaded Data/View Access');         
  access = { 
    'dataEntry': entryData?.organisationUnits,
    'dataView': viewData?.organisationUnits,
    'dataEntryLoading': !entryData ,
    'dataViewLoading': !viewData 
  };
  // Filter all orgunits if you dont belong to restricted group
  if(!restrictedAccess){
    const hasEntryAccess= getOrgUnitsWithoutGroup(entryData?.organisationUnits,'specialforces','organisationUnitGroups','code');
    const hasViewAccess= getOrgUnitsWithoutGroup(viewData?.organisationUnits,'specialforces','organisationUnitGroups','code');
    access.dataEntry = hasEntryAccess;
    access.dataView = hasViewAccess;
  }
  const loggedInUser = {
    userDetails: user,
    user: {
      id: user?.id,
      displayName: user?.displayName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      username: user?.userCredentials?.username
    },
    d2: props.d2,
    access: access,
    restrictedAccess: {
      enabled:restrictedAccess,
      locationGroup: 'specialforces'
    },
    permissions:{
      appAdmin: isAppAdmin, 
      superAdmin: isSuperAdmin
    },
    viewAccess:ousView,
    createAccess:ous
  }
  return ( 
    <UserContext.Provider value= {loggedInUser}>
      <AppRoutes {...props} />
    </UserContext.Provider>
  );
}
export default App;
