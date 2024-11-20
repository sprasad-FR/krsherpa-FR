import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { EmployeeComponent } from './employee/employee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'employeelist',
   component: EmployeelistComponent
  },
 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule {}
