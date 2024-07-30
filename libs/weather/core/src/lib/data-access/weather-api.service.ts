import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { API_DATA_URL, API_GEO_URL } from '@test-app-2-remake/weather/core';
import { ApiService } from '@test-app-2-remake/data-access';
import { WeatherStateService } from './weather-state.service';
import { locationNameInterface } from './location.interface';
import { dailyInterface } from './daily.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private readonly apiGeoUrl = inject(API_GEO_URL);
  private readonly apiDataUrl = inject(API_DATA_URL);
  private readonly apiService = inject(ApiService);
  private readonly weatherStateService = inject(WeatherStateService);

  weatherDaily$(): Observable<dailyInterface['daily'] | string> {
    if (this.weatherStateService.location$.value.lon && this.weatherStateService.location$.value.lat) {
      const httpParams = this.getHttpParams({
        lat: this.weatherStateService.location$.value.lat.toString(),
        lon: this.weatherStateService.location$.value.lon.toString(),
        exclude: 'current,minutely,hourly,alerts'
      });

      return this.apiService.get<dailyInterface>(this.apiDataUrl, httpParams).pipe(
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

    return this.apiService.get<locationNameInterface[]>(this.apiGeoUrl, httpParams).pipe(
      tap((data) => {
        if (data.length < 1) throw ('Такого места не найдено!');
      }),
      tap((data) => this.weatherStateService.location$.next({
        lat: data[0]?.lat,
        lon: data[0]?.lon
      })),
      tap((data) => this.weatherStateService.weatherLocationName$.next(
        [...this.weatherStateService.weatherLocationName$.value, data[0].name]
      )),
      switchMap(() => this.weatherDaily$()),
      tap((daily) => {
        if (typeof (daily) === 'string') {
          throw (daily);
        } else {
          this.weatherStateService.weatherDaily$.next(
            [...this.weatherStateService.weatherDaily$.value, daily]
          );
        }
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