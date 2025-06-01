import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from './venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private baseUrl = 'http://localhost:8181/SPRINGWEB1/venta';
;

  constructor(private http: HttpClient) {}

  listarVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.baseUrl}/getAll`);
  }

  guardarVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(`${this.baseUrl}/saveVenta`, venta);
  }

  obtenerPorId(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.baseUrl}/findRecord/${id}`);
  }

  eliminarVenta(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteVenta/${id}`);
  }
}
