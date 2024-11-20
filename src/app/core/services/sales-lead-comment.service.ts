import { Injectable } from '@angular/core';
import { SalesLeadComment } from '../models/salesLeadComment.model';

import { Observable } from 'rxjs';
import { HttpDispatcherService } from '../http/http-dispatcher.service';

const routes = {
  leadComment: {
    getAll: (filters?: Map<string, string>) =>
      filters ? `/sales-lead-comments?${filters.toSanitizedURLFilters()}` : `/sales-lead-comments`,
    get: (id: number) => `/sales-lead-comments/${id}`,
    create: () => `/sales-lead-comments`,
    update: (id: number) => `/sales-lead-comments/${id}`,
    delete: (id: number) => `/sales-lead-comments/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class SalesLeadCommentService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Get list of all available lead comments
  getAll(filters?: Map<string, string>): Observable<SalesLeadComment[]> {
    return this.httpDispatcher.get<SalesLeadComment[]>(routes.leadComment.getAll(filters));
  }

  // Get only selected lead comment
  show(id: number): Observable<SalesLeadComment> {
    return this.httpDispatcher.get<SalesLeadComment>(routes.leadComment.get(id));
  }

  // Create new lead comment
  create(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.leadComment.create(), data);
  }

  // Update lead comment
  update(id: number, leadComment: SalesLeadComment): Observable<any> {
    return this.httpDispatcher.put(routes.leadComment.update(id), leadComment);
  }

  // Delete lead comment
  delete(id: number): Observable<any> {
    return this.httpDispatcher.delete(routes.leadComment.delete(id));
  }
}
