import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { ClientComponent } from './client/client.component';
import { ClientlistComponent } from './clientlist/clientlist.component';
const routes: Routes = [
  {
    path: 'client',
    component: ClientComponent
  },
  {
    path: 'clientlist',
   component: ClientlistComponent
  },
 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule {}
