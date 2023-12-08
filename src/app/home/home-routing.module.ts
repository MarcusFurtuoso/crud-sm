import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonComponent } from './person/person.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { PersonCreateComponent } from './person-create/person-create.component';

const routes: Routes = [
  {
    path: '',
    component: PersonComponent
  },
  {
    path: 'edit/:id',
    component: PersonEditComponent
  },
  {
    path: 'create',
    component: PersonCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
