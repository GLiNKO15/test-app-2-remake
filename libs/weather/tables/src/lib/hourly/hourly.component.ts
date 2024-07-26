import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-hourly',
  standalone: true,
  templateUrl: './hourly.component.html',
  styleUrl: './hourly.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HourlyComponent {}
