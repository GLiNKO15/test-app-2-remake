import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { WeatherApiService } from '../data-access/weather-api.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  @ViewChild('input') input?: ElementRef<HTMLInputElement>;
  weatherApi = inject(WeatherApiService);
  router = inject(Router);

  index = 0;
  search(str: string){
    this.weatherApi.location.next(this.index++);
  }

  select(value: Event){
    const inputElement = value.target as HTMLInputElement;
    this.router.navigate([inputElement.value]);
  }
}
