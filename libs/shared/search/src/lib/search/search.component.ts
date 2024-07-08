import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  @ViewChild('input') input?: ElementRef<HTMLInputElement>;

  console(s: string) {
    console.log(s);
  }
}
