import { isPlatformBrowser, NgFor } from '@angular/common';
import {
  Component,
  DestroyRef,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { ApiService } from '../../services/api.service';
import { OrganizationService } from '../../../features/organizations/services/organization.service';
import { SheetService } from '../../../features/sheets/services/sheet.service';
import { ThemeService } from '../../themes/theme.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, RouterLink, NgFor], // Import only what's needed
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly router: Router = inject(Router);
  private isBrowser: boolean;

  organizationsEndpoint!: string;
  sheetEndpoint!: string;
  entities: { name: string; url: string }[] = [];

  private readonly themeKey = 'theme';
  toggleBtnText!: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiService: ApiService,
    private organizationService: OrganizationService,
    private sheetService: SheetService,
    private themeService: ThemeService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.organizationsEndpoint = this.apiService.organizationEndpoint;
    this.sheetEndpoint = this.apiService.sheetEndpoint;
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const savedTheme =
        (localStorage.getItem(this.themeKey) as 'light' | 'dark') || 'light';
      this.themeService.setTheme(savedTheme);
      this.toggleBtnText = `${savedTheme === 'light' ? 'dark' : 'light'}_mode`;
    }
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

  toggleTheme(): void {
    const currentTheme = this.themeService.getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.toggleBtnText = `${currentTheme}_mode`;
    this.themeService.setTheme(newTheme);
    localStorage.setItem(this.themeKey, newTheme);
  }
}
