import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  sheetEndpoint = 'sheets';
  organizationEndpoint = 'organizations';

  // Mock implementation
  private organizations = [
    { id: 1, name: 'Academy of Athens' },
    { id: 2, name: 'Confucian School' },
    { id: 3, name: 'Civil Rights Movement' },
    { id: 4, name: 'Princeton University' },
  ];

  private sheets = [
    { id: 1, name: 'Mentors', organizationId: 1 },
    { id: 2, name: 'Students', organizationId: 1 },
    { id: 3, name: 'Classes', organizationId: 1 },
    { id: 4, name: 'Mentors', organizationId: 2 },
    { id: 5, name: 'Students', organizationId: 2 },
    { id: 6, name: 'Classes', organizationId: 2 },
    { id: 7, name: 'Mentors', organizationId: 3 },
    { id: 8, name: 'Students', organizationId: 3 },
    { id: 9, name: 'Classes', organizationId: 3 },
    { id: 10, name: 'Mentors', organizationId: 4 },
    { id: 11, name: 'Students', organizationId: 4 },
    { id: 12, name: 'Classes', organizationId: 4 },
  ];

  constructor() {}

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const endpointParts = endpoint.split('/');
    if (endpointParts.length === 1 && endpointParts[0] === 'organizations') {
      return new Observable((observer) => {
        observer.next(this.organizations as unknown as T);
        observer.complete();
      });
    } else if (
      endpointParts.length === 2 &&
      endpointParts[0] === this.organizationEndpoint
    ) {
      const organizationId = parseInt(endpointParts[1], 10);
      const organization = this.organizations.find(
        (organization) => organization.id === organizationId
      );

      if (organization) {
        return new Observable((observer) => {
          observer.next(organization as unknown as T);
          observer.complete();
        });
      }
    } else if (
      endpointParts.length === 3 &&
      endpointParts[0] === this.organizationEndpoint &&
      endpointParts[2] === this.sheetEndpoint
    ) {
      const organizationId = parseInt(endpointParts[1], 10);
      const organization = this.organizations.find(
        (organization) => organization.id === organizationId
      );
      const sheets = this.sheets.filter(
        (sheet) => sheet.organizationId === organizationId
      );

      if (organization) {
        return new Observable((observer) => {
          observer.next(sheets as unknown as T);
          observer.complete();
        });
      }
    }

    return new Observable((observer) => {
      observer.error(new Error(`Endpoint ${endpoint} not found.`));
    });
  }
}
