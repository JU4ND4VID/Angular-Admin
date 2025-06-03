import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const clienteGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const usuario = auth.getUsuario();
  if (usuario && usuario.rol === 'cliente') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
