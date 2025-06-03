import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
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
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  Products: Product[] = [];
  displayedProducts: Product[] = [];
  searchId: number | null = null;

  displayedColumns = [
    'id',
    'descripcion',
    'costoCompra',
    'estado',
    'existencia',
    'fotoProducto',
    'idCategoria',
    'precioVentaActual',
    'precioVentaAnterior',
    'referencia',
    'stockMaximo',
    'tieneIva',
    'actions'
  ];

  constructor(private svc: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.svc.getAll().subscribe(data => {
      this.Products = data;
      this.displayedProducts = [...this.Products];
    });
  }

  applyFilter(): void {
    if (this.searchId === null || isNaN(this.searchId)) {
      this.displayedProducts = [...this.Products];
    } else {
      this.displayedProducts = this.Products.filter(p => p.id === this.searchId);
    }
  }

  clearFilter(): void {
    this.searchId = null;
    this.applyFilter();
  }

  add(): void {
    this.router.navigate(['admin/products/new']);
  }

  edit(id: number): void {
    this.router.navigate(['admin/products/edit', id]);
  }

  remove(id: number): void {
    this.svc.delete(id).subscribe(() => {
      this.svc.getAll().subscribe(data => {
        this.Products = data;
        this.applyFilter();
      });
    });
  }
}