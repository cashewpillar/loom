import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SheetService } from '../services/sheet.service';
import { Sheet } from '../types/sheet';
import { createAngularTable, getCoreRowModel } from '@tanstack/angular-table';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-sheet-detail',
  imports: [NgIf, JsonPipe, NgFor],
  templateUrl: './sheet-detail.component.html',
  styleUrls: ['./sheet-detail.component.scss'],
})
export class SheetDetailComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly sheetService: SheetService = inject(SheetService);

  sheet!: Sheet;
  rows!: any[]; // TODO: fix type

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (params: ParamMap) => {
          this.handleRouteChange(
            parseInt(params.get('organizationId')!, 10),
            parseInt(params.get('sheetId')!, 10)
          );
        },
      });
  }

  private handleRouteChange(organizationId: number, sheetId: number) {
    this.sheetService
      .getSheetById(organizationId, sheetId)
      .subscribe((sheet) => {
        this.sheet = sheet;
      });

    this.sheetService
      .getRowsBySheetId(organizationId, sheetId)
      .subscribe((rows) => {
        this.rows = rows;
      });
  }
}
