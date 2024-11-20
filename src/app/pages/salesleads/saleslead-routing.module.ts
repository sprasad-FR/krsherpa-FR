import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { SalesleadComponent } from './saleslead/saleslead.component';
import { SalesleadlistComponent } from './salesleadlist/salesleadlist.component';
import { MySalesleadlistComponent } from './mysalesleadlist/mysalesleadlist.component';

const routes: Routes = [
  {
    path: 'saleslead',
    component: SalesleadComponent
  },
    {
    path: 'mysales',
    component: MySalesleadlistComponent
  },
  {
    path: 'list',
   component: SalesleadlistComponent
  },
 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule {}
