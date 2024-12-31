import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  toggleTheme() {
    this.isDarkTheme.next(!this.isDarkTheme.value);
    this.updateTheme();
  }

  private updateTheme() {
    document.documentElement.classList.toggle('dark', this.isDarkTheme.value);
  }
}
