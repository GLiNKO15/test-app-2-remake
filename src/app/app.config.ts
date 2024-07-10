import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { API_DATA_URL, API_GEO_URL } from '@test-app-2-remake/data-access';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    {
      provide: API_DATA_URL,
      useValue: environment.api_data_url
    },
    {
      provide: API_GEO_URL,
      useValue: environment.api_geo_url
    }
  ],
};
