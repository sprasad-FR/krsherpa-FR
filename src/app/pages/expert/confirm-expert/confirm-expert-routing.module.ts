import { componentFactoryName } from '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmExpertComponent } from './confirm-expert.component';
export function extract(s: string) {
  return s;
}
const routes: Routes = [
  {
    path: 'confirm-expert/:id',
    component: ConfirmExpertComponent,
    data: { title: extract('Expert Confirmation') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmExpertRoutingModule {}
