import { ExpertInvoice } from './../models/expert-invoice.model';
import { ClientInvoice } from './../models/client-invoice.model';
import { Injectable } from '@angular/core';
import { HttpDispatcherService } from '../http/http-dispatcher.service';

import { Observable } from 'rxjs';

const routes = {
  expertInvoices: {
    getAll: (filters?: Map<string, any>) =>
      filters ? `/expert-invoices?${filters.toSanitizedURLFilters()}` : `/expert-invoices`,
    get: (id: string, filters?: Map<string, any>) =>
      filters ? `/expert-invoices/${id}?${filters.toSanitizedURLFilters()}` : `/expert-invoices/${id}`,
    create: () => `/expert-invoices`,
    update: (id: string) => `/expert-invoices/${id}`,
    delete: (id: string) => `/expert-invoices/${id}`,
    updateallexpertInvoice: (where?: Map<string, string>) => (where? `/expert-invoices_update?${where.toSanitizedURLFilters()}` : `/expert-invoices_update`), 

  },

  clientInvoices: {
    getAll: (filters?: Map<string, any>) =>
      filters ? `/client-invoices?${filters.toSanitizedURLFilters()}` : `/client-invoices`,
    get: (id: string, filters?: Map<string, any>) =>
      filters ? `/client-invoices/${id}?${filters.toSanitizedURLFilters()}` : `/client-invoices/${id}`,
    create: () => `/client-invoices`,
    update: (id: string) => `/client-invoices/${id}`,
    delete: (id: string) => `/client-invoices/${id}`,
    updateOnlyClientInvoice: (id: string) => `/client-invoices/${id}`,
  //   updateallClientInvoice: (id: string) => `/client-invoices_update/${id}`,
     updateallClientInvoice: (where?: Map<string, string>) => (where? `/client-invoices_update?${where.toSanitizedURLFilters()}` : `/client-invoices_update`), 

  
 
  },
};

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Exper Invoice Services
  createExpertInvoice(data: ExpertInvoice): Observable<any> {
    return this.httpDispatcher.post(routes.expertInvoices.create(), data);
  }
  getAllExpertInvoice(filters?: Map<string, any>): Observable<ExpertInvoice[]> {
    return this.httpDispatcher.get<ExpertInvoice[]>(routes.expertInvoices.getAll(filters));
  }

  showExpertInvoice(id: string, filters?: Map<string, any>): Observable<ExpertInvoice> {
    return this.httpDispatcher.get<ExpertInvoice>(routes.expertInvoices.get(id, filters));
  }

  updateExpertInvoice(id: string, expertInvoice: ExpertInvoice): Observable<any> {
    return this.httpDispatcher.put(routes.expertInvoices.update(id), expertInvoice);
  }

  updateOnlyExpertInvoice(id: string, expertInvoice: ExpertInvoice): Observable<any> {
    return this.httpDispatcher.patch(routes.expertInvoices.update(id), expertInvoice);
  }

  
// Update specific field expert
updateallExpertIInvoice(where: Map<string, string>, expert: any): Observable<any> {
  
  return this.httpDispatcher.post(routes.expertInvoices.updateallexpertInvoice(where), expert);
}


  // Client Invoice Services
  createClientInvoice(data: ClientInvoice): Observable<any> {
    return this.httpDispatcher.post(routes.clientInvoices.create(), data);
  }

  getAllClientInvoice(filters?: Map<string, any>): Observable<ClientInvoice[]> {
    return this.httpDispatcher.get<ClientInvoice[]>(routes.clientInvoices.getAll(filters));
  }

  showClientInvoice(id: string, filters?: Map<string, any>): Observable<ClientInvoice> {
    return this.httpDispatcher.get<ClientInvoice>(routes.clientInvoices.get(id, filters));
  }

  updateClientInvoice(id: string, clientInvoice: ClientInvoice): Observable<any> {
    return this.httpDispatcher.put(routes.clientInvoices.update(id), clientInvoice);
  }

  updateOnlyClientInvoice(id: string, clientInvoice: ClientInvoice): Observable<any> {
    return this.httpDispatcher.patch(routes.clientInvoices.update(id), clientInvoice);
  }

  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.clientInvoices.delete(id));
  }


// Update specific field expert
updateallClientInvoice(where: Map<string, string>, expert: any): Observable<any> {
  
  return this.httpDispatcher.post(routes.clientInvoices.updateallClientInvoice(where), expert);
}



}
