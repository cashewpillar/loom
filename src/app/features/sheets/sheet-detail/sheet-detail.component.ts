import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sheet-detail',
  imports: [NgIf],
  templateUrl: './sheet-detail.component.html',
  styleUrls: ['./sheet-detail.component.scss'],
})
export class SheetDetailComponent {
  test = 1;
  sheetId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the sheet ID from the route
    this.sheetId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
