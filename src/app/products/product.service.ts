import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8181/SPRINGWEB1/producto';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getAll`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/findRecord/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/saveProducto`, product);
  }

  createRaw(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveProducto`, formData);
  }

  update(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/saveProducto`, product);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteProducto/${id}`);
  }
}
