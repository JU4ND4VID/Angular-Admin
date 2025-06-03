import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../products/product.service';
import { Product } from '../../products/product.model';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {
  productos: Product[] = [];

  constructor(
    private svc: ProductService,
    private cart: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.svc.getAll().subscribe(data => {
      this.productos = data.filter(p => p.estado === 1);
    });
  }

  agregar(producto: Product): void {
    this.cart.add(producto);
    alert(`Producto "${producto.descripcion}" agregado al carrito.`);
  }

  irAlCarrito(): void {
    this.router.navigate(['/store/cart']);
  }

  getImagenUrl(foto: string): string {
    return `http://localhost:8181/SPRINGWEB1/producto/uploads/${foto}`;
  }
}
