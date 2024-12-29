import { Injectable } from '@angular/core';
import { Organization } from '../types/organization';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  endpoint: string;

  constructor(private apiService: ApiService) {
    this.endpoint = this.apiService.organizationEndpoint;
  }

  getOrganizations(): Observable<Organization[]> {
    return this.apiService.get<Organization[]>(`${this.endpoint}`);
  }

  getOrganizationById(organizationId: number): Observable<Organization> {
    return this.apiService.get<any>(`${this.endpoint}/${organizationId}`);
  }
}
