import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbDropdownModule, NgbAccordionModule, NgbTooltipModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DateToLocalPipe, GetInitialsPipe} from './pipe';
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
import { SalesleadComponent } from './saleslead/saleslead.component';

import { LeadDetailsComponent } from './lead-details/lead-details.component';


import { SalesleadlistComponent } from './salesleadlist/salesleadlist.component';
import { MySalesleadlistComponent } from './mysalesleadlist/mysalesleadlist.component';
import { ClientRoutingModule } from './saleslead-routing.module';
//import { GridjsComponent } from './gridjs/gridjs.component';

// Sorting page
import { NgbdGridJsSortableHeader } from './salesleadlist/saleslead-sortable.directive';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    SalesleadComponent,
    SalesleadlistComponent,
    MySalesleadlistComponent,
    NgbdGridJsSortableHeader,
    DateToLocalPipe, GetInitialsPipe,
    LeadDetailsComponent
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
    ClientRoutingModule,
    SharedModule,
    FeatherModule.pick(allIcons),
    Ng2SearchPipeModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesLeadModule { 
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
}
