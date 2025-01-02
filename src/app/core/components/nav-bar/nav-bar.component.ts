import { NgFor } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { ApiService } from '../../services/api.service';
import { OrganizationService } from '../../../features/organizations/services/organization.service';
import { SheetService } from '../../../features/sheets/services/sheet.service';
import { ThemeService } from '../../themes/theme.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, RouterLink, NgFor], // Import only what's needed
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly router: Router = inject(Router);

  entities: { name: string; url: string }[] = [];

  system: string = 'settings';
  dark: string = 'dark_mode';
  light: string = 'light_mode';

  toggleBtnText!: string;
  organizationsEndpoint!: string;
  sheetEndpoint!: string;

  themes!: Record<string, string>;

  constructor(
    private apiService: ApiService,
    private organizationService: OrganizationService,
    private sheetService: SheetService,
    private themeService: ThemeService
  ) {
    this.organizationsEndpoint = this.apiService.organizationEndpoint;
    this.sheetEndpoint = this.apiService.sheetEndpoint;
    this.toggleBtnText = this.themeService.isDarkTheme.value
      ? this.light
      : this.dark;
    this.themes = this.themeService.themes;
  }

  ngOnInit(): void {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    fromEvent(prefersDark, 'change').subscribe(() => {
      this.toggleTheme();
    });
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          const urlParts = event.urlAfterRedirects.split('/').filter(Boolean);
          if (!urlParts.length) {
            return;
          }

          if (
            urlParts.length == 1 &&
            urlParts[0] == this.organizationsEndpoint
          ) {
            this.entities = [
              { name: urlParts[0], url: event.urlAfterRedirects },
            ];
          }

          if (urlParts.length >= 2) {
            this.organizationService
              .getOrganizationById(parseInt(urlParts[1], 10))
              .subscribe({
                next: (organization) => {
                  this.entities = [
                    {
                      name: organization.name,
                      url: `${this.organizationsEndpoint}/${organization.id}`,
                    },
                    {
                      name: this.sheetEndpoint,
                      url: event.urlAfterRedirects,
                    },
                  ];
                },
              });
          }

          if (urlParts.length == 4 && urlParts[2] == this.sheetEndpoint) {
            this.sheetService
              .getSheetById(
                parseInt(urlParts[1], 10),
                parseInt(urlParts[3], 10)
              )
              .subscribe({
                next: (sheet) => {
                  this.entities[1] = {
                    name: sheet.name,
                    url: event.urlAfterRedirects,
                  };
                },
              });
          }
        }
      },
    });
  }

  toggleTheme() {
    // dark > light > system
    this.themeService.toggleTheme();
    // this.toggleBtnText =
    //   this.toggleBtnText == this.light ? this.dark : this.light;
    switch (this.toggleBtnText) {
      case this.themes['dark']:
        this.toggleBtnText = this.themes['light'];
        localStorage.setItem('theme', Object.keys(this.themes)[1]);
        break;
      case this.themes['system']:
        this.toggleBtnText = this.themes['system'];
        localStorage.setItem('theme', Object.keys(this.themes)[2]);
        break;
      case this.themes['light']:
        this.toggleBtnText = this.themes['dark'];
        localStorage.setItem('theme', Object.keys(this.themes)[0]);
        break;
    }
  }
}
