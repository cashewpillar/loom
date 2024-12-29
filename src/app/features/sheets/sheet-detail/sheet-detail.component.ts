import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SheetService } from '../services/sheet.service';
import { Sheet } from '../types/sheet';
import { createAngularTable, getCoreRowModel } from '@tanstack/angular-table';

@Component({
  selector: 'app-sheet-detail',
  imports: [NgIf],
  templateUrl: './sheet-detail.component.html',
  styleUrls: ['./sheet-detail.component.scss'],
})
export class SheetDetailComponent implements OnInit {
  sheetId: number | null = null;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly sheetService: SheetService = inject(SheetService);

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (parameterMap: ParamMap) => {
          const id = parameterMap.get('id');
          if (id !== null && id !== undefined) {
            this.handleRouteChange(id);
          }
        },
      });
  }

  private handleRouteChange(id: string) {
    this.sheetId = Number(id);
  }
}
