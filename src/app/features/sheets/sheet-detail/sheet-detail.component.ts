import { NgFor } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SheetService } from '../services/sheet.service';
import { Sheet } from '../types/sheet';
import { JsonPipe } from '@angular/common';
import {
  createAngularTable,
  createColumnHelper,
  FlexRenderDirective,
  getCoreRowModel,
} from '@tanstack/angular-table';

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
  imports: [JsonPipe, NgFor, FlexRenderDirective],
  templateUrl: './sheet-detail.component.html',
  styleUrls: ['./sheet-detail.component.scss'],
})
export class SheetDetailComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly sheetService: SheetService = inject(SheetService);

  sheet!: Sheet;
  rows!: any[]; // TODO: fix type

  // tanstack test
  data = signal<User[]>([
    {
      firstName: 'Tanner',
      lastName: 'Linsley',
      age: 33,
      visits: 100,
      progress: 50,
      status: 'Married',
    },
    {
      firstName: 'Kevin',
      lastName: 'Vandy',
      age: 27,
      visits: 200,
      progress: 100,
      status: 'Single',
    },
  ]);
  columnHelper = createColumnHelper<User>();
  defaultColumns = [
    // Display Column
    this.columnHelper.display({
      id: 'actions',
      // cell: props => <RowActions row={props.row} />,
    }),
    // Grouping Column
    this.columnHelper.group({
      header: 'Name',
      footer: (props) => props.column.id,
      columns: [
        // Accessor Column
        this.columnHelper.accessor('firstName', {
          cell: (info) => info.getValue(),
          footer: (props) => props.column.id,
        }),
        // Accessor Column
        this.columnHelper.accessor((row) => row.lastName, {
          id: 'lastName',
          cell: (info) => info.getValue(),
          header: 'Last Name', // Just use a string instead of JSX
          footer: (props) => props.column.id,
        }),
      ],
    }),
    // Grouping Column
    this.columnHelper.group({
      header: 'Info',
      footer: (props) => props.column.id,
      columns: [
        // Accessor Column
        this.columnHelper.accessor('age', {
          header: () => 'Age',
          footer: (props) => props.column.id,
        }),
        // Grouping Column
        this.columnHelper.group({
          header: 'More Info',
          columns: [
            // Accessor Column
            this.columnHelper.accessor('visits', {
              header: 'Visits',
              footer: (props) => props.column.id,
            }),
            // Accessor Column
            this.columnHelper.accessor('status', {
              header: 'Status',
              footer: (props) => props.column.id,
            }),
            // Accessor Column
            this.columnHelper.accessor('progress', {
              header: 'Profile Progress',
              footer: (props) => props.column.id,
            }),
          ],
        }),
      ],
    }),
  ];

  table = createAngularTable(() => ({
    data: this.data(),
    columns: this.defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  }));

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
        this.rows = rows;
      });
  }
}
