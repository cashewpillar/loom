import { SchemaColumn } from './schema-column';

export interface Schema {
  id: number;
  sheetId: number;
  name: string;
  columns: SchemaColumn[];
}
