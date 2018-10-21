import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDetailsComponent } from '../../partials/client-details/client-details.component';
import { AddClientFormComponent } from '../../partials/add-client-form/add-client-form.component';

const routes: Routes = [
  { path: 'clients/detailed/:id', component: ClientDetailsComponent },
  { path: 'clients/add', component: AddClientFormComponent },
  { path: 'clients/edit/:id', component: AddClientFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
