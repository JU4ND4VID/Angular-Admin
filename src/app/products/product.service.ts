// src/app/products/product.service.ts

import { Injectable } from '@angular/core';
import { Product }    from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      descripcion: 'Producto A',
      costoCompra: 5050,       // 50.50 × 100 (guardaremos como entero de centavos para simplificar)
      estado: 1,
      existencia: 10,
      fotoProducto: '',
      idCategoria: 1,
      precioVentaActual: 10000,   // 100.00 × 100
      precioVentaAnterior: 9000,  // 90.00 × 100
      referencia: 'REF001',
      stockMaximo: 100,
      tieneIva: 1
    },
    {
      id: 76531,
      descripcion: 'zzz',
      costoCompra: 100,       // 1.00 × 100
      estado: 1,
      existencia: 5,
      fotoProducto: '',
      idCategoria: 2,
      precioVentaActual: 7500,    // 75.00 × 100
      precioVentaAnterior: 7000,  // 70.00 × 100
      referencia: 'REFXYZ',
      stockMaximo: 50,
      tieneIva: 0
    }
    // …otros productos…
  ];

  getAll(): Product[] {
    // Devolvemos copia para no mutar el array original
    return this.products.map(p => ({ ...p }));
  }

  getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  create(p: Product): void {
    this.products.push({ ...p });
  }

  update(p: Product): void {
    const idx = this.products.findIndex(x => x.id === p.id);
    if (idx > -1) {
      this.products[idx] = { ...p };
    }
  }

  delete(id: number): void {
    this.products = this.products.filter(x => x.id !== id);
  }
}
