import { Injectable } from '@angular/core';
import { HttpDispatcherService } from '../http/http-dispatcher.service';


import { Observable } from 'rxjs';
import { employeeUser } from '../models/employee.model';




const routes = {
  emp: {
    getAll: (filters?: Map<string, string>) =>
      filters ? `/employees?${filters.toSanitizedURLFilters()}` : `/employees`,
    getAllEnbaled: (filters?: Map<string, string>) =>
      filters ? `/employeesEnabled?${filters.toSanitizedURLFilters()}` : `/employeesEnabled`,
    getAllmin: (filters?: Map<string, string>) =>
      filters ? `/emplstmin?${filters.toSanitizedURLFilters()}` : `/emplstmin`,
   
      get: (id: string) => `/employees/${id}`,
    create: () => `/employees`,
    update: (id: string) => `/employees/${id}`,
    delete: (id: string) => `/employees/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private readonly httpDispatcher: HttpDispatcherService) {}

  // Get list of all available emps
  getAll(filters?: Map<string, string>): Observable<employeeUser[]> {
    // if(localStorage.getItem('emp')?.length){
    //   return JSON.parse(localStorage.getItem('emp'))
    // }
    return this.httpDispatcher.get<employeeUser[]>(routes.emp.getAll(filters));
  }



  postusagedata(filter:any)
  {

/*
    let filter = {
      "empid":"5e5deadc98f9c9472e8762df"
    } */
  //get number of expected event by key accmanager id for a period
    fetch('https://middle.krsherpa.com/rest/expert/usr/addTrackerLog', {
      method: "POST",
      body: JSON.stringify(filter),
      headers: { 
        "Content-Type": "application/json",
      },
    }
    ).then(r => r.json()).then(result => {
      
  console.log('done')
    },
      (error: any) => {
        
      }
    );
  

  }


  postpocdata(filter:any)
  {

/*
    let filter = {
      "empid":"5e5deadc98f9c9472e8762df"
    } */
  //get number of expected event by key accmanager id for a period
    fetch('https://middle.krsherpa.com/rest/expert/usr/addpoc', {
      method: "POST",
      body: JSON.stringify(filter),
      headers: { 
        "Content-Type": "application/json",
      },
    }
    ).then(r => r.json()).then(result => {
      
  console.log('done')
    },
      (error: any) => {
        
      }
    );
  

  }


  getempmindata()
  {
// localStorage.setItem('user', JSON.stringify(responseData));
//JSON.parse(localStorage.getItem('user'));
console.log(sessionStorage.getItem('emplst'));

if (sessionStorage.getItem('emplst')==null ||sessionStorage.getItem('emplst')==undefined || sessionStorage.getItem('emplst')=='')
{
  const filters = new Map();
   
  this.getAllmin().subscribe(
    (response) => {
console.log(response)
      
sessionStorage.setItem('emplst', JSON.stringify(response));
return JSON.parse(sessionStorage.getItem('emplst')!);
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
  return JSON.parse(sessionStorage.getItem('emplst')!);
}

  }





 //Get list of all available emps
 getAllmin(filters?: Map<string, string>): Observable<employeeUser[]> {
    // if(localStorage.getItem('emp')?.length){
    //   return JSON.parse(localStorage.getItem('emp'))
    // }
    return this.httpDispatcher.get<employeeUser[]>(routes.emp.getAllmin(filters));
  }
 // Get only selected sales leads
  show(id: string): Observable<employeeUser> {
    // if(localStorage.getItem('emp')?.length){
    //   var localEmpList= JSON.parse(localStorage.getItem('emp'));
    //   var element=localEmpList.find(a=>a.id===id);
    //   if(element)
    //   return element;
    // }
    return this.httpDispatcher.get<employeeUser>(routes.emp.get(id));
  }
  // Create new emp
  create(data: any): Observable<any> {
    // localStorage.removeItem('emp');
    return this.httpDispatcher.post(routes.emp.create(), data);
  }

  // Update emp
  update(id: string, emp: employeeUser): Observable<any> {
    // localStorage.removeItem('emp');
    return this.httpDispatcher.put(routes.emp.update(id), emp);
  }
  // Update emp
  updateOnly(id: string, emp: employeeUser): Observable<any> {
    // localStorage.removeItem('emp');
    return this.httpDispatcher.patch(routes.emp.update(id), emp);
  }

  setEmployeelistToLocal() {}

  //getEmpployeeFromLocal(empIds) {}

  // Delete emp
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.emp.delete(id));
  }
}
