import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Organization } from '../types/organization';
import { OrganizationService } from '../services/organization.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Sheet } from '../../sheets/types/sheet';
import { SheetService } from '../../sheets/services/sheet.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-organization-detail',
  imports: [NgFor, RouterModule],
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss'],
})
export class OrganizationDetailComponent {
  private readonly destroyRef = inject(DestroyRef);

  organizationId: number = 0;
  organization: Organization = { id: 0, name: '' };
  sheets: Sheet[] = [];

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private sheetService: SheetService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.organizationId = +params['id'];
      this.organizationService
        .getOrganizationById(this.organizationId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((organization) => {
          this.organization = organization;
        });
      this.sheetService
        .getSheetsByOrganizationId(this.organizationId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((sheets) => {
          this.sheets = sheets;
        });
    });
  }
}
