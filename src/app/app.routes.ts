import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'users',                   // ← esta línea
    loadChildren: () =>
      import('./users/users.module').then(m => m.UsersModule)
  },
  { path: '',   redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' }
];
