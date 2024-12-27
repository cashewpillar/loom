import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-organization-list',
  imports: [NgFor, RouterModule],
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent {
  organizations = [
    { id: 1, name: 'Organization 1' },
    { id: 2, name: 'Organization 2' },
    { id: 3, name: 'Organization 3' },
  ];

  trackById(index: number, item: any): number {
    return item.id;
  }
}
