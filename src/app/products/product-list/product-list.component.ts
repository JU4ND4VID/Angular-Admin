import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { MatTableModule }    from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule }    from '@angular/material/input';
import { MatButtonModule }   from '@angular/material/button';
import { MatIconModule }     from '@angular/material/icon';

import { ProductService } from '../product.service';
import { Product }        from '../product.model';
import { Router }         from '@angular/router';

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
  /** Array original (traído del servicio) */
  products: Product[] = [];

  /** Array mostrado en la tabla (puede venir filtrado) */
  displayedProducts: Product[] = [];

  /** Columnas que se mostrarán en la tabla */
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

  /** ID que ingresa el usuario para filtrar */
  searchId: number | null = null;

  constructor(
    private svc: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Traer todos los productos
    this.products = this.svc.getAll();
    // 2. Al inicio, mostrar sin filtro
    this.displayedProducts = [...this.products];
  }

  /**
   * Filtra por ID cada vez que cambie `searchId`.
   * Si `searchId` es null o NaN, restaura la lista completa.
   */
  applyFilter(): void {
    if (this.searchId === null || isNaN(this.searchId)) {
      this.displayedProducts = [...this.products];
    } else {
      this.displayedProducts = this.products.filter(
        p => p.id === this.searchId
      );
    }
  }

  /** Limpia el input de filtro y vuelve a mostrar todo */
  clearFilter(): void {
    this.searchId = null;
    this.applyFilter();
  }

  /** Navega a la pantalla de "Nuevo Producto" */
  add(): void {
    this.router.navigate(['/products/new']);
  }

  /** Navega a la pantalla de "Editar Producto/:id" */
  edit(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  /** Elimina del servicio y vuelve a filtrar (para actualizar la tabla) */
  remove(id: number): void {
    this.svc.delete(id);
    this.products = this.svc.getAll();
    this.applyFilter();
  }
}
