import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { environment } from '../environments/environment';
import { API_DATA_URL, API_GEO_URL } from '@test-app-2-remake/weather/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
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
