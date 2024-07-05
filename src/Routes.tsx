import { createHashRouter } from 'react-router-dom';
import {
  NotFound as SuspenseNotFoundView,
  AppWebView as SuspenseAppWebView,
  SignInPage,
  RecoverAccountPage,
  AdminLayout,
  useUiPageLoader,
  LoginUiPage,
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
            loader: useUiPageLoader({queryClient}),
            element: <SuspenseAppWebView/>
          },
          {
            path: "login", 
            element: <LoginUiPage/>,
          },
          {
            path: "auth-callback",
            element: <LoginUiPage/>
          },
          {
            path: "signup", 
            element: <SignInPage/>
          },
          {
            path: "authManager",
            element: <RecoverAccountPage/>
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
        path: '*',
        loader: useAppLoader,
        element: <SuspenseNotFoundView/>
      }
    ]

export const router: any= createHashRouter(routes);




