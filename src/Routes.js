import React from 'react';
import map from 'lodash/map';
import { 
  RouteWithLayout,
  Main as MainLayout, 
  Minimal as MinimalLayout
} from '@alkuip/components';
import { 
  Route, 
  Routes 
} from 'react-router-dom';
import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  CommodityList as CommodityListView,
  EidsrList as EidsrListView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  LocationRegistry as LocationRegistryView,
  HisSetup as HisSetupView,
  HisAssessment as HisAssessView,
  Accreditation as AccreditationView,
  HisDocumentation
} from './views';
import { LogoutButton } from './LogOut';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Authenticated } from '@alkuip/core';

export const routes = [
  {
    path: '/assess/documentation',
    component: HisDocumentation,
    title: 'Documentation',
    href: '/assess/documentation',
    icon: <PeopleIcon />,
    isUser: true,
    isAdmin: true
  },
  {
    path: '/',
    component: DashboardView,
    isUser: true,
    isAdmin: true,
    children:[
      {
        path: '/:appName',
        component: HisAssessView,
        title: 'HIS SOCI Assessment',
        href: '/assess/dashboard',
        icon: <PeopleIcon />,
        isUser: true,
        isAdmin: true
      },
      {
        path: '/:appName/*',
        component: HisAssessView,
        title: 'HIS SOCI Assessment',
        href: '/assess/dashboard',
        icon: <PeopleIcon />,
        isUser: true,
        isAdmin: true
      }
    ]
  },
  {
    path: '/dashboard',
    component: DashboardView,
    title: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />,
    isUser: false
  },
  {
    path: '/assess/:id',
    component: HisAssessView
  },
  {
    path: '/assess/*',
    component: HisAssessView,
    title: 'HIS SOCI Assessment',
    href: '/assess/dashboard',
    icon: <PeopleIcon />,
    isUser: true,
    isAdmin: true
  },
  {
    path: '/setup/:id',
    component: HisSetupView
  },
  {
    path: '/setup/*',
    component: HisSetupView,
    title: 'Setup',
    href: '/setup/dashboard',
    icon: <PeopleIcon />,
    isUser: false,
    isAdmin: false
  },
  {
    path: '/location/:id',
    component: LocationRegistryView
  },
  {
    path: '/location/*',
    component: LocationRegistryView,
    title: 'Location Registry',
    href: '/location/dashboard',
    icon: <PeopleIcon />,
    isUser: false
  },
  {
    path: '/elmis/:id',
    component: CommodityListView
  },
  {
    path: '/elmis/*',
    component: CommodityListView,
    title: 'eLMIS',
    href: '/elmis/dashboard',
    icon: <ShoppingCartIcon />,
    isUser: false
  },
  {
    path: '/accreditation/:id',
    component:  AccreditationView
  },
  {
    path: '/accreditation/*',
    component: AccreditationView,
    title: 'Accreditation',
    href: '/accreditation/dashboard',
    icon: <PeopleIcon />,
    isUser: true,
    isAdmin: true
  },
  {
    path: '/users',
    component: UserListView,
    title: 'Users',
    href: '/users',
    icon: <PeopleIcon />
  },
  {
    path: '/products',
    component: ProductListView,
    title: 'Products',
    href: '/products',
    icon: <ShoppingCartIcon />
  },
  {
    path: '/eidsr',
    component: EidsrListView,
    title: 'eIDSR',
    href: '/eidsr',
    icon: <TextFieldsIcon />,
    isUser: false
  },
  {
    path: '/account',
    component: AccountView,
    href: '/account',
    title: 'Account',
    icon: <AccountBoxIcon />,
    isUser: false
  },
  {
    path: '/settings',
    component: SettingsView,
    href: '/settings',
    title: 'Settings',
    icon: <SettingsIcon />
  },

  {
    title: 'Resource APIs',
    type: 'external',
    href: '//engine.diteqafrica.com/api/lrs?dataType=json&serviceType=lrs',
    icon: <PeopleIcon />,
    isUser: false
  },
  {
    path: "/logout",
    component: LogoutButton,
    title: "Log Out",
    layout: 'minimal',
    isUser: false
  },
  {
    path: '*',
    component: NotFoundView,
    layout: 'minimal'
  }
];
const noAuthRequiredRoutes =[
  {
    path: '/signup',
    component: SignUpView,
    title: 'Sign Up',
    layout: 'minimal',
    icon: <AccountBoxIcon />,
    isUser: true
  },
  {
    path: '/login',
    component: SignInView,
    layout: 'minimal',
    title: 'Sign In',
    href: '/login',
    icon: <LockOpenIcon />,
    isUser: true
  }
];
export const AppPublicRoutes = ( props ) => {
  return (
    <Routes>
      {
        noAuthRequiredRoutes?.map((noRoute,ni)=>{
          return(
            <Route
              key= { `no-auth-${ni}` }
              path = { noRoute.path }
              element = { noRoute?.component??(<div></div>)}
            />
          )
        })
      }
    </Routes>
  )
}
const AppRoutes = ( props ) => {
  return (
    <Routes>
      {
        noAuthRequiredRoutes?.map((noRoute,ni)=>{
          return(
            <Route
              key= { `no-auth-${ni}` }
              path = { noRoute.path }
              element = { noRoute?.component??(<div></div>)}
            />
          )
        })
      }
      {
        map(routes,(route, i) => {
          return(
            <Route
              key={ `route-${i}`} 
              path = { route.path }
              element={
                    route.layout === 'minimal'?
                    (
                      <Authenticated>
                        <MinimalLayout {...props } routes={ routes } >
                          <RouteWithLayout
                            route = { route }
                            component = { route?.component??(<div></div>) }
                          />
                        </MinimalLayout>
                      </Authenticated>
                    ):
                    (
                      <Authenticated>
                        <MainLayout {...props} routes={ routes} >
                          <RouteWithLayout
                            route = { route }
                            component = { route?.component??(<div></div>) }
                          />
                        </MainLayout>
                      </Authenticated>
                    )
                  }
            />
           
          )
        })
      }
    </Routes>
  );
};

export default AppRoutes;
