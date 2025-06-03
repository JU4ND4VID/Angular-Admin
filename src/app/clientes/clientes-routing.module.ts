import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./cliente-list/cliente-list.component')
        .then(m => m.ClienteListComponent)
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./cliente-form/cliente-form.component')
        .then(m => m.ClienteFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./cliente-form/cliente-form.component')
        .then(m => m.ClienteFormComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule {}
