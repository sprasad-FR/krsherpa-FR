import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbDropdownModule, NgbAccordionModule, NgbTooltipModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe,GetShortPipe } from './pipe';
// Swiper Slider
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';
// Flatpicker
import { FlatpickrModule } from 'angularx-flatpickr';

// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// Ng Search 
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Load Icon
import { defineLordIconElement } from 'lord-icon-element';
import lottie from 'lottie-web';

// Component pages

import { SharedModule } from '../../shared/shared.module';
//import { ClientComponent } from './client/client.component';
import { EventslistComponent } from './eventslist/eventslist.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventtabComponent } from './eventtab/eventtab.component';
import { EventsRoutingModule } from './events-routing.module';
//import { GridjsComponent } from './gridjs/gridjs.component';

// Sorting page


import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';

import { NgbdGridJsSortableHeader } from './eventslist/events-sortable.directive';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';

import { msalConfig, loginRequest, protectedResources } from '../../core/services/auth-config';
import { GraphService, ProviderOptions } from '../../core/services/graph.service';



export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  protectedResourceMap.set(protectedResources.graphMe.endpoint, protectedResources.graphMe.scopes);
  protectedResourceMap.set(protectedResources.armTenants.endpoint, protectedResources.armTenants.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}


export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest
  };
}





const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    EventtabComponent,
    EventslistComponent,
    EventDetailsComponent,
    NgbdGridJsSortableHeader,
    DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe,GetShortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbTooltipModule,
    NgbPaginationModule,
    SwiperModule,
    NgSelectModule,
    FlatpickrModule,
    EventsRoutingModule,
    SharedModule,
    FeatherModule.pick(allIcons),
    Ng2SearchPipeModule,
    MsalModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },

 {
  provide: HTTP_INTERCEPTORS,
  useClass: MsalInterceptor,
  multi: true
},
{
  provide: MSAL_INSTANCE,
  useFactory: MSALInstanceFactory
},
{
  provide: MSAL_GUARD_CONFIG,
  useFactory: MSALGuardConfigFactory
},
{
  provide: MSAL_INTERCEPTOR_CONFIG,
  useFactory: MSALInterceptorConfigFactory
},
MsalService,
MsalGuard,
MsalBroadcastService,
GraphService
  ],
 
  bootstrap: [ MsalRedirectComponent]
})
export class EventsModule { 
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
}
