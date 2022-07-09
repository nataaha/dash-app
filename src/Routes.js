import React from 'react';
import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  CommodityList as CommodityListView,
  EidsrList as EidsrListView,
  Account as AccountView,
  Settings as SettingsView,
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

export const routes = [
  {
    path: '/',
    component: DashboardView,
    children:[
      {
        path: '/:appName',
        component: AccreditationView
      },
      {
        path: '/:appName/*',
        component: AccreditationView
      }
    ]
  },
  {
    path: '/dashboard',
    component: DashboardView
  },
  {
    path: '*',
    component: NotFoundView,
    layout: 'minimal'
  }
];
