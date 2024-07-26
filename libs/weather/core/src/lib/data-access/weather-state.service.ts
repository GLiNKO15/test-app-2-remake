import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { locationInterface } from './location.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherStateService {
  public readonly location$ = new BehaviorSubject<locationInterface>({
    lat: null,
    lon: null
  });

  public readonly searchString$ = new BehaviorSubject<string>('');

  public readonly weatherDaily$ = new BehaviorSubject<any[]>([]);

}