import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component'; // Asegúrate de importar bien

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('../products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'clientes',
        loadChildren: () =>
          import('../clientes/clientes.module').then(m => m.ClientesModule)
      },
      {
        path: 'ventas',
        loadChildren: () =>
          import('../ventas/ventas.module').then(m => m.VentasModule)
      },
      {
        path: 'transacciones',
        loadChildren: () =>
          import('../transacciones/transacciones.module').then(m => m.TransaccionesModule)
      },
      { path: '', redirectTo: 'products', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
