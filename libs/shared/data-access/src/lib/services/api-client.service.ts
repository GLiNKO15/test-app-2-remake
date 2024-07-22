import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class ApiService {
  private readonly http = inject(HttpClient);

  get<T>(url: string, params: HttpParams):Observable<T> {
    return this.http.get<T>(url, {params:params});
  }
}
