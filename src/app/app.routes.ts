import { Routes } from '@angular/router';
import { SheetListComponent } from './features/sheets/sheet-list/sheet-list.component';
import { SheetDetailComponent } from './features/sheets/sheet-detail/sheet-detail.component';
import { OrganizationListComponent } from './features/organizations/organization-list/organization-list.component';
import { OrganizationDetailComponent } from './features/organizations/organization-detail/organization-detail.component';

export const routes: Routes = [
  {
    path: 'organizations/:organizationId/sheets/:sheetId',
    component: SheetDetailComponent,
  },
  { path: 'organizations/:id', component: OrganizationDetailComponent },
  { path: 'organizations', component: OrganizationListComponent },
  {
    path: '',
    redirectTo: 'organizations',
    pathMatch: 'full',
  },
];
