import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDetailsComponent } from '../../partials/project-details/project-details.component';
import { AddProjectFormComponent } from '../../partials/add-project-form/add-project-form.component';

const routes: Routes = [
  { path: 'projects/detailed/:id', component: ProjectDetailsComponent },
  { path: 'projects/add', component: AddProjectFormComponent },
  { path: 'projects/edit/:id', component: AddProjectFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }

