import { Injectable } from '@angular/core';
import { HttpDispatcherService } from '../http/http-dispatcher.service';
import { Observable } from 'rxjs';
import { bdpUser } from '../models/bdp.model';

const routes = {
  contact: {
    getAll: (filters?: Map<string, string>) => (filters ? `/bdps?${filters.toSanitizedURLFilters()}` : `/bdps`),
    get: (id: string) => `/bdps/${id}`,
    create: () => `/bdps`,
    update: (id: string) => `/bdps/${id}`,
    delete: (id: string) => `/bdps/${id}`,
    getlinks: () => `/experts/submit`,
    submitExperts: () => `/experts/submit`,
    rejectExperts: () => '/experts/${network_expert_id}/reject',
    connectprojects: () => '/projects/connect',   
    connectworkstreams : () => '/workstreams/connect', 
    connectcalls : () => '/calls/connect', 
    calls : () => '/calls',  
    meetingdetails : () => "/calls/${network_call_id}/meeting/details",
    cancel : () => '/calls/${network_call_id}/cancel',
    info : () => '/calls/${network_call_id}/info',
    status : () => '/calls/${network_call_id}/status',
    audio : () => '/calls/${network_call_id}/audio',
    messageschat : () => '/chat/messages',
    invoice : () => '/invoice',
    sendexperts: () => `/sendexpert`,
    sendslot: () => `/sendslot`,    
    sendmsg: () => `/sendmsg`,    
  },
};


@Injectable({
  providedIn: 'root',
})



export class mckService {

  constructor(private readonly httpDispatcher: HttpDispatcherService) {}

  // Get list of all available contacts
  getAll(filters?: Map<string, string>): Observable<bdpUser[]> {
    return this.httpDispatcher.get<bdpUser[]>(routes.contact.getAll(filters));
  }

  // Get only selected contact
  getById(id: string): Observable<bdpUser> {
    return this.httpDispatcher.get<bdpUser>(routes.contact.get(id));
  }

  // Create new contact
  create(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.contact.create(), data);
  }

  // Update contact
  update(id: string, contact: bdpUser): Observable<any> {
    return this.httpDispatcher.put(routes.contact.update(id), contact);
  }

  // Delete contact
  delete(id: string): Observable<any> {
    return this.httpDispatcher.delete(routes.contact.delete(id));
  }
  // Delete contact
  getlinks(data: any): Observable<any> {
    return this.httpDispatcher.postmiddle(routes.contact.getlinks(), data);
   // return this.httpDispatcher.delete(routes.contact.getlinks(id));
  }

  submitExperts(data: any): Observable<any> {
    return this.httpDispatcher.postmiddle(routes.contact.submitExperts(), data);
     }



 rejectExperts(data: any): Observable<any> {
    return this.httpDispatcher.postmiddle(routes.contact.rejectExperts(), data);
     }



connectprojects(data: any): Observable<any> {
    return this.httpDispatcher.postmiddle(routes.contact.connectprojects(), data);
     }




 connectworkstreams(data: any): Observable<any> {
    return this.httpDispatcher.postmiddle(routes.contact. connectworkstreams(), data);
     }



connectcalls(data: any): Observable<any> {
    return this.httpDispatcher.postmiddle(routes.contact. connectcalls(), data);
     }


calls(data: any): Observable<any> {
    return this.httpDispatcher.postmiddle(routes.contact. calls(), data);
     }


meetingdetails(data: any): Observable<any> {
    return this.httpDispatcher.postmiddle(routes.contact. meetingdetails(), data);
     }


cancel(data: any): Observable<any> {
    return this.httpDispatcher.postmiddle(routes.contact. cancel(), data);
     }



info(data: any): Observable<any> {
    return this.httpDispatcher.postmiddle(routes.contact. info(), data);
     }



status(data: any): Observable<any> {
    return this.httpDispatcher.postmiddle(routes.contact. status(), data);
     }


audio(data: any): Observable<any> {
    return this.httpDispatcher.postmiddle(routes.contact. audio(), data);
     }


messageschat(data: any): Observable<any> {
    return this.httpDispatcher.postmiddle(routes.contact. messageschat(), data);
     }



invoice(data: any): Observable<any> {
    return this.httpDispatcher.postmiddle(routes.contact. invoice(), data);
     }

sendExpertToMCK(data: any): Observable<any> {
  console.log('sendExpertToMCK')
return this.httpDispatcher.postmiddle(routes.contact.sendexperts(), data);
  }    


sendSlotToMCK(data: any): Observable<any> {
  return this.httpDispatcher.postmiddle(routes.contact.sendslot(), data);
    }    
    

sendMsgToMCK(data: any): Observable<any> {
  return this.httpDispatcher.postmiddle(routes.contact.sendmsg(), data);
    }    
      

}
