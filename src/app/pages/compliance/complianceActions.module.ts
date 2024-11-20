import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe } from '../../core/pipe';
import { ClientRoutingModule } from '../client/client-routing.module';
//import { ClientsComponent } from './clients/clients/clients.component';
//import { ClientAssignmentsComponent } from './clients/client-assignments/client-assignments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbAlertModule,
  NgbNavModule,
  NgbPaginationModule,
  NgbProgressbarModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '../../shared/ui/ui.module';
import { SharedModule } from '../../shared';
//import { ClientFormComponent } from './clients/client-form/client-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';
//import { ClientDetailsComponent } from './clients/client-details/client-details.component';
//import { ClientComplianceComponent } from './clients/client-compliance/client-compliance.component';
//import { ClientMainTabsComponent } from './clients/client-main-tabs/client-main-tabs.component';
//import { ClientUserComponent } from './clients/client-user/client-user.component';

//import { ClientProjectsComponent } from './clients/client-projects/client-projects.component';
import { complianceActionsComponent } from './complianceActions/complianceActions.component';
import { complianceFlagComponent } from './complianceFlag/complianceFlag.component';

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
    NgbProgressbarModule,
    NgbPaginationModule,
    ClientRoutingModule,
    UiSwitchModule,

  ],
  declarations: [complianceActionsComponent, complianceFlagComponent],
  exports: [complianceActionsComponent, complianceFlagComponent],
})
export class complianceActionsModule {}
