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
import { EmployeeComponent } from './employee/employee.component';

import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EmployeeRoutingModule } from './employee-routing.module';
//import { GridjsComponent } from './gridjs/gridjs.component';

// Sorting page
import { NgbdGridJsSortableHeader } from './employeelist/employee-sortable.directive';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeelistComponent,
    NgbdGridJsSortableHeader
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
    EmployeeRoutingModule,
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
export class EmployeeModule { 
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
}
