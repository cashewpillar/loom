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

  organizationsEndpoint: string;
  sheetEndpoint: string;

  constructor(
    private apiService: ApiService,
    private organizationService: OrganizationService,
    private sheetService: SheetService
  ) {
    this.organizationsEndpoint = this.apiService.organizationEndpoint;
    this.sheetEndpoint = this.apiService.sheetEndpoint;
  }

  ngOnInit(): void {
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
}
