import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganizationService } from '../services/organization.service';
import { Organization } from '../types/organization';

@Component({
  selector: 'app-organization-list',
  imports: [NgFor, RouterModule],
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent {
  organizations: Organization[] = [];

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.organizationService.getOrganizations().subscribe((organizations) => {
      this.organizations = organizations;
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
