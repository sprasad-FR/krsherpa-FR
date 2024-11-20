
import { Injectable } from '@angular/core';
import { HttpDispatcherService } from '../http/http-dispatcher.service';


import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { Subject, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';


interface Events {
    type: string;
    payload?: any;
}

//type EventCallback = (payload: any) => void;

Map.prototype.toSanitizedURLFilters = function toSanitizedURLFilter() {
  let sanitizedFilter = '';
  this.forEach((value: string, key: string) => {
    sanitizedFilter += `&${key}=${value}`;
  });
  return sanitizedFilter.substring(1);
};


const routes = {
  events: {
    getAll: (filters?: Map<string, any>) => (filters ? `/events?${filters.toSanitizedURLFilters()}` : `/events`),
    get: (id: string, filters?: Map<string, any>) =>
      filters ? `/events/${id}?${filters.toSanitizedURLFilters()}` : `/events/${id}`,
    create: () => `/events`,
    update: (id: string) => `/events/${id}`,
    delete: (id: string) => `/events/${id}`,
    getCount: (filters?: Map<string, any>) => (filters? `/eventcnt?${filters.toSanitizedURLFilters()}` : `/eventcnt`), 
    updateOnly: (id: string) => `/events/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})





export class EventkrService {


  
   /* broadcast(type: string, payload = {}) {
        this.handler.next({ type, payload });
    }

   
    subscribe(type: string, callback: EventCallback): Subscription {
        return this.handler.pipe(
            filter(event => event.type === type)).pipe(
                map(event => event.payload))
            .subscribe(callback);
    }
    private handler = new Subject<Events>();
*/
  constructor(private httpDispatcher: HttpDispatcherService) {}

  // Get list of all available event
  getAll(filters?: Map<string, any>): Observable<Event[]> {
    return this.httpDispatcher.get<Event[]>(routes.events.getAll(filters));
  }

  // Get only selected event
  show(id: string, filters?: Map<string, any>): Observable<Event> {
    return this.httpDispatcher.get<Event>(routes.events.get(id, filters));
  }

  // Create new event
  create(data: Event): Observable<any> {
    return this.httpDispatcher.post(routes.events.create(), data);
  }

  // Update event
  update(id: string, events: Event): Observable<any> {
    return this.httpDispatcher.put(routes.events.update(id), events);
  }

  // Update specific field event
  updateOnly(id: string, events: Event): Observable<any> {
    return this.httpDispatcher.patch(routes.events.update(id), events);
  }


   // Update specific field expert     getCount: (filters?: Map<string, string>) => (filters? `/expertcnt1?${filters.toSanitizedURLFilters()}` : `/expertcnt1`), 

   getCount(where: Map<string, string>): Observable<any> {
   
    return this.httpDispatcher.get(routes.events.getCount(where));
  }

  // Delete event
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.events.delete(id));
  }
}




/*
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

interface Event {
    type: string;
    payload?: any;
}

type EventCallback = (payload: any) => void;

@Injectable({
    providedIn: 'root'
})
export class EventService {

    private handler = new Subject<Event>();
    constructor() { }

   
    broadcast(type: string, payload = {}) {
        this.handler.next({ type, payload });
    }

   
    subscribe(type: string, callback: EventCallback): Subscription {
        return this.handler.pipe(
            filter(event => event.type === type)).pipe(
                map(event => event.payload))
            .subscribe(callback);
    }
}


*/