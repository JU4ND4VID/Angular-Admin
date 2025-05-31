import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { VentaService } from '../venta.service';
import { Venta } from '../venta.model';

@Component({
  selector: 'app-venta-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './venta-list.component.html',
  styleUrls: ['./venta-list.component.css']
})
export class VentaListComponent implements OnInit {
  ventas: Venta[] = [];
  displayedVentas: Venta[] = [];
  displayedColumns = ['id', 'fechaVenta', 'idCliente', 'valorDscto', 'valorIva', 'valorVenta', 'estado'];

  searchId: number | null = null;

  constructor(private svc: VentaService) {}

  ngOnInit(): void {
    this.ventas = this.svc.getAll();
    this.displayedVentas = [...this.ventas];
  }

  applyFilter(): void {
    if (this.searchId === null || isNaN(this.searchId)) {
      this.displayedVentas = [...this.ventas];
    } else {
      this.displayedVentas = this.ventas.filter(v => v.id === this.searchId);
    }
  }

  clearFilter(): void {
    this.searchId = null;
    this.applyFilter();
  }
}
