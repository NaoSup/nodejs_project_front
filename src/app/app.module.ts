import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { NavbarComponent } from './partials/navbar/navbar.component';
import { HomepageComponent } from './partials/homepage/homepage.component';
import { ProjectsComponent } from './partials/projects/projects.component';
import { EmployeesComponent } from './partials/employees/employees.component';
import { MainListComponent } from './partials/main-list/main-list.component';
import { ClientsComponent } from './partials/clients/clients.component';
import { NavbarRoutingModule } from './routes/navbar-routing/navbar-routing.module';
import { ClientDetailsComponent } from './partials/client-details/client-details.component';
import { AddClientFormComponent } from './partials/add-client-form/add-client-form.component';
import { AddProjectFormComponent } from './partials/add-project-form/add-project-form.component';
import { AddEmployeeFormComponent } from './partials/add-employee-form/add-employee-form.component';
import { EmployeeDetailsComponent } from './partials/employee-details/employee-details.component';
import { ProjectDetailsComponent } from './partials/project-details/project-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    ProjectsComponent,
    EmployeesComponent,
    MainListComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AddClientFormComponent,
    AddProjectFormComponent,
    AddEmployeeFormComponent,
    EmployeeDetailsComponent,
    ProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    NavbarRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
