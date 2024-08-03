import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'temperaturePipe',
  pure: true
})

export class TemperaturePipe implements PipeTransform {
  transform(value: number): string {
    return Math.round(value - 273.15) + '°';
  }
}