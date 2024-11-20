import { Injectable } from '@angular/core';
import { Clients } from '../models/clients.model';

import { Observable } from 'rxjs';
import { HttpDispatcherService } from '../http/http-dispatcher.service';

const routes = {
  clients: {
    getAll: (filters?: Map<string, string>) => (filters ? `/clients?${filters.toSanitizedURLFilters()}` : '/clients'),
    get: (id: string) => `/clients/${id}`,
    create: () => `/clients`,
    update: (id: string) => `/clients/${id}`,
    delete: (id: string) => `/clients/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Get list of all available lead comments
  getAll(filters?: Map<string, string>): Observable<Clients[]> {
    return this.httpDispatcher.get<Clients[]>(routes.clients.getAll(filters));
  }

  // Get only selected lead comment
  show(id: string): Observable<Clients> {
    return this.httpDispatcher.get<Clients>(routes.clients.get(id));
  }

  // Create new lead comment
  create(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.clients.create(), data);
  }

  // Update lead comment
  update(id: string, clients: Clients): Observable<any> {
    return this.httpDispatcher.put(routes.clients.update(id), clients);
  }

  // Delete lead comment
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.clients.delete(id));
  }
  // Update specific field client
  updateOnly(id: string, clients: Clients): Observable<any> {
    return this.httpDispatcher.patch(routes.clients.update(id), clients);
  }




   getclmindata()
  {
// localStorage.setItem('user', JSON.stringify(responseData));
//JSON.parse(localStorage.getItem('user'));
console.log(sessionStorage.getItem('clm'));

if (localStorage.getItem('clm')==null ||localStorage.getItem('clm')==undefined || localStorage.getItem('clm')=='')
{
  const filters = new Map();
   

  const filter = {
  
    "fields": {
      "id": true,
      "companyName": true,
      "companyType": true,     
      "createdBy": true,
      "updatedBy": true,  
      "isparent": true,
      "parentid": true,
      "salesassociates": true,
      "keyaccmanagers": true,
      
    },   
   
  
  };

  filters.set('filter', JSON.stringify(filter));

  this.getclients(filters)
  return JSON.parse(localStorage.getItem('clm')!);
  //var response= this.httpDispatcher.get<Expert[]>(routes.expert.getexmin(filters));
    //console.log('response',response);
   
   // localStorage.setItem('exm', JSON.stringify(response));
    // return JSON.parse(localStorage.getItem('exm'));
  }
else
{
  return JSON.parse(localStorage.getItem('clm')!);
}

  }



  // Get list of all available experts
  getclmin(filters?: Map<string, string>): Observable<Clients[]> {
    filters = this.makeFilterCaseInsesetive(filters);

// localStorage.setItem('user', JSON.stringify(responseData));
//JSON.parse(localStorage.getItem('user'));

    var response= this.httpDispatcher.get<Clients[]>(routes.clients.getAll(filters));
   // localStorage.setItem('user', JSON.stringify(response));
     return response;
 
  }



async getclients(filters) {
  
  await this.getclmin(filters).subscribe(
    (  response) => {
console.log(response)
      
localStorage.setItem('clm', JSON.stringify(response));
return JSON.parse(localStorage.getItem('clm')!);
    },
    (error: any) => { return ''}
  );




}
  

  // Get list of all available experts
  getclientmin(): Observable<Clients[]> {

    let filters = new Map();
   

  const filter = {
  
    "fields": {
      "id": true,
      "companyName": true,
      "companyType": true,     
      "createdBy": true,
      "updatedBy": true,  
      "isparent": true,
      "parentid": true,
      "salesassociates": true,
      "keyaccmanagers": true,
      
    },   
   
  
  };

  filters.set('filter', JSON.stringify(filter));

    filters = this.makeFilterCaseInsesetive(filters);

// localStorage.setItem('user', JSON.stringify(responseData));
//JSON.parse(localStorage.getItem('user'));

    var response= this.httpDispatcher.get<Clients[]>(routes.clients.getAll(filters));
   // localStorage.setItem('user', JSON.stringify(response));
     return response;
 
  }



  makeFilterCaseInsesetive(filters?: Map<string, string>) {
    return filters;
  }




}
