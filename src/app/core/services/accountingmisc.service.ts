import { Injectable } from '@angular/core';
import { accountingmisc } from '../../../app/core/models/accountingmisc.model';

import { Observable } from 'rxjs';
import { HttpDispatcherService } from '../http/http-dispatcher.service';

const routes = {
  accountingmisc: {
    getAll: (filters?: Map<string, string>) =>
      filters ? `/accountingmisc?${filters.toSanitizedURLFilters()}` : `/accountingmisc`,
    get: (id: string) => `/accountingmisc/${id}`,
    create: () => `/accountingmisc`,
    update: (id: string) => `/accountingmisc/${id}`,
    delete: (id: string) => `/accountingmisc/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class AccountingmiscService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Get list of all available lead comments
  getAll(filters?: Map<string, string>): Observable<accountingmisc[]> {
    return this.httpDispatcher.get<accountingmisc[]>(routes.accountingmisc.getAll(filters));
  }

  // Get only selected lead comment
  show(id: string): Observable<accountingmisc> {
    return this.httpDispatcher.get<accountingmisc>(routes.accountingmisc.get(id));
  }

  // Create new lead comment
  create(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.accountingmisc.create(), data);
  }

  // Update lead comment
  update(id: string, _complianceActions: accountingmisc): Observable<any> {
    return this.httpDispatcher.put(routes.accountingmisc.update(id), _complianceActions);
  }

  // Delete lead comment
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.accountingmisc.delete(id));
  }
  // Update specific field client
  updateOnly(id: string, _complianceActions: accountingmisc): Observable<any> {
    return this.httpDispatcher.patch(routes.accountingmisc.update(id), _complianceActions);
  }
}
