import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { TransaccionService } from '../transaccion.service';
import { Transaccion } from '../transaccion.model';

@Component({
  selector: 'app-transaccion-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './transaccion-list.component.html',
  styleUrls: ['./transaccion-list.component.css']
})
export class TransaccionListComponent implements OnInit {
  transacciones: Transaccion[] = [];
  displayedTransacciones: Transaccion[] = [];

  displayedColumns: string[] = [
    'id',
    'fechaHora',
    'identificacion',
    'numTarjeta',
    'idBanco',
    'idFranquicia',
    'idMetodoPago',
    'idCompra',
    'valorTx',
    'estado'
  ];

  searchId: number | null = null;

  constructor(private svc: TransaccionService) {}

  ngOnInit(): void {
    this.transacciones = this.svc.getAll();
    this.displayedTransacciones = [...this.transacciones];
  }

  applyFilter(): void {
    if (this.searchId === null || isNaN(this.searchId)) {
      this.displayedTransacciones = [...this.transacciones];
    } else {
      this.displayedTransacciones = this.transacciones.filter(
        t => t.id === this.searchId
      );
    }
  }

  clearFilter(): void {
    this.searchId = null;
    this.applyFilter();
  }
}
