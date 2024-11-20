import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import {processcountComponent } from './processcount.component';

import {RateCardComponent } from './rate-card/rate-card.component';

import {MnsProjectsComponent } from './mns-projects/mns-projects.component';
import {BillingComponent } from './billing/billing.component';


const routes: Routes = [
  {
    path: 'processcount',
    component: processcountComponent
  },
  {
    path: 'ratecard',
    component: RateCardComponent
  },
  {
    path: 'CheckMNS',
    component: MnsProjectsComponent
  },
  {
    path: 'billing',
    component: BillingComponent
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcesscountRoutingModule {}
