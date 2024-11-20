import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { AnalyticsComponent } from "./analytics/analytics.component";
import { CrmComponent } from "./crm/crm.component";
import { CryptoComponent } from "./crypto/crypto.component";
import { ProjectsComponent } from "./projects/projects.component";
import { pldbComponent } from "./pldb/pldb.component";
import { RegularComponent } from "./regular/regular.component";
import { RmdbComponent } from "./RM/rmdb.component";
import { NftComponent } from "./nft/nft.component";
import { CleintDBComponent } from "./CleintDB/CleintDB.component";
import { THDashboardComponent } from './THDashboard/THDashboard.component';
import { plDashboardComponent } from "./pl/pldb.component";

const routes: Routes = [
  {
    path: '',
    component: THDashboardComponent
  },
    {
        path: "analytics",
        component: AnalyticsComponent
    },
    {
      path: "crm",
      component: CrmComponent
    },
    {
      path: "crypto",
      component: CryptoComponent
    },
    {
      path: "projects",
      component: ProjectsComponent
    },
     {
      path: "regular",
      component:THDashboardComponent  //RegularComponent
    },
    {
      path: "dashboard",
      component: THDashboardComponent
    },
     {
      path: "rmdb",
      component: RmdbComponent
    },
     {
      path: "pl",
      component: pldbComponent
    },
     {
      path: "plDashboard",
      component: plDashboardComponent
    },
    
    {
      path: "nft",
      component: NftComponent
    }
    ,
    {
      path: "ClientDB",
      component: CleintDBComponent
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardsRoutingModule { }
