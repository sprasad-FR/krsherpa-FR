import { Injectable } from '@angular/core';
import { HttpDispatcherService } from '../http/http-dispatcher.service';


import { Observable } from 'rxjs';
import { Expert } from '../models/expert.model';

const routes = {
  expert: {
    getAll: (filters?: Map<string, string>) => (filters ? `/experts?${filters.toSanitizedURLFilters()}` : `/experts`),
    getexmin: (filters?: Map<string, string>) => `/exsmin`,
    get: (id: string) => `/experts/${id}`,
    create: () => `/experts`,
    update: (id: string) => `/experts/${id}`,
    expertcount: () => `/expertcount`,
    delete: (id: string) => `/experts/${id}`,
    updatePOC: (where?: Map<string, string>) => (where? `/updatePOC?${where.toSanitizedURLFilters()}` : `/updatePOC`), 
    getCount: (filters?: Map<string, string>) => (filters? `/expertcnt1?${filters.toSanitizedURLFilters()}` : `/expertcnt1`), 
    getExpCount: (filters?: Map<string, string>) => (filters? `//experts/count?${filters.toSanitizedURLFilters()}` : `//experts/count`), 
    updateallExpertsAlloc: (where?: Map<string, string>) => (where? `/expert_alloc_update?${where.toSanitizedURLFilters()}` : `/expert_alloc_update`), 
    getfilters: (filters?: Map<string, string>) => (filters? `/expertsearchkeaywords?${filters.toSanitizedURLFilters()}` : `/expertsearchkeaywords`), 

  },
};
//expertsearchkeaywords
@Injectable({
  providedIn: 'root',
})
export class ExpertService {
  constructor(private readonly httpDispatcher: HttpDispatcherService) {}

  // Get list of all available experts
  getAll(filters?: Map<string, string>): Observable<Expert[]> {
    filters = this.makeFilterCaseInsesetive(filters);
    return this.httpDispatcher.get<Expert[]>(routes.expert.getAll(filters));
  }

   // Get list of all available experts
   getRecCount(filters?: Map<string, string>): Observable<Expert[]> {
    filters = this.makeFilterCaseInsesetive(filters);
    return this.httpDispatcher.get<any[]>(routes.expert.getExpCount(filters));
  }

  
   // Get list of all available experts
   getFilters(filters?: Map<string, string>): Observable<Expert[]> {
    filters = this.makeFilterCaseInsesetive(filters);
    return this.httpDispatcher.get<any[]>(routes.expert.getfilters(filters));
  }
   // Get list of all available experts
   expertPOCcount(): Observable<Expert[]> {
    return this.httpDispatcher.get<any[]>(routes.expert.expertcount());
  }

  getexmindata()
  {
// localStorage.setItem('user', JSON.stringify(responseData));
//JSON.parse(localStorage.getItem('user'));
console.log(sessionStorage.getItem('exm'));

if (sessionStorage.getItem('exm')==null ||sessionStorage.getItem('exm')==undefined || sessionStorage.getItem('exm')=='')
{
  const filters = new Map();
   
  this.getexmin().subscribe(
    (response) => {
console.log(response)
      
sessionStorage.setItem('exm', JSON.stringify(response));
return JSON.parse(sessionStorage.getItem('exm')!);
    },
    (error: any) => { return ''}
  );
  
  //var response= this.httpDispatcher.get<Expert[]>(routes.expert.getexmin(filters));
    //console.log('response',response);
   
   // localStorage.setItem('exm', JSON.stringify(response));
    // return JSON.parse(localStorage.getItem('exm'));
  }
else
{
  return JSON.parse(sessionStorage.getItem('exm')!);
}

  }

  // Get list of all available experts
  getexmin(filters?: Map<string, string>): Observable<Expert[]> {
    filters = this.makeFilterCaseInsesetive(filters);

// localStorage.setItem('user', JSON.stringify(responseData));
//JSON.parse(localStorage.getItem('user'));

    var response= this.httpDispatcher.get<Expert[]>(routes.expert.getexmin(filters));
   // localStorage.setItem('user', JSON.stringify(response));
     return response;
 
  }
  // Get only selected sales leads
  show(id: string): Observable<Expert> {
    return this.httpDispatcher.get<Expert>(routes.expert.get(id));
  }
  // Create new expert
  create(data: any): Observable<any> {
    data['createdAt'] = new Date();
    data['updatedAt'] = new Date();
    return this.httpDispatcher.post(routes.expert.create(), data);
  }

  // Update expert
  update(id: string, expert: Expert): Observable<any> {
    expert['updatedAt'] = new Date();
    return this.httpDispatcher.put(routes.expert.update(id), expert);
  }

  // Update specific field expert
  updateOnly(id: string, expert: Expert): Observable<any> {
    expert['updatedAt'] = new Date();
    return this.httpDispatcher.patch(routes.expert.update(id), expert);
  }

  // Update specific field expert
  updatePOC(where: Map<string, string>, expert: any): Observable<any> {
    expert['updatedAt'] = new Date();
    return this.httpDispatcher.patch(routes.expert.updatePOC(where), expert);
  }

   // Update specific field expert     getCount: (filters?: Map<string, string>) => (filters? `/expertcnt1?${filters.toSanitizedURLFilters()}` : `/expertcnt1`), 

   getCount(where: Map<string, string>): Observable<any> {
   
    return this.httpDispatcher.get(routes.expert.getCount(where));
  }
  // Delete expert
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.expert.delete(id));
  }


  
// Update specific field expert
updateallExpertsAlloc(where: Map<string, string>, expert: any): Observable<any> {
  
  return this.httpDispatcher.post(routes.expert.updateallExpertsAlloc(where), expert);
}



  makeFilterCaseInsesetive(filters?: Map<string, string>) {
    return filters;
  }
}
