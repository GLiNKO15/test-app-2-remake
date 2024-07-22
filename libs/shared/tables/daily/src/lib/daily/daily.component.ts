import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherApiService, WeatherStateService } from '@test-app-2-remake/search';
import { combineLatestAll, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'lib-daily',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyComponent {
  private readonly WeatherApiService = inject(WeatherApiService);
  private readonly WeatherStateService = inject(WeatherStateService);

  daily$ = this.WeatherStateService.weatherDaily$.pipe(
    combineLatestAll(),
    switchMap((s) => s),

    tap((s) => {
      console.log(s);
    })
  );

}