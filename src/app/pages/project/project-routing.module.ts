//import { ProjectDetailsComponent } from './project-details/project-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../../app/i18n';
//import { MainTabsComponent } from './main-tabs/main-tabs.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectslistComponent } from './projectslist/projectslist.component';

import { ProjecttabComponent } from './projecttab/projecttab.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectslistComponent,
  }, 
  {
    path: 'all',
    component: ProjectslistComponent,
  },
  {
    path: 'project/:id',
    component: ProjecttabComponent,
  },
  {
    path: 'projects/:id/:status',
    component: ProjectslistComponent,
  },
  {
    path: 'create',
    component: ProjectFormComponent,
    data: { title: extract('Create Project') },
  },
  /*
  {
    path: 'create',
    component: ProjectFormComponent,
    data: { title: extract('Create Project') },
  },
  {
    path: ':id',
    component: MainTabsComponent,
    data: { title: extract('Project Details') },
  },
  {
    path: 'edit-project/:id',
    component: ProjectFormComponent,
    data: { title: extract('Update Project') },
  },  */
  {
    path: ':searchKey',
    component: ProjectslistComponent,
  }, /*
  {
    path: 'details/:id',
    component: ProjectDetailsComponent,
  }, */
  // {
  //   path: 'overview/:id',
  //   component: OverviewComponent,
  //   data: { title: extract('Overview') },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
