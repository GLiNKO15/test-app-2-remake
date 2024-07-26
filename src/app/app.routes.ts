import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'hourly',
        loadComponent: () =>
          import('@test-app-2-remake/tables').then(
            (c) => c.HourlyComponent
          ),
      },
      {
        path: 'daily',
        loadComponent: () =>
          import('@test-app-2-remake/tables').then(
            (c) => c.DailyComponent
          ),
      }
    ]
  }
];
