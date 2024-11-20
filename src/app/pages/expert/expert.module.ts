
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard';
import { UIModule } from '../../shared/ui/ui.module';
import { ExpertRoutingModule } from './expert-routing.module';
import { CreateExpertComponent } from './create-expert/create-expert.component';
import { ExpertDetailsComponent } from './expert-details/expert-details.component';
import { ExpertlistComponent } from './expertlist/expertlist.component';
import { AllocationlistComponent } from './allocationlist/allocationlist.component';
import { DateToLocalPipe,getCompanyTypePipe,GetShortPipe,GetInitialsPipe } from './pipe';
import { EXAttachmentsComponent } from './exattachments/exattachments.component';

import { ExpertComponent } from './expert/expert.component';

import { NgbAlertModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
//import { complianceActionsModule } from '../compliance/complianceActions.module';

//**************************** */

import { NgbNavModule, NgbDropdownModule, NgbAccordionModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
// Select Droup down

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

//import { SharedModule } from '../../shared/shared.module';
//import { ToastrService,ToastrModule  } from 'ngx-toastr';

// Sorting page
import { NgbdGridJsSortableHeader } from './expertlist/expert-sortable.directive';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [ExpertComponent,   EXAttachmentsComponent,GetShortPipe, DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe ,CreateExpertComponent,  NgbdGridJsSortableHeader,AllocationlistComponent, ExpertDetailsComponent, ExpertlistComponent],

  imports: [
    CommonModule,
    ExpertRoutingModule,
    ArchwizardModule,
    UIModule,
    SharedModule,
 
    NgbModalModule,
    CKEditorModule,
    NgbPaginationModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
   // complianceActionsModule,   
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
    FeatherModule.pick(allIcons),
    Ng2SearchPipeModule,

    
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
      
    },
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [CreateExpertComponent],
})
export class ExpertModule {}
