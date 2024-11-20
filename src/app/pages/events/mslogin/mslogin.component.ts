

import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { GraphService, ProviderOptions } from '../../../core/services/graph.service';
import { protectedResources } from '../../../core/services/msal-config';



type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

//const log = new Logger('Events Component');
@Component({
   selector: 'my-login',  
    template: '<div class="button"><button class="btn btn-primary" (click)="login()">login</button></div>' 
 
 
})


  
export class EventloginComponent implements OnInit, OnDestroy {

 isIframe = false;
  loginDisplay = false;
  
private readonly _destroying$ = new Subject<void>();
  constructor(

 @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private graphService: GraphService,
    private msalBroadcastService: MsalBroadcastService,


  ) {
   // this.whoaim = JSON.parse(localStorage.getItem('user'));
   // this.empList = JSON.parse(window.localStorage.getItem('emp'));
   // this.roles = this.whoaim?.roles[0];
  }

  

  ngOnInit(): void {
   // this.id = this.route.snapshot.paramMap.get('id');
  


 this.isIframe = window !== window.parent && !window.opener;

    /**
     * You can subscribe to MSAL events as shown below. For more info,
     * visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/events.md
     */
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });


  }

 


/**********gs ***************/


/**********gs ***************/
  


 //var newmail




  getUTCdate(d: Date) {
    let complete = Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds()
    );
    return parseInt(complete.toString().substring(0, 10));
  }

  addMinsToDate(d: Date, mins: number) {
    return new Date(d.getTime() + mins * 60000);
  }

// unsubscribe to events when component is destroyed   

/***************gs *MSAL*********************/
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }



 isready:any;
dataSource:any;
  getProfile(providerOptions: ProviderOptions) {

     console.log('getProfile called');
    this.graphService.getGraphClient(providerOptions)
    .api('/me').get()
    .then((profileResponse: ProfileType) => {

       console.log('getProfile got response');
       console.log(profileResponse);
      this.isready=1;
      this.dataSource = [
        {id: 1, claim: "Name", value: profileResponse ? profileResponse['givenName'] : null},
        {id: 2, claim: "Surname", value: profileResponse ? profileResponse['surname'] : null},
        {id: 3, claim: "User Principal Name (UPN)", value: profileResponse ? profileResponse['userPrincipalName'] : null},
        {id: 4, claim: "ID", value: profileResponse ? profileResponse['id']: null}
      ];

       console.log(this.dataSource);
    })
    .catch((error) => {
      console.log(error);
    });
  }



  login() {

     console.log(' this.authService.instance');
 console.log( this.authService.instance);

    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest){
        this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
        } else {
          this.authService.loginPopup()
            .subscribe((response: AuthenticationResult) => {
              this.authService.instance.setActiveAccount(response.account);
            });
      }
    } else {
      if (this.msalGuardConfig.authRequest){
        this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    }
  }


  checkAndSetActiveAccount(){
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }


 




  logout() {
    this.authService.logout();
  }





/*
  login() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest){
        this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
        } else {
          this.authService.loginPopup()
            .subscribe((response: AuthenticationResult) => {
              this.authService.instance.setActiveAccount(response.account);
            });
      }
    } else {
      if (this.msalGuardConfig.authRequest){
        this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    }
  }*/


/***************gs *MSAL*********************/
}
