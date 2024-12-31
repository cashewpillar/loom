import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkTheme = new BehaviorSubject<boolean>(true); // Default to dark.. see index.html > html.dark
  isDarkTheme$ = this.isDarkTheme.asObservable();

  toggleTheme() {
    this.isDarkTheme.next(!this.isDarkTheme.value);
    this.updateTheme();
  }

  private updateTheme() {
    document.documentElement.classList.toggle('dark', this.isDarkTheme.value);
  }
}
