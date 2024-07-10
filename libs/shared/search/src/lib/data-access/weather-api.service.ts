import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  public location = new BehaviorSubject(0); // вынести в отдельный state service

  get weatherDaily$(): Observable<number> {
    //запрос на сервер => поток
    return of(1, 2, 3, 4, 5);
  }

  getHttpParams(obj: Record<string, string>): HttpParams {
    return new HttpParams({
      fromObject: {
        'appid': '010721642521f31b0fbc8c3831d45951'
      }
    }).appendAll(obj);
  }

}