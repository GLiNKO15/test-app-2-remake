import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherApiService } from '@test-app-2-remake/search';
import { tap } from 'rxjs';

@Component({
  selector: 'lib-daily',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyComponent {
  weatherApi = inject(WeatherApiService);
  changeDetector = inject(ChangeDetectorRef);
  daily$ = this.weatherApi.weatherDaily$;

  location = this.weatherApi.location.pipe(
    tap(()=>{ this.daily$ = this.weatherApi.weatherDaily$ }),
    tap(()=>{this.changeDetector.markForCheck()}),
  ).subscribe(); // да тут опять подписка)


}
