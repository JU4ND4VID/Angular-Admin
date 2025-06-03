import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { Product } from '../../products/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Product[] = [];
  total = 0;

  constructor(
    private cart: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = this.cart.getItems();
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.total = this.items.reduce((sum, p) => sum + (p.precioVentaActual || 0), 0);
  }

  vaciar(): void {
    this.cart.clear();
    this.items = [];
    this.total = 0;
  }

  confirmarCompra(): void {
    if (this.items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    this.router.navigate(['/store/pago'], {
      queryParams: { total: this.total }
    });
  }
}
