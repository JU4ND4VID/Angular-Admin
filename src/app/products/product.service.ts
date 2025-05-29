import { Injectable } from '@angular/core';
import { Product } from './product.model';  // Importa la interfaz aquí

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      costoCompra: 50.5,
      descripcion: 'Producto A',
      estado: 1,
      existencia: 10,
      fotoProducto: 'url_o_base64',
      idCategoria: 1,
      precioVentaActual: 100,
      precioVentaAnterior: 90,
      referencia: 'REF001',
      stockMaximo: 100,
      tieneIva: 1
    },
    // más productos aquí...
  ];

  getAll(): Product[] {
    return [...this.products];
  }

  getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  create(p: Product) {
    this.products.push(p);
  }

  update(p: Product) {
    const idx = this.products.findIndex(x => x.id === p.id);
    if (idx > -1) this.products[idx] = p;
  }

  delete(id: number) {
    this.products = this.products.filter(x => x.id !== id);
  }
}
