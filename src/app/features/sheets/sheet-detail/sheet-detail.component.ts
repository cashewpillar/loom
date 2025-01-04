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

type InferType<T> = {
  [K in keyof T]: T[K] extends 'number'
    ? number
    : T[K] extends 'string'
    ? string
    : T[K] extends 'boolean'
    ? boolean
    : unknown;
};

// define person here
type User = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
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
  rows = signal<any[]>([]); // TODO: fix type

  columnHelper!: any;
  defaultColumns!: any[];
  table!: any;

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
    // TODO: how to manage subscriptions properly here??
    // if i add destroy refs always- doesnt that make it the default? learn the nuances
    this.sheetService
      .getSheetById(organizationId, sheetId)
      .subscribe((sheet) => {
        this.sheet = sheet;
      });

    this.sheetService
      .getRowsBySheetId(organizationId, sheetId)
      .subscribe((rows) => {
        this.rows.set(rows);
      });

    this.sheetService
      .getSchemaBySheetId(organizationId, sheetId)
      .subscribe((schema) => {
        this.schema = schema;
      });

    this.initTable();
  }

  private initTable() {
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
