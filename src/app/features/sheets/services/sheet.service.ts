import { Injectable } from '@angular/core';
import { Sheet } from '../types/sheet';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  // Mock implementation
  private sheets = [
    { id: 1, name: 'Mentors' },
    { id: 2, name: 'Mentees' },
  ];

  constructor() {}

  getSheets(): Sheet[] {
    return this.sheets;
  }

  getSheetById(sheetId: number): Sheet | undefined {
    const sheet = this.sheets.find((sheet) => sheet.id === sheetId);

    if (!sheet) {
      throw new Error(`Sheet with ID ${sheetId} not found.`);
    }

    return sheet;
  }
}
