import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStateService } from '@test-app-2-remake/weather/core';

@Component({
  selector: 'lib-daily',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyComponent {
  private readonly WeatherStateService = inject(WeatherStateService);

  public readonly daily$ = this.WeatherStateService.weatherDaily$;

}