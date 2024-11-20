// import { AngularFileUploaderModule } from 'angular-file-uploader';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {
  NgbAlertModule,
  NgbModalModule,
  NgbNavModule,
  NgbPaginationModule,
  NgbProgressbarModule,
  NgbTooltipModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '@app/@shared/ui/ui.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { FormlyModule } from '@ngx-formly/core';
// import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { SalesRoutingModule } from './sales-routing.module';

import { CreateLeadComponent } from './create-lead/create-lead.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { SalesBoardComponent } from '../sales-board/sales-board.component';
import { KanbanboardComponent } from '../kanban-board/kanbanboard.component';

import { SalesLeadService } from '@app/@core/services/sales-lead.service';
import { SalesLeadContactService } from '@app/@core/services/sales-lead-contact.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { DateToLocalPipe, getCompanyTypePipe } from '@app/@pipe';
import { SharedModule } from '@app/@shared';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { complianceActionsModule } from '../complianceActions.module';
//complianceActionsModule
const config: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 100,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UIModule,
    SharedModule,
    NgbNavModule,
    NgbAlertModule,
    NgSelectModule,
    NgbTypeaheadModule,
    NgbModalModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    NgbPaginationModule,
    DropzoneModule,
    // CKEditorModule,
    // FormlyBootstrapModule,
    // FormlyModule.forRoot(),
    SalesRoutingModule,
    NgxDropzoneModule,
    CKEditorModule,
    complianceActionsModule,
    // AngularFileUploaderModule,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: config,
    },
    SalesLeadService,
    SalesLeadContactService,
  ],
  declarations: [
    CreateLeadComponent,
    LeadDetailsComponent,
    SalesBoardComponent,
    KanbanboardComponent,
    getCompanyTypePipe,
  ],
})
export class SalesModule {}
