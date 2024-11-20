import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { ArchwizardModule } from 'angular-archwizard';
//import { UIModule } from '../../_shared/ui/ui.module';
import { NgbModalModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { WidgetModule } from '../../_shared/widget/widget.module';
import { SharedModule } from '../../shared/shared.module';
import { DateToLocalPipe, GetInitialsPipe,GetShortPipe} from './pipe';
import { ExpertInvoiceComponent } from './expert-invoice/expert-invoice.component';
import { ExpertInvoiceListComponent } from './expert-invoice-list/expert-invoice-list.component';
import { EditClientInvoiceComponent } from './edit-client-invoice/edit-client-invoice.component';
import { EditExpertInvoiceComponent } from './edit-expert-invoice/edit-expert-invoice.component';
import { IncentivesComponent } from './incentives/incentives.component';
import { IncentiveListComponent } from './incentive-list/incentive-list.component';
import { TaxComponent } from './taxes/taxes.component';
import { msaClientsComponent } from './msa-Clients/msaClients.component';
import { AccountingmiscComponent } from './accountingmisc/accountingmisc.component';
@NgModule({
  declarations: [
    GenerateInvoiceComponent,
    InvoiceListComponent,
    ExpertInvoiceComponent,
    ExpertInvoiceListComponent,
    EditClientInvoiceComponent,
    EditExpertInvoiceComponent,
    IncentivesComponent,
    IncentiveListComponent,
    TaxComponent,
    DateToLocalPipe, GetInitialsPipe,GetShortPipe,
    msaClientsComponent,
    AccountingmiscComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountingRoutingModule,
    ArchwizardModule,
   // UIModule,
    NgbModalModule,
    CKEditorModule,
    NgbPaginationModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
  //  WidgetModule,
  
  ],
})
export class AccountingModule {}
