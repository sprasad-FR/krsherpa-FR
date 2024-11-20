import { ExpertInvoiceListComponent } from './expert-invoice-list/expert-invoice-list.component';
import { ExpertInvoiceComponent } from './expert-invoice/expert-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n';
import { IncentivesComponent } from './incentives/incentives.component';
import { IncentiveListComponent } from './incentive-list/incentive-list.component';
import { TaxComponent } from './taxes/taxes.component';
import { msaClientsComponent } from './msa-Clients/msaClients.component';
import { AccountingmiscComponent } from './accountingmisc/accountingmisc.component';

const routes: Routes = [
  {
    path: 'client-invoice',
    component: GenerateInvoiceComponent,
    data: { title: extract('Client Invoice') },
  },
  {
    path: 'Taxes',
    component: TaxComponent,
    data: { title: extract('Client Taxes') },
  }
  ,
  {
    path: 'Miscellaneous',
    component: AccountingmiscComponent,
    data: { title: extract('Accounting Misc') },
  },
  {
    path: 'incentives',
    component: IncentivesComponent,
    data: { title: extract('Client Invoice') },
  },
  
  {
    path: 'incentive-list',
    component: IncentiveListComponent,
    data: { title: extract('Incentive List') },
  },
  {
    path: 'client-invoice-list',
    component: InvoiceListComponent,
    data: { title: extract('Client Invoice') },
  },
  { 
    path: 'edit-client/:id',
   component: InvoiceListComponent, 
   data: { title: extract('Update Client Invoice') },
  },
  {
    path: 'expert-invoice',
    component: ExpertInvoiceComponent,
    data: { title: extract('Expert Invoice') },
  },
  {
    path: 'expert-invoice-list',
    component: ExpertInvoiceListComponent,
    data: { title: extract('Expert Invoice') },
  },
 {
    path: 'msaClients',
    component: msaClientsComponent,
    data: { title: extract('MSA Clients') },
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingRoutingModule {}
