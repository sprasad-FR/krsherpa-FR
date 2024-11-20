import { Injectable } from '@angular/core';
//import { Incentives } from '@app/pages/Incentives.model';


import { HttpDispatcherService } from '../http/http-dispatcher.service';
import { Subject, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

const routes = {
  Incentives: {
    getAll: (filters?: Map<string, string>) =>
      filters ? `/roleincentive/?${filters.toSanitizedURLFilters()}` : `/roleincentive`,
    get: (id: string) => `/roleincentive/${id}`,
    create: () => `/roleincentive`,
    update: (id: string) => `/roleincentive/${id}`,
    delete: (id: string) => `/roleincentive/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class IncentivesConfigService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Get list of all available lead comments
  getAll(filters?: Map<string, string>): Observable<any[]> {
    return this.httpDispatcher.get<any[]>(routes.Incentives.getAll(filters));
  }

  // Get only selected lead comment
  show(id: string): Observable<any> {
    return this.httpDispatcher.get<any>(routes.Incentives.get(id));
  }

  // Create new lead comment
  create(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.Incentives.create(), data);
  }

  // Update lead comment
  update(id: string, _Incentives: any): Observable<any> {
    return this.httpDispatcher.put(routes.Incentives.update(id), _Incentives);
  }

  // Delete lead comment
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.Incentives.delete(id));
  }
  // Update specific field client
  updateOnly(id: string, _Incentives: any): Observable<any> {
    return this.httpDispatcher.patch(routes.Incentives.update(id), _Incentives);
  }
}
