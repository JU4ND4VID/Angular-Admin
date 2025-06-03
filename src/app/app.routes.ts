import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { adminGuard } from './guards/admin.guard';
import { clienteGuard } from './guards/cliente.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
  path: 'store',
  loadChildren: () => import('./store/store.module').then(m => m.StoreModule),
  canActivate: [clienteGuard] // si ya usas guard
}
,


  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
