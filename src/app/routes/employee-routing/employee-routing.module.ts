import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from '../../partials/employee-details/employee-details.component';
import { AddEmployeeFormComponent } from '../../partials/add-employee-form/add-employee-form.component';

const routes: Routes = [
  { path: 'employees/detailed/:id', component: EmployeeDetailsComponent },
  { path: 'employees/add', component: AddEmployeeFormComponent },
  { path: 'employees/edit/:id', component: AddEmployeeFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
