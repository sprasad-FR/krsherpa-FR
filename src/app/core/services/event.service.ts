
import { Event as Events } from '../models/event.model';
import { Injectable } from '@angular/core';
import { HttpDispatcherService } from '../http/http-dispatcher.service';
import { Subject, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

interface Event {
  type: string;
  payload?: any;
}
const routes = {
  events: {
    getAll: (filters?: Map<string, string>) => (filters ? `/events?${filters.toSanitizedURLFilters()}` : `/events`),
    get: (id: string) => `/events/${id}`,
    create: () => `/events`,
    update: (id: string) => `/events/${id}`,
    delete: (id: string) => `/events/${id}`,
    updateOnly: (id: string) => `/events/${id}`,
  },
};
type EventCallback = (payload: any) => void;

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private httpDispatcher: HttpDispatcherService) {}
  // Get list of all available lead comments
  getAll(filters?: Map<string, string>): Observable<Events[]> {
    return this.httpDispatcher.get<Events[]>(routes.events.getAll(filters));
  }

  // Get only selected lead comment
  show(id: string): Observable<Events> {
    return this.httpDispatcher.get<Events>(routes.events.get(id));
  }

  // Create new lead comment
  create(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.events.create(), data);
  }

  // Update lead comment
  update(id: string, events: Events): Observable<any> {
    return this.httpDispatcher.put(routes.events.update(id), events);
  }

  // Update specific field event
  updateOnly(id: string, events: any): Observable<any> {
    return this.httpDispatcher.patch(routes.events.update(id), events);
  }
  // Delete lead comment
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.events.delete(id));
  }
  private handler = new Subject<Event>();

  /**
   * Broadcast the event
   * @param type type of event
   * @param payload payload
   */
  broadcast(type: string, payload = {}) {
    this.handler.next({ type, payload });
  }

  /**
   * Subscribe to event
   * @param type type of event
   * @param callback call back function
   */
  subscribe(type: string, callback: EventCallback): Subscription {
    return this.handler
      .pipe(filter((event) => event.type === type))
      .pipe(map((event) => event.payload))
      .subscribe(callback);
  }
}







/*
*
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