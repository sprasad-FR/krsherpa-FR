import { Injectable } from '@angular/core';
import { HttpDispatcherService } from '../http/http-dispatcher.service';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';



Map.prototype.toSanitizedURLFilters = function toSanitizedURLFilter() {
  let sanitizedFilter = '';
  this.forEach((value: string, key: string) => {
    sanitizedFilter += `&${key}=${value}`;
  });
  return sanitizedFilter.substring(1);
};


const routes = {
  projects: {
    getAll: (filters?: Map<string, any>) => (  filters ? `/projects?${filters.toSanitizedURLFilters()}` : `/projects`),
    getAllMin: (filters?: Map<string, any>) => (  filters ? `/projectsmin?${filters.toSanitizedURLFilters()}` : `/projectsmin`),
   
    get: (id: string, filters?: Map<string, any>) =>
      filters ? `/projects/${id}?${filters.toSanitizedURLFilters()}` : `/projects/${id}`,
    create: () => `/projects`,
    getCount: (filters?: Map<string, string>) => (filters? `/projectcnt?${filters.toSanitizedURLFilters()}` : `/projectcnt`), 
    getmin: () => `/getprojmin`,
    update: (id: string) => `/projects/${id}`,
    delete: (id: string) => `/projects/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Get list of all available project
  getAll(filters?: Map<string, any>): Observable<Project[]> {
    console.log('filters',filters);
    return this.httpDispatcher.get<Project[]>(routes.projects.getAll(filters));
  }
/* */
 // Get list of all available project
  getAllMin(filters?: Map<string, any>): Observable<Project[]> {
    console.log('filters',filters);
    return this.httpDispatcher.get<Project[]>(routes.projects.getAllMin(filters));
  }
/**/

  // Get list of all available project
  getAllMin1(data:any): Observable<Project[]> {
   // console.log('filters',filters);
    return this.httpDispatcher.postmiddle<any[]>(routes.projects.getmin(),data);
  }
/* */
//https://middle.krsherpa.com/rest/expert/getprojmin
  
  // Get only selected project
  show(id: string, filters?: Map<string, any>): Observable<Project> {
    return this.httpDispatcher.get<Project>(routes.projects.get(id, filters));
  }

  // Create new project
  create(data: Project): Observable<any> {
    return this.httpDispatcher.post(routes.projects.create(), data);
  }

  // Update project
  update(id: string, projects: Project): Observable<any> {
    return this.httpDispatcher.put(routes.projects.update(id), projects);
  }

  // Update specific field project
  updateOnly(id: string, projects: Project): Observable<any> {
    return this.httpDispatcher.patch(routes.projects.update(id), projects);
  }



   // Update specific field expert    

   getCount(where: Map<string, string>): Observable<any> {
   
    return this.httpDispatcher.get(routes.projects.getCount(where));
  }


  // Delete project
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.projects.delete(id));
  }


  // Delete project
  getmin(): Observable<any> {



    const filters = new Map();
    const filter = {
      include: [
       /* {
          relation: 'keyAccMgr',
        },
        {
          relation: 'researchManager',
        },
        {
          relation: 'client',
        },*/
      ],
      where: {},
    "fields": {
    "id": true,
    "projectId": true,
    "name": true,
    "researchAnalyst": true,
    "status": true, 
    "createdAt": true
    },     
      order: 'createdAt DESC',
      
    };
    
    filters.set('filter', JSON.stringify(filter));
    return this.httpDispatcher.get<Project[]>(routes.projects.getAll(filters));



  }


  getpjmindata(filters?: Map<string, any>):any
  {
// localStorage.setItem('user', JSON.stringify(responseData));
//JSON.parse(localStorage.getItem('user'));
console.log(sessionStorage.getItem('pjm'));

//if (sessionStorage.getItem('pjm')==null ||sessionStorage.getItem('pjm')==undefined || sessionStorage.getItem('pjm')=='')
//{
 // const filters = new Map();
   
  this.getAll(filters).subscribe(
    (response) => {
console.log(response)
      
return response;

//sessionStorage.setItem('pjm', JSON.stringify(response));
//return JSON.parse(sessionStorage.getItem('pjm')!);
    },
    (error: any) => { return ''}
  );
  
  //var response= this.httpDispatcher.get<Expert[]>(routes.expert.getexmin(filters));
    //console.log('response',response);
   
   // localStorage.setItem('exm', JSON.stringify(response));
    // return JSON.parse(localStorage.getItem('exm'));
    
 /* }
else
{
  return JSON.parse(sessionStorage.getItem('pjm')!);
}*/

  }





}
