import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario: any = null;

  login(usuario: string, clave: string): boolean {
    if (usuario === 'admin' && clave === '123') {
      this.usuario = { nombre: 'admin', rol: 'admin' };
      return true;
    } else if (usuario === 'cliente' && clave === '123') {
      this.usuario = { nombre: 'cliente', rol: 'cliente' };
      return true;
    }
    return false;
  }

  getUsuario() {
    return this.usuario;
  }
  

  logout() {
    this.usuario = null;
  }
}
