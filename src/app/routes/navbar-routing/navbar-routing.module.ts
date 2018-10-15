import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from '../../partials/homepage/homepage.component';
import { ProjectsComponent } from '../../partials/projects/projects.component';
import { EmployeesComponent } from '../../partials/employees/employees.component';
import { ClientsComponent } from '../../partials/clients/clients.component';

const navbarRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'clients', component: ClientsComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(navbarRoutes)
  ],
  exports: [RouterModule]
})
export class NavbarRoutingModule { }
