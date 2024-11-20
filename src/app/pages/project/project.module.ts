
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './project-routing.module';
import { ProjectslistComponent } from './projectslist/projectslist.component';
import { DateToLocalPipe,GetShortPipe,getCompanyTypePipe,GetInitialsPipe } from './pipe';
// DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe 

import { ClientComplianceComponent } from './client-compliance/client-compliance.component';

//import { NgbAlertModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { complianceActionsModule } from '../compliance/complianceActions.module';
//import { ChatBoxComponent } from '../../chat-box/chat-box.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
//**************************** */ 
import { ChatBoxcComponent } from './chat-boxc/chat-boxc.component';
//import { NgbNavModule, NgbDropdownModule, NgbAccordionModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


// Swiper Slider
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
// Select Droup down

import { OverviewComponent } from './overview/overview.component';
import { MainTabsComponent } from './main-tabs/main-tabs.component';
import { ProjectFlowComponent } from './project-flow/project-flow.component';
import { EventsComponent } from './events/events.component';
import { AttachmentsComponent } from './attachments/attachments.component';

import { CreateLeadFormComponent } from './project-flow/create-lead-form/create-lead-form.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { LeadAttachComponent } from './lead-attach/lead-attach.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

import { ProjecttabComponent } from './projecttab/projecttab.component';

import { ExpertlistComponent } from './expertlist/expertlist.component';

/*
// Flatpicker
import { FlatpickrModule } from 'angularx-flatpickr';

// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { ArchwizardModule } from 'angular-archwizard';
import { UIModule } from '../../shared/ui/ui.module';
*/

// Ng Search 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {
  NgbAlertModule, NgbCarouselModule, NgbDropdownModule, NgbModalModule, NgbProgressbarModule,
  NgbTooltipModule, NgbPopoverModule, NgbPaginationModule, NgbNavModule, NgbAccordionModule,
  NgbCollapseModule, NgbToastModule
} from '@ng-bootstrap/ng-bootstrap';
// Load Icon
//import { defineLordIconElement } from 'lord-icon-element';
//import lottie from 'lottie-web';

// Component pages

//import { SharedModule } from '../../shared/shared.module';
//import { ToastrService,ToastrModule  } from 'ngx-toastr';

// Sorting page
import { NgbdGridJsSortableHeader } from './projectslist/projects-sortable.directive';
import { NgbdGridJsexSortableHeader } from './expertlist/expert-sortable.directive';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [  NgbdGridJsSortableHeader,NgbdGridJsexSortableHeader,ProjectslistComponent,
    OverviewComponent,
    ChatBoxComponent,
    ChatBoxcComponent,
    ProjecttabComponent,
    ExpertlistComponent,
    MainTabsComponent,
    ClientComplianceComponent,
    ProjectFlowComponent,
    EventsComponent,
    AttachmentsComponent,
    CreateLeadFormComponent,
    ProjectFormComponent,
    LeadAttachComponent,
    ProjectDetailsComponent,
    DateToLocalPipe,GetShortPipe,getCompanyTypePipe,GetInitialsPipe 
  ],

  imports: [
   // CommonModule,
    ProjectsRoutingModule,
   // ArchwizardModule,
   // UIModule,
   
    SharedModule,
    NgbModalModule,
    CKEditorModule,
    NgbPaginationModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
NgbPopoverModule, 
    complianceActionsModule,   
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbTooltipModule,
    NgbPaginationModule,
    SwiperModule,
    NgSelectModule,
  //  FlatpickrModule, 
  //  FeatherModule.pick(allIcons),
    Ng2SearchPipeModule,
   

    
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
      
    },
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //exports: [CreateExpertComponent],
})
export class ProjectModule {}
