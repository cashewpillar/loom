import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sheet-list',
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './sheet-list.component.html',
  styleUrls: ['./sheet-list.component.scss'],
})
export class SheetListComponent {
  sheets = [
    { id: 1, name: 'Mentors', organizationId: 1 },
    { id: 2, name: 'Mentees', organizationId: 1 },
    { id: 3, name: 'Sessions', organizationId: 1 },
  ];

  trackById(index: number, sheet: any): number {
    return sheet.id;
  }
}
