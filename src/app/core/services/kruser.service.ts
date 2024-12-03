import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
//import { HttpDispatcherService } from '../http/http-dispatcher.service';

import { User } from './credentials.service';

import { Observable } from 'rxjs';
import { HttpDispatcherService } from '../http/http-dispatcher.service';

const userRoutes = {
  login: () => `/users/login`,
  getUsers: () => environment.serverUrl + `/users`,
};


const routes = {
  users: {
    getAll: (filters?: Map<string, string>) => (filters ? `/users?${filters.toSanitizedURLFilters()}` : `/users`),
    usersByRole: (filters?: Map<string, string>) => {
      const filterString = filters ? filters.toSanitizedURLFilters() : '';
      return `/usersByRole${filterString ? `?${filterString}` : ''}`;
    },
    
    register: () => `/users`,
    update: (id: string) => `/users/${id}`,
     updatepd: (id: string) => `/upd/${id}`,
     updatepdothers: (id: string) => `/updothers/${id}`,
      getupd: (userId: string) => `/getupd/${userId}`,
      getusr: (userId: string) => `/users/${userId}`,  ///users/{userId}
       getusrbyml: (username: string) => `/finduserbyusr/${username}`,  ///users/{userId}
  },
};


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Get list of all available routess
  getUsers(filters?: Map<string, string>): Observable<User[]> {
    return this.httpDispatcher.get<User[]>(routes.users.getAll(filters));
  }

 
usersByRole(filters?: Map<string, string>): Observable<User[]> {
  const url = routes.users.usersByRole(filters);
  console.log('Request URL:', url); // Log the URL for debugging
  return this.httpDispatcher.get<User[]>(url);
}
  

  // Create new sales leads
  register(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.users.register(), data);
  }

  updateById(id: string, data: any): Observable<any> {
    return this.httpDispatcher.put(routes.users.update(id), data);
  }

 updatepd(id: string, data: any): Observable<any> {
    return this.httpDispatcher.patch(routes.users.updatepd(id), data);
  }

 updatepdothers(id: string, data: any): Observable<any> {
    return this.httpDispatcher.patch(routes.users.updatepdothers(id), data);
  }
getupd(userId: string): Observable<any> {
    return this.httpDispatcher.get<any>(routes.users.getupd(userId));
  }

 getById(userId: string): Observable<any> {
    return this.httpDispatcher.get<any>(routes.users.getusr(userId));
  }


 getByeml(username: string): Observable<any> {
    return this.httpDispatcher.get<any>(routes.users.getusrbyml(username));
  }

}
