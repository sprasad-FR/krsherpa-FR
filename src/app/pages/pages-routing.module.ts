import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from "./dashboards/dashboard/dashboard.component";
import { THDashboardComponent } from './dashboards/THDashboard/THDashboard.component';
import { RegularComponent } from "./dashboards/regular/regular.component";
//import { ConfirmExpertComponent } from './confirm-expert/confirm-expert.component';
//import { ConfirmExpertComponent } from '../confirm-expert/confirm-expert.component';


const routes: Routes = [
    {
        path: "",
        component: THDashboardComponent  // component: DashboardComponent
    },
    {
      path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
     // path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.RegularComponent)
    },
    {
      path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
    }, 
    {
      path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
    },
    {
    path: 'accounting', loadChildren: () => import('./accounting/accounting.module').then(m => m.AccountingModule)
    },
    {
      path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
    },   
   
       {
      path: 'expert', loadChildren: () => import('./expert/expert.module').then(m => m.ExpertModule)
    },
    {
      path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
    },
      /*   {
      path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
    },
    {
      path: 'salesleads', loadChildren: () => import('./salesleads/saleslead.module').then(m => m.SalesLeadModule)
    },    */
    {
      path: 'salesleads', loadChildren: () => import('./salesleads/saleslead.module').then(m => m.SalesLeadModule)
    }, 
    {
      path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule)
    },
     {
      path: 'krprojects', loadChildren: () => import('./krprojects/krpojects.module').then(m => m.KRProjectsModule)
    },
    {
      path: 'projectslist', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule)
    }, 
    {
      path: 'projectsall', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)
    },
    {
      path: 'process', loadChildren: () => import('./processcount/processcount.module').then(m => m.processcountModule)
    },
  /*    {
      path: 'ratecard', loadChildren: () => import('./rate-card/rate-card-routing.module').then(m => m.RateCardRoutingModule)
    },
    
    
   
    //import { ProjectlstModule } from './project/project.module';
   { 
      path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
    },*/
    {
      path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
    },
    {
      path: 'crm', loadChildren: () => import('./crm/crm.module').then(m => m.CrmModule)
    },
    {
      path: 'crypto', loadChildren: () => import('./crypto/crypto.module').then(m => m.CryptoModule)
    },
    {
      path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule)
    },
    {
      path: 'tickets', loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule)
    },
    {
      path: 'pages', loadChildren: () => import('./extrapages/extraspages.module').then(m => m.ExtraspagesModule)
    },
    { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
    {
      path: 'advance-ui', loadChildren: () => import('./advance-ui/advance-ui.module').then(m => m.AdvanceUiModule)
    },
    {
      path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule)
    },
    {
      path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
    },
    {
      path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
    },
    {
      path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)
    },
    {
      path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
    },
  
   /* {
      path: '',
      component: ConfirmExpertComponent,
      loadChildren: () => import('../confirm-expert/confirm-expert.module').then((e) => e.ConfirmExpertModule),
    },  */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
