import { Injectable } from '@angular/core';
import { Sheet } from '../types/sheet';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  endpoint: string;
  organizationEndpoint: string;

  constructor(private apiService: ApiService) {
    this.endpoint = this.apiService.sheetEndpoint;
    this.organizationEndpoint = this.apiService.organizationEndpoint;
  }

  getSheetById(organizationId: number, sheetId: number): Observable<Sheet> {
    return this.apiService.get<Sheet>(
      `/${this.organizationEndpoint}/${organizationId}/${this.endpoint}/${sheetId}`
    );
  }

  getRowsBySheetId(organizationId: number, sheetId: number): Observable<any> {
    return this.apiService.get<any>(
      `/${this.organizationEndpoint}/${organizationId}/${this.endpoint}/${sheetId}/rows`
    );
  }

  getSheetsByOrganizationId(organizationId: number): Observable<Sheet[]> {
    return this.apiService.get<Sheet[]>(
      `${this.organizationEndpoint}/${organizationId}/${this.endpoint}`
    );
  }
}
