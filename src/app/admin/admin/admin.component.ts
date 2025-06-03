import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ IMPORTAR RouterModule
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-admin',
  standalone: true, // ← estás usando standalone
  imports: [RouterModule], // ✅ IMPORTACIÓN para usar <router-outlet>
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private auth: AuthService, private router: Router) {}

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
