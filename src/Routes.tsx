import { createHashRouter } from 'react-router-dom';
import {
  NotFound as SuspenseNotFoundView,
  AppWebView as SuspenseAppWebView,
  AppWebViewHome,
  SignInPage,
  RecoverAccountPage,
  LoginUiPage,
  AdminLayout,
  LoginLayout,
  useUiSchemaLoader,
  useUiPageLoader,
} from '@alkuip/jsonforms';
import type { RouteObject } from "react-router-dom";
import { Key, ReactNode } from 'react';
import { useAppLoader } from './useAppLoader';
import { queryClient } from '@alkuip/core';

export type MenuRouteItem = {
  label: ReactNode;
  key?: Key;
  icon?: ReactNode;
  layout?: string;
};

export const routes: RouteObject[]=[
      {
        path: "/",
        element: <AdminLayout/>,
        loader: useAppLoader,
        errorElement: <SuspenseNotFoundView/>,
        children:[
          {
            index: true,
            loader: useUiSchemaLoader({queryClient}),
            element: <AppWebViewHome/>
          },
          {
            path: ':appName?',
            loader: useUiPageLoader({queryClient}),
            element: <SuspenseAppWebView/>
          },
          {
            path: ':appName?/:id',
            loader: useUiPageLoader({queryClient}),
            element: <SuspenseAppWebView/>
          },
          {
            path: ':appName?/*',
            loader: useUiPageLoader({queryClient}),
            element: <SuspenseAppWebView/>
          },
        ]
      },
      {
        path: "/login", 
        loader: useAppLoader,
        element: <LoginLayout/>,
      },
      {
        path: "/signup", 
        loader: useAppLoader,
        element: <SignInPage/>
      },
      {
        path: "/authManager",
        loader: useAppLoader,
        element: <RecoverAccountPage/>
      },
      {
        path: "/auth-callback",
        loader: useAppLoader,
        element: <LoginUiPage/>
      },
      {
        path: '*',
        element: <SuspenseNotFoundView/>
      }
    ]

export const router: any= createHashRouter(routes);




