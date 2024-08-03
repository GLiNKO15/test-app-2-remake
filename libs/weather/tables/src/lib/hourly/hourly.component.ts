import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WeatherStateService } from '@test-app-2-remake/weather/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { TemperaturePipe } from '../../../ui/temperature.pipe';

@Component({
  selector: 'lib-hourly',
  standalone: true,
  templateUrl: './hourly.component.html',
  styleUrl: './hourly.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    NgForOf,
    TemperaturePipe
  ]
})
export class HourlyComponent {
  private readonly weatherStateService = inject(WeatherStateService);

  public readonly hourly$ = this.weatherStateService.weatherHourly$;
  public readonly local$ = this.weatherStateService.weatherLocationName$;
}
