import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateExpertComponent } from './create-expert/create-expert.component';
import { ExpertDetailsComponent } from './expert-details/expert-details.component';
import { ExpertlistComponent } from './expertlist/expertlist.component';


import { ExpertComponent } from './expert/expert.component';

import { AllocationlistComponent } from './allocationlist/allocationlist.component';

import { extract } from '../../../app/i18n';
import { ConfirmExpertComponent } from './confirm-expert/confirm-expert.component';

export class EventsRoutingModule {}
const routes: Routes = [
  {
    path: 'expertlist',
    component: ExpertlistComponent,
    data: { title: extract('Experts') },
  },
    {
    path: 'allocationlist',
    component: AllocationlistComponent,
    data: { title: extract('Allocation') },
  },
  {
    path: 'signups',
    component: ExpertlistComponent,
    data: { title: extract('signups')  },
  },
  {
    path: 'confirm-expert/:id',
    component: ConfirmExpertComponent,
    data: { title: extract('Expert Confirmation') },
  },
  {
    path: 'expertlist/:searchKey',
    component: ExpertlistComponent,
    data: { title: extract('Experts') },
  },
  {
    path: 'create-expert',
    component: CreateExpertComponent,
  },
  {
    path: 'expert-view/:id',
    component: ExpertComponent,
  },
  {
    path: 'expert-details/:id',
    component: ExpertDetailsComponent,
  },

  {
    path: 'expert-edit/:id',
    component: ExpertComponent, //CreateExpertComponent,
    data: { title: extract('Update Expert') },
  },
  {
    path: 'expertlist/:id/:status',
    component: ExpertlistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpertRoutingModule {}
