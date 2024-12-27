import { Routes } from '@angular/router';
import { SheetListComponent } from './features/sheets/sheet-list/sheet-list.component';
import { SheetDetailComponent } from './features/sheets/sheet-detail/sheet-detail.component';
import { OrganizationListComponent } from './features/organizations/organization-list/organization-list.component';
import { OrganizationDetailComponent } from './features/organizations/organization-detail/organization-detail.component';

export const routes: Routes = [
  {
    path: 'sheets/:id',
    component: SheetDetailComponent,
  },
  {
    path: 'sheets',
    component: SheetListComponent,
  },
  { path: 'organizations/:id', component: OrganizationDetailComponent },
  { path: 'organizations', component: OrganizationListComponent },
  {
    path: '',
    redirectTo: 'sheets',
    pathMatch: 'full',
  },
];
