import { Injectable } from '@angular/core';
import { Product } from '../products/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];

  constructor() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.items = JSON.parse(saved);
    }
  }

  add(product: Product): void {
    this.items.push(product);
    this.save();
  }

  getItems(): Product[] {
    return this.items;
  }

  clear(): void {
    this.items = [];
    this.save();
  }

  private save(): void {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
}
