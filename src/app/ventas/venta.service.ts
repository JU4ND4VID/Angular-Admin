import { Injectable } from '@angular/core';
import { Venta }      from './venta.model';

/**
 * Servicio de Ventas (mock data)
 */
@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private ventas: Venta[] = [
    {
      id: 1,
      estado: 1,
      fechaVenta: '2025-05-01',
      idCliente: 1,
      valorDscto: 10,
      valorIva: 5,
      valorVenta: 100
    },
    {
      id: 2,
      estado: 0,
      fechaVenta: '2025-05-02',
      idCliente: 2,
      valorDscto: 0,
      valorIva: 8,
      valorVenta: 200
    },
    {
      id: 3,
      estado: 1,
      fechaVenta: '2025-05-03',
      idCliente: 1,
      valorDscto: 15,
      valorIva: 12,
      valorVenta: 150
    }
  ];

  /** Devuelve todas las ventas */
  getAll(): Venta[] {
    return [...this.ventas];
  }
}
