import { Notifications } from './../models/notifications.model';
import { Injectable } from '@angular/core';
import { HttpDispatcherService } from '../http/http-dispatcher.service';

//import { create } from 'domain';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Observable } from 'rxjs';
// const Nylas = require('nylas');
// const _clientId = '6iu4nt3e77ytgn6o9ef2twgzy';
// const _clientSecret = '9q7degwh0hpxo3cbj0nbksgt';
// const _access_token = 'EzwVQofuHabCxAWeCqSzhryjysZcdH';
// Nylas.config({ clientId: _clientId, clientSecret: _clientSecret });
// const nylas = Nylas.with(_access_token);

const routes = {
  email: {
    getAll: (filters?: Map<string, string>) =>
      filters ? `/notifications?${filters.toSanitizedURLFilters()}` : `/notifications`,
    get: (id: string) => `/notifications/${id}`,
    multiple: () => `/notifications/multiple`,
    update: (id: string) => `/notifications/${id}`,
    delete: (id: string) => `/notifications/${id}`,
    calendarInvite: () => '/notifications/calendarInvite',
  },
};

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  userData: any;
  constructor(private readonly httpDispatcher: HttpDispatcherService) {
    this.userData = JSON.parse(localStorage.getItem('user')!);
  }

  public sendEmail(templateId: string, arrEmails: string[], alertType:any, templateParams: any) {



let emails=arrEmails;
//emails.push('amit.kubade@knowledgeridge.com');

    let emailObj = {
      sender: this.userData.username,
      from:this.userData.firstName,
      sendername:this.userData.firstName,
      currentUser: templateParams?.currentUser,
      link: templateParams?.link,
      name: templateParams?.name,
      title: templateParams?.emailData?.title,
      description: templateParams?.emailData?.description,
      receiverList:emails,// arrEmails,
      flag: false,
      Module:templateParams?.Module,
     Action: templateParams?.Action,
      Actiontype:templateParams?.Actiontype,
      notificationType: templateParams?.notificationType,
    };

console.log ('in email');
console.log (emailObj);
   // templateParams.notificationType = 'skipEmail' //gs to be removed

    this.multiple(emailObj).subscribe((data) => {
      if (templateParams?.notificationType == 'skipEmail') {
        return;
      } else {
        if (
          alertType == 'Informative' ||
          alertType == 'Informative & approval' ||
          alertType == 'Informative & System Prompt'
        ) {

          templateParams['toEmails'] = arrEmails.join(',');
        
          if (templateParams['toEmails'].length > 0) {
          emailjs.send('service_nka60xg', templateId, templateParams, 'q7Oh-_kjt-nIU8vwI').then(
              function (response) {
                console.log('SUCCESS!', response.status, response.text);
              },
              function (error) {
                console.log('FAILED...', error);
              }
            );
          } else {
            console.log('email not send');
          }
        }
      }
    });
  }


  public sendComplianceEmail(templateId: string, arrEmails: string[], alertType:any, templateParams: any) {
   
   
   
    /*
    let emailObj = {
      sender: this.userData.username,
      currentUser: templateParams?.currentUser,
      link: templateParams?.link,
      title: templateParams?.emailData?.title,
      description: templateParams?.emailData?.description,
      receiverList: arrEmails,
      flag: false,
      notificationType: templateParams?.notificationType,
    };
*/
    templateParams['toEmails'] = arrEmails.join(',');
          if (templateParams['toEmails'].length > 0) {
            emailjs.send('service_nka60xg', templateId, templateParams, 'q7Oh-_kjt-nIU8vwI').then(
              function (response) {
                console.log('SUCCESS!', response.status, response.text);
              },
              function (error) {
                console.log('FAILED...', error);
              }
            );
          } else {
            console.log('email not send');
          }
    
  }




  multiple(arrEmails: any): Observable<any> {
    return this.httpDispatcher.post(routes.email.multiple(), arrEmails);
  }

  getAll(filters?: Map<string, string>): Observable<Notifications[]> {
    return this.httpDispatcher.get<Notifications[]>(routes.email.getAll(filters));
  }

  update(id: string, email: Notifications): Observable<any> {
    // localStorage.removeItem('email');
    return this.httpDispatcher.put(routes.email.update(id), email);
  }

  invite(data: any): Observable<any> {
    return this.httpDispatcher.post(routes.email.calendarInvite(), data);
  }

  sentInvitation(data:any) {
    console.log('******Calnders. ');
    this.invite(data).subscribe((data) => {
      console.log('Success', data);
    });

    ///nylas.calendars.list().then((calendars) => console.log(calendars));
    // var axios = require('axios');

    // var config = {
    //   method: 'post',
    //   url: 'https://knowledgeridge-ams.com/api/SHERPAEvents',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: data,
    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }
}
