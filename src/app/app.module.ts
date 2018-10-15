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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    ProjectsComponent,
    EmployeesComponent,
    MainListComponent,
    ClientsComponent
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
