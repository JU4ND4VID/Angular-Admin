// src/app/users/cliente-list/cliente-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { MatTableModule }    from '@angular/material/table';
import { MatButtonModule }   from '@angular/material/button';
import { Router }            from '@angular/router';

import { ClienteService } from '../cliente.service';
import { Cliente }        from '../cliente.model';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  displayedColumns = [
    'id',
    'nombreCliente',
    'correoCliente',
    'direccionCliente',
    'telefono',
    'estado',
    'actions'
  ];

  constructor(
    private svc: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientes = this.svc.getAll();
  }

  add(): void {
    this.router.navigate(['/users/new']);
  }

  edit(id: string): void {
    const numId = +id;
    this.router.navigate(['/users/edit', numId]);
  }

  remove(id: string): void {
    const numId = +id;
    this.svc.delete(numId);
    this.clientes = this.svc.getAll();
  }
}
