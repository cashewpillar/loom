import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SheetService } from '../services/sheet.service';
import { Sheet } from '../types/sheet';
import {
  createAngularTable,
  createColumnHelper,
  FlexRenderDirective,
  getCoreRowModel,
} from '@tanstack/angular-table';
import { Schema } from '../types/schema';
import { forkJoin, switchMap } from 'rxjs';

// NOTE: might need to add more data types in the future
type InferType<T> = {
  [K in keyof T]: T[K] extends 'number'
    ? number
    : T[K] extends 'string'
    ? string
    : T[K] extends 'boolean'
    ? boolean
    : unknown;
};

@Component({
  selector: 'app-sheet-detail',
  imports: [FlexRenderDirective],
  templateUrl: './sheet-detail.component.html',
  styleUrls: ['./sheet-detail.component.scss'],
})
export class SheetDetailComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly sheetService: SheetService = inject(SheetService);

  sheet!: Sheet;
  schema!: Schema;

  rows = signal<any[]>([]);
  columnHelper!: any;
  defaultColumns!: any[];
  table!: any;

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        // don't need to worry about managing these subscriptions manually as: takeUntilDestroyed() handles the cleanup when the component is destroyed
        switchMap((params: ParamMap) => {
          // Used switchMap to handle route changes - this will automatically unsubscribe from previous observables when the route change
          const organizationId = parseInt(params.get('organizationId')!, 10);
          const sheetId = parseInt(params.get('sheetId')!, 10);

          // Used forkJoin to combine all three API calls into a single subscription - this ensures all data is available before initializing the table
          return forkJoin({
            sheet: this.sheetService.getSheetById(organizationId, sheetId),
            rows: this.sheetService.getRowsBySheetId(organizationId, sheetId),
            schema: this.sheetService.getSchemaBySheetId(
              organizationId,
              sheetId
            ),
          });
        })
      )
      .subscribe({
        next: ({ sheet, rows, schema }) => {
          this.sheet = sheet;
          this.schema = schema;
          this.rows.set(rows);
          this.initTable(); // Initialize table only after all data is available
        },
        error: (error) => {
          console.error('Error loading sheet data:', error);
        },
      });
  }

  private initTable() {
    if (!this.schema) {
      return; // Guard clause to prevent initialization without schema
    }

    type SchemaType = InferType<typeof this.schema>;
    this.columnHelper = createColumnHelper<SchemaType>();
    this.defaultColumns = [
      ...this.schema.columns.map((column) =>
        this.columnHelper.accessor(column.name, {
          header: column.name,
          footer: (props: any) => props.column.id,
        })
      ),
    ];
    this.table = createAngularTable(() => ({
      data: this.rows(),
      columns: this.defaultColumns,
      getCoreRowModel: getCoreRowModel(),
    }));
  }
}

// Claude Cleanup

// Key improvements:

// 1. Used switchMap to handle route changes - this will automatically unsubscribe from previous observables when the route changes
// 2. Used forkJoin to combine all three API calls into a single subscription - this ensures all data is available before initializing the table
// 3. Added error handling
// 4. Added a guard clause in initTable() to prevent initialization without required data
// 5. Maintained the use of takeUntilDestroyed() for automatic cleanup
// 6. Simplified the subscription management by having a single subscription instead of three separate ones

// This approach is more robust because:

// - All subscriptions are properly managed
// - The table is only initialized when all required data is available
// - Route changes are handled cleanly (previous requests are cancelled)
// - All API calls are made in parallel rather than sequentially
// - There's proper error handling

// You don't need to worry about managing these subscriptions manually as:

// - takeUntilDestroyed() handles the cleanup when the component is destroyed
// - switchMap handles cleanup of previous observables when the route changes
// - Using a single subscription point makes the code easier to maintain and reason about
