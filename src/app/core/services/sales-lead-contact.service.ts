import { Injectable } from '@angular/core';
import { SalesLeadContact } from '../models/salesLeadContact.model';

import { Observable } from 'rxjs';
import { HttpDispatcherService } from '../http/http-dispatcher.service';

const routes = {
  leadContact: {
    getAll: (filters?: Map<string, string>) =>
      filters ? `/sales-lead-contacts?${filters.toSanitizedURLFilters()}` : `/sales-lead-contacts`,
    get: (id: string) => `/sales-lead-contacts/${id}`,
    create: () => `/sales-lead-contacts`,
    update: (id: string) => `/sales-lead-contacts/${id}`,
    delete: (id: string) => `/sales-lead-contacts/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class SalesLeadContactService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Get list of all available lead contacts
  getAll(filters?: Map<string, string>): Observable<SalesLeadContact[]> {
    return this.httpDispatcher.get<SalesLeadContact[]>(routes.leadContact.getAll(filters));
  }

  // Get only selected lead contact
  show(id: string): Observable<SalesLeadContact> {
    return this.httpDispatcher.get<SalesLeadContact>(routes.leadContact.get(id));
  }

  // Create new lead contact
  create(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.leadContact.create(), data);
  }

  // Update lead contact
  update(id: string, leadContact: SalesLeadContact): Observable<any> {
    return this.httpDispatcher.put(routes.leadContact.update(id), leadContact);
  }

  updateOnly(id: string, leadContact: SalesLeadContact): Observable<any> {
    return this.httpDispatcher.patch(routes.leadContact.update(id), leadContact);
  }

  // Delete lead contact
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.leadContact.delete(id));
  }
}
