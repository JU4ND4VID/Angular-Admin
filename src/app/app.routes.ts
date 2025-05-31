import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'ventas',            // ← aquí
    loadChildren: () =>
      import('./ventas/ventas.module').then(m => m.VentasModule)
  },
  {
  path: 'transacciones',
  loadChildren: () => import('./transacciones/transacciones.module').then(m => m.TransaccionesModule)
},

  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' }
];
