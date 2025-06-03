import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  /** Arreglo original de clientes */
  clientes: Cliente[] = [];

  /** Arreglo mostrado en la tabla (puede estar filtrado) */
  displayedClientes: Cliente[] = [];

  /** Columnas visibles en la tabla */
  displayedColumns = [
    'id',
    'nombreCliente',
    'correoCliente',
    'direccionCliente',
    'telefono',
    'estado',
    'acciones'
  ];

  /** ID ingresado por el usuario para filtrar */
  searchId: number | null = null;

  constructor(
    private svc: ClienteService,
    private router: Router
  ) {}

  /** Carga inicial de datos */
  ngOnInit(): void {
    this.svc.listarClientes().subscribe((data) => {
      this.clientes = data;
      this.displayedClientes = [...data];
    });
  }

  /** Aplica filtro por ID exacto */
  applyFilter(): void {
    if (this.searchId === null || isNaN(this.searchId)) {
      this.displayedClientes = [...this.clientes];
    } else {
      this.displayedClientes = this.clientes.filter(c => c.id === this.searchId);
    }
  }

  /** Limpia el filtro y restaura la lista completa */
  clearFilter(): void {
    this.searchId = null;
    this.applyFilter();
  }

  /** Navega a creación de cliente */
  add(): void {
    this.router.navigate(['admin/clientes/new']);
  }

  /** Navega a edición de cliente */
  edit(id: number): void {
    this.router.navigate(['admin/clientes/edit', id]);
  }

  /** Elimina cliente y actualiza la tabla */
  remove(id: number): void {
    this.svc.eliminarCliente(id).subscribe(() => {
      this.svc.listarClientes().subscribe((data) => {
        this.clientes = data;
        this.applyFilter();
      });
    });
  }
}
