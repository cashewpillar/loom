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

  // data = signal<Sheet | null>(null);
  data = [
    {
      "name": "Socrates",
      "national origin": "Greece",
      "school": "Classical Greek philosophy",
      "interests": "Ethics, epistemology, logic, metaphysics, political philosophy",
    },
    {
      "name": "Plato",
      "national origin": "Greece",
      "school": "Platonism",
      "interests": "Metaphysics, epistemology, ethics, politics, art",
    }
    {
      "name": "Aristotle",
      "national origin": "Greece",
      "school": "Peripatetic",
      "interests": "Biology, zoology, metaphysics, logic, ethics, aesthetics, poetry, theater, music, rhetoric, psychology, linguistics, politics, government, and physics",
    },
    {
      "name": "Confucius",
      "national origin": "China",
      "school": "Confucianism",
      "interests": "Ethics, metaphysics, epistemology, politics, education, family, public life",
    },
    {
      "name": "Laozi",
      "national origin": "China",
      "school": "Daoism",
      "interests": "Philosophy, ethics, politics, metaphysics, logic, poetry",
    },
    {
      "name": "Immanuel Kant",
      "national origin": "Germany",
      "school": "Kantianism",
      "interests": "Metaphysics, epistemology, ethics, aesthetics, logic, political philosophy",
    },
    {
      "name": "Friedrich Nietzsche",
      "national origin": "Germany",
      "school": "Nihilism",
      "interests": "Philosophy, literature, poetry, philology, psychology, religion, and music",
    },
    {
      "name": "Jean-Paul Sartre",
      "national origin": "France",
      "school": "Existentialism",
      "interests": "Phenomenology, ontology, epistemology, ethics, political philosophy, and aesthetics",
    },
    {
      "name": "Simone de Beauvoir",
      "national origin": "France",
      "school": "Existentialism",
      "interests": "Existentialism, feminism",
    },
  ];

  columns = [
    { key: 'name', label: 'Name' },
    { key: 'national origin', label: 'National Origin' },
    { key: 'school', label: 'School' },
    { key: 'interests', label: 'Interests' },
  ]

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

  // private loadSheet(id: number) {
  //   // Load the sheet with the given ID.
  //   const table = createAngularTable(() => ({
  //     data: this.data,
  //     columns: this.columns,
  //     getCoreRowModel: getCoreRowModel(),
  //   }));
  // }
}
