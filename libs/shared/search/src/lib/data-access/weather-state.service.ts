import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';


type latLon = {
  lat: number | null,
  lon: number | null
}

@Injectable({
  providedIn: 'root'
})
export class WeatherStateService {
  public readonly location$ = new BehaviorSubject<latLon>({
    lat: null,
    lon: null
  });

  public readonly searchString$ = new BehaviorSubject<string>('');

  weatherDaily$ = new BehaviorSubject<any[]>([]);

  set setWeatherDaily$(a: Observable<any>) {
    this.weatherDaily$.next([...this.weatherDaily$.value, a]);
  }
}