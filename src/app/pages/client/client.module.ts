import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbDropdownModule, NgbAccordionModule, NgbTooltipModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DateToLocalPipe, GetInitialsPipe,GetShortPipe} from './pipe';
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
import { PipesModule } from '../../pipe/pipes.module';

import { ClientComponent } from './client/client.component';
import { ProjectslistComponent } from './projectslist/projectslist.component';

import { ClientlistComponent } from './clientlist/clientlist.component';

import { ClientComplianceComponent } from './client-compliance/client-compliance.component';
import { ClientRoutingModule } from './client-routing.module';
//import { GridjsComponent } from './gridjs/gridjs.component';
//import { ProjectModule } from '../project/project.module';
// Sorting page
import { NgbdGridJsSortableHeader } from './clientlist/client-sortable.directive';

import { NgbdGridJsPrjSortableHeader } from './projectslist/projects-sortable.directive';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    ClientComponent,
    ClientlistComponent,
    ProjectslistComponent,
    NgbdGridJsSortableHeader,
    NgbdGridJsPrjSortableHeader,
    ClientComplianceComponent,
   DateToLocalPipe, GetInitialsPipe,GetShortPipe
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
    Ng2SearchPipeModule,
    PipesModule,

  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientModule { 
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
}
