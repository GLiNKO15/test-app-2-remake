import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { API_DATA_URL, API_GEO_URL } from '@test-app-2-remake/weather/core';
import { ApiService } from '@test-app-2-remake/data-access';
import { WeatherStateService } from './weather-state.service';
import { locationInterface } from './location.interface';
import { dailyInterface } from './daily.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private readonly ApiGeoUrl = inject(API_GEO_URL);
  private readonly ApiDataUrl = inject(API_DATA_URL);
  private readonly ApiService = inject(ApiService);
  private readonly WeatherStateService = inject(WeatherStateService);

  weatherDaily$(): Observable<dailyInterface['daily'] | string> {
    if (this.WeatherStateService.location$.value.lon && this.WeatherStateService.location$.value.lat) {
      const httpParams = this.getHttpParams({
        lat: this.WeatherStateService.location$.value.lat.toString(),
        lon: this.WeatherStateService.location$.value.lon.toString(),
        exclude: 'current,minutely,hourly,alerts'
      });

      return this.ApiService.get<dailyInterface>(this.ApiDataUrl, httpParams).pipe(
        map((dailyInfo) => dailyInfo.daily)
      );
    }
    return of('Error: no geo :`(');
  }

  getWeatherGeoData(name: string): Observable<string | null> {
    const httpParams = this.getHttpParams({
      q: name,
      limit: '1'
    });
    if (!name.length) {
      return of(null);
    }
    return this.ApiService.get<locationInterface[]>(this.ApiGeoUrl, httpParams).pipe(
      tap((data) => {
        if (data.length < 1) throw ('Такого места не найдено!');
      }),
      tap((data) => this.WeatherStateService.location$.next({
        lat: data[0]?.lat,
        lon: data[0]?.lon
      })),
      switchMap(() => this.weatherDaily$()),
      tap((daily) => {
        this.WeatherStateService.weatherDaily$.next(
          [...this.WeatherStateService.weatherDaily$.value, daily]
        );
      }),
      map(() => null),
      catchError((err) => of(err))
    );
  }

  getHttpParams(obj: Record<string, string>): HttpParams {
    return new HttpParams({
      fromObject: {
        'appid': '010721642521f31b0fbc8c3831d45951'
      }
    }).appendAll(obj);
  }

}