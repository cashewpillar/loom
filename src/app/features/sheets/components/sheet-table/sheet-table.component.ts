import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sheet-table',
  imports: [NgIf, NgFor],
  templateUrl: './sheet-table.component.html',
  styleUrls: ['./sheet-table.component.scss'],
})
export class SheetTableComponent {
  @Input() data: any[] = [
    { name: 'John', age: 30, job: 'Developer' },
    { name: 'Jane', age: 25, job: 'Designer' },
    { name: 'Jim', age: 22, job: 'Intern' },
  ];
  @Input() columns: string[] = ['name', 'age', 'job'];
}
