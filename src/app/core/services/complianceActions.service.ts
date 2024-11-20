import { Injectable } from '@angular/core';
import { complianceActions } from '../models/complianceActions.model';

import { Observable } from 'rxjs';
import { HttpDispatcherService } from '../http/http-dispatcher.service';

const routes = {
  complianceactions: {
    getAll: (filters?: Map<string, string>) =>
      filters ? `/complianceactions?${filters.toSanitizedURLFilters()}` : `/complianceactions`,
    get: (id: string) => `/complianceactions/${id}`,
    create: () => `/complianceactions`,
    update: (id: string) => `/complianceactions/${id}`,
    delete: (id: string) => `/complianceactions/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class complianceActionsService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Get list of all available lead comments
  getAll(filters?: Map<string, string>): Observable<complianceActions[]> {
    return this.httpDispatcher.get<complianceActions[]>(routes.complianceactions.getAll(filters));
  }

  // Get only selected lead comment
  show(id: string): Observable<complianceActions> {
    return this.httpDispatcher.get<complianceActions>(routes.complianceactions.get(id));
  }

  // Create new lead comment
  create(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.complianceactions.create(), data);
  }

  // Update lead comment
  update(id: string, _complianceActions: complianceActions): Observable<any> {
    return this.httpDispatcher.put(routes.complianceactions.update(id), _complianceActions);
  }

  // Delete lead comment
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.complianceactions.delete(id));
  }
  // Update specific field client
  updateOnly(id: string, _complianceActions: complianceActions): Observable<any> {
    return this.httpDispatcher.patch(routes.complianceactions.update(id), _complianceActions);
  }
}
