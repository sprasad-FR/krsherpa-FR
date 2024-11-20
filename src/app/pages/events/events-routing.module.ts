import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventDetailsComponent } from './event-details/event-details.component';
// Component pages
//import { ClientComponent } from './events/events.component';
import { EventslistComponent } from './eventslist/eventslist.component';
const routes: Routes = [
 // {
  //  path: 'client',
  //  component: ClientComponent
 // },
  {
    path: 'list',
   component: EventslistComponent
  },
  {
    path: 'event/:id/:status',
    component: EventslistComponent,
  },
  {
    path: 'view/:id',
    component: EventDetailsComponent,
  }, 
  {
    path: 'event-details/:id',
    component: EventDetailsComponent,
  },
 

  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventsRoutingModule {}
