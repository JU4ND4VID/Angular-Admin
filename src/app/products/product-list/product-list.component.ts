import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { Router }            from '@angular/router';
import { MatTableModule }    from '@angular/material/table';
import { MatButtonModule }   from '@angular/material/button';

import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = [
  'id', 'descripcion', 'costoCompra', 'estado', 'existencia', 'fotoProducto', 
  'idCategoria', 'precioVentaActual', 'precioVentaAnterior', 'referencia', 
  'stockMaximo', 'tieneIva', 'actions'
];


  constructor(
    private svc: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.svc.getAll();
  }

  edit(id: string) {
    const numId = +id;
    this.router.navigate(['/products/edit', numId]);
  }

  remove(id: string) {
    const numId = +id;
    this.svc.delete(numId);
    this.products = this.svc.getAll();
  }

  add() {
    this.router.navigate(['/products/new']);
  }
}
