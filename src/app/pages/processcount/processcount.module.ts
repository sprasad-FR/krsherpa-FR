import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbDropdownModule, NgbAccordionModule, NgbTooltipModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

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
import {processcountComponent } from './processcount.component';

import { ProcesscountRoutingModule } from './processcount-routing.module';

import {RateCardComponent } from './rate-card/rate-card.component';
import {MnsProjectsComponent } from './mns-projects/mns-projects.component';
import {BillingComponent } from './billing/billing.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    processcountComponent,
    RateCardComponent,
    MnsProjectsComponent,
    BillingComponent,
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
    SharedModule,
    FeatherModule.pick(allIcons),
    Ng2SearchPipeModule,
    ProcesscountRoutingModule    
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class processcountModule { 
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
}
