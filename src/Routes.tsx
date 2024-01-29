import { createBrowserRouter } from 'react-router-dom';
import {
  NotFound as SuspenseNotFoundView,
  AppWebView as SuspenseAppWebView,
  SignInPage,
  RecoverAccountPage,
  LoginUiPage,
  AdminLayout,
  LoginLayout,
} from '@alkuip/jsonforms';
import type { RouteObject } from "react-router-dom";
import { Key, ReactNode } from 'react';
import { useMenuLoader } from './useMenuLoader';

export type MenuRouteItem = {
  label: ReactNode;
  key?: Key;
  icon?: ReactNode;
  layout?: string;
};
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AdminLayout/>,
    loader: useMenuLoader,
    errorElement: <SuspenseNotFoundView/>,
    children:[
      {
        index: true,
        element: <SuspenseAppWebView/>
      },
      {
        path: ':appName?',
        element: <SuspenseAppWebView/>
      },
      {
        path: ':appName?/:id',
        element: <SuspenseAppWebView/>
      },
      {
        path: ':appName?/*',
        element: <SuspenseAppWebView/>
      },
    ]
  },
  {
    path: "/login", 
    loader: useMenuLoader,
    element: <LoginLayout/>,
  },
  {
    path: "/signup", 
    loader: useMenuLoader,
    element: <SignInPage/>
  },
  {
    path: "/authManager",
    loader: useMenuLoader,
    element: <RecoverAccountPage/>
  },
  {
    path: "/auth-callback",
    loader: useMenuLoader,
    element: <LoginUiPage/>
  },
  {
    path: "/*",
    element: <AdminLayout/>,
    loader: useMenuLoader,
    errorElement: <SuspenseNotFoundView/>,
    
  },
  {
    path: '*',
    element: <SuspenseNotFoundView/>
  }
];


export const router: any= createBrowserRouter(routes);

