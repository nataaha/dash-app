import {
  Dashboard as DashboardView,
  NotFound as NotFoundView,
  Accreditation as AccreditationView,
} from './views';
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
        path: '/:appName/:id',
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
