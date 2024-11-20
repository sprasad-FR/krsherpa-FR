import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDispatcherService } from '../http/http-dispatcher.service';

interface CompanyType {
  id: number;
  type: string;
}

const routes = {
  companyType: {
    getAll: (filters?: Map<string, string>) =>
      filters ? `/company-types?${filters.toSanitizedURLFilters()}` : `/company-types`,
    create: () => `/company-types`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class CompanyTypeService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Get list of all available sales leads
  getAll(filters?: Map<string, string>): Observable<CompanyType[]> {
    return this.httpDispatcher.get<CompanyType[]>(routes.companyType.getAll(filters));
  }
}
