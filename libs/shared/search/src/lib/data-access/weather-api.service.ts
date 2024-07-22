import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { API_DATA_URL, API_GEO_URL, ApiService } from '@test-app-2-remake/data-access';
import { WeatherStateService } from './weather-state.service';

type latLon = {
  lat: number | null,
  lon: number | null
}

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private readonly ApiGeoUrl = inject(API_GEO_URL);
  private readonly ApiDataUrl = inject(API_DATA_URL);
  private readonly ApiService = inject(ApiService);
  private readonly WeatherStateService = inject(WeatherStateService);

  weatherDaily$(): Observable<any> {
    if (this.WeatherStateService.location$.value.lon && this.WeatherStateService.location$.value.lat) {
      const httpParams = this.getHttpParams({
        lat: this.WeatherStateService.location$.value.lat.toString(),
        lon: this.WeatherStateService.location$.value.lon.toString(),
        exclude: 'current,minutely,hourly,alerts'
      });

      this.WeatherStateService.setWeatherDaily$ =
        this.ApiService.get<string>(this.ApiDataUrl, httpParams).pipe(
          tap((data) => {
            console.log(data);
          })
        );
    }
    return of('Error: no geo :`(');
  }

  getWeatherGeoData(name: string) {
    const httpParams = this.getHttpParams({
      q: name,
      limit: '1'
    });

    return this.ApiService.get<latLon[]>(this.ApiGeoUrl, httpParams).pipe(
      tap((data) => {
        if (data.length < 1) throw ('нету');
      }),
      tap((data) => this.WeatherStateService.location$.next({
        lat: data[0]?.lat,
        lon: data[0]?.lon
      })),
      tap(()=> {this.weatherDaily$()}),
      map(() => of(EMPTY)),
      catchError((err) => {
        console.log(err);
        return of(err);
      })
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