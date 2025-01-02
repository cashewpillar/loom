import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkTheme = new BehaviorSubject<boolean>(true); // Default to dark.. see index.html > html.dark
  isDarkTheme$ = this.isDarkTheme.asObservable();

  themes: Record<string, string> = {
    dark: 'dark_mode',
    light: 'light_mode',
    system: 'settings',
  };

  // default to black
  activeTheme = new BehaviorSubject<string>(Object.keys(this.themes)[0]);

  toggleTheme() {
    this.isDarkTheme.next(!this.isDarkTheme.value);
    this.updateTheme();
  }

  private updateTheme() {
    document.documentElement.classList.toggle('dark', this.isDarkTheme.value);
  }
}
