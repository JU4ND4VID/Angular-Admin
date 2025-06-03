import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // 👈 asegúrate del path

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = '';
  clave = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    const success = this.auth.login(this.usuario, this.clave);

    if (success) {
      const rol = this.auth.getUsuario()?.rol;
      if (rol === 'admin') {
        this.router.navigate(['/admin']);
      } else if (rol === 'cliente') {
        this.router.navigate(['/store']);
      }
    } else {
      this.error = 'Credenciales incorrectas';
    }
  }
}
