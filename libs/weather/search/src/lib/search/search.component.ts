import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WeatherApiService, WeatherStateService } from '@test-app-2-remake/weather/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { switchMap } from 'rxjs';


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
  private readonly weatherApiService = inject(WeatherApiService);
  private readonly weatherStateService = inject(WeatherStateService);
  searchError = this.weatherStateService.searchString$.pipe(
    switchMap((s: string) => this.weatherApiService.getWeatherGeoData(s))
  );
  private readonly router = inject(Router);

  search(str: string) {
    if (str.length > 2) this.weatherStateService.searchString$.next(str);
  }

  select(value: Event) {
    const inputElement = value.target as HTMLInputElement;
    this.router.navigate([inputElement.value]);
  }
}
