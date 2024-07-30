import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStateService } from '@test-app-2-remake/weather/core';
import { map, tap } from 'rxjs';

@Component({
  selector: 'lib-daily',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyComponent {
  private readonly weatherStateService = inject(WeatherStateService);

  public readonly daily$ = this.weatherStateService.weatherDaily$;
  public readonly local$ = this.weatherStateService.weatherLocationName$;

}