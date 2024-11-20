import { Injectable } from '@angular/core';
import { HttpDispatcherService } from '../http/http-dispatcher.service';
import { Observable } from 'rxjs';
import { bdpUser } from '../models/bdp.model';

const routes = {
  contact: {
    getAll: (filters?: Map<string, string>) => (filters ? `/bdps?${filters.toSanitizedURLFilters()}` : `/bdps`),
    get: (id: string) => `/bdps/${id}`,
    create: () => `/bdps`,
    update: (id: string) => `/bdps/${id}`,
    delete: (id: string) => `/bdps/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class BdpService {
  constructor(private readonly httpDispatcher: HttpDispatcherService) {}

  // Get list of all available contacts
  getAll(filters?: Map<string, string>): Observable<bdpUser[]> {
    return this.httpDispatcher.get<bdpUser[]>(routes.contact.getAll(filters));
  }

  // Get only selected contact
  getById(id: string): Observable<bdpUser> {
    return this.httpDispatcher.get<bdpUser>(routes.contact.get(id));
  }

  // Create new contact
  create(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.contact.create(), data);
  }

  // Update contact
  update(id: string, contact: bdpUser): Observable<any> {
    return this.httpDispatcher.put(routes.contact.update(id), contact);
  }

  // Delete contact
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.contact.delete(id));
  }
}
