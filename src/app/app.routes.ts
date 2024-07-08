import { Route } from '@angular/router';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'hourly',
        loadComponent: () =>
          import('@test-app-2-remake/hourly').then(
            (c) => c.HourlyComponent
          ),
      },
      {
        path: 'daily',
        loadComponent: () =>
          import('@test-app-2-remake/daily').then(
            (c) => c.DailyComponent
          ),
      }
    ]
  }
];
