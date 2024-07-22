import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { WeatherApiService } from '../data-access/weather-api.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { WeatherStateService } from '../data-access/weather-state.service';


@Component({
  selector: 'search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  WeatherApiService = inject(WeatherApiService);
  WeatherStateService = inject(WeatherStateService);
  router = inject(Router);

  searchError = this.WeatherStateService.searchString$.pipe(
    switchMap((s: string) => this.WeatherApiService.getWeatherGeoData(s)),
    tap((s)=>{
      console.log(s);}),
    catchError((err) => {
      console.log(err);
      return of(err)
    })
  );

  search(str: string) {
    if(str.length > 2) this.WeatherStateService.searchString$.next(str);
  }

  select(value: Event) {
    const inputElement = value.target as HTMLInputElement;
    this.router.navigate([inputElement.value]);
  }
}
