import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaccion } from './transaccion.model';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private baseUrl = 'http://localhost:8181/SPRINGWEB1/transaccion';

  constructor(private http: HttpClient) {}

  listarTransacciones(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(`${this.baseUrl}/getAll`);
  }

  guardarTransaccion(transaccion: Transaccion): Observable<Transaccion> {
    return this.http.post<Transaccion>(`${this.baseUrl}/saveTransaccion`, transaccion);
  }

  obtenerPorId(id: number): Observable<Transaccion> {
    return this.http.get<Transaccion>(`${this.baseUrl}/findRecord/${id}`);
  }

  eliminarTransaccion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteTransaccion/${id}`);
  }
}
