import { Injectable } from '@angular/core';
import { SalesLead } from '../models/salesLead.model';

import { Observable } from 'rxjs';
import { HttpDispatcherService } from '../http/http-dispatcher.service';

const routes = {
  salesLead: {
    getAll: (filters?: Map<string, string>) =>
      filters ? `/sales-leads?${filters.toSanitizedURLFilters()}` : `/sales-leads`,
    get: (id: string) => `/sales-leads/${id}`,
    create: () => `/sales-leads`,
    update: (id: string) => `/sales-leads/${id}`,
    delete: (id: string) => `/sales-leads/${id}`,
    getLeadsByStage: (leadStatus: number) => `/sales-leads-by-lead-status/${leadStatus}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class SalesLeadService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Get list of all available sales leads
  getAllLeads(filters?: Map<string, string>): Observable<SalesLead[]> {
    return this.httpDispatcher.get<SalesLead[]>(routes.salesLead.getAll(filters));
  }

  // Get only selected sales leads
  getLeadById(id: string): Observable<SalesLead> {
    return this.httpDispatcher.get<SalesLead>(routes.salesLead.get(id));
  }

  // Create new sales leads
  createNewLead(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.salesLead.create(), data);
  }

  // Update sales leads
  updateLeadById(id: string, salesLead: SalesLead): Observable<any> {
    return this.httpDispatcher.put(routes.salesLead.update(id), salesLead);
  }

  // Update specific field of sales lead
  updateOnly(id: string, projects: SalesLead): Observable<any> {
    return this.httpDispatcher.patch(routes.salesLead.update(id), projects);
  }

  // Delete sales leads
  deleteLeadById(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.salesLead.delete(id));
  }

  // Get sales leads by status
  getLeadsByStage(leadStatus: number) {
    return this.httpDispatcher.get<SalesLead>(routes.salesLead.getLeadsByStage(leadStatus));
  }
}
