import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-hourly',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hourly.component.html',
  styleUrl: './hourly.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HourlyComponent {}
