import { Injectable } from '@angular/core';
import { Transaccion } from './transaccion.model';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private transacciones: Transaccion[] = [
    {
      id: 1,
      estado: 1,
      fechaHora: '2025-05-31T10:15:00',
      idBanco: 'BAN123',
      idCompra: 101,
      idFranquicia: 'VISA',
      idMetodoPago: 2,
      identificacion: '1234567890',
      numTarjeta: '**** **** **** 1234',
      valorTx: 50000
    },
    {
      id: 2,
      estado: 0,
      fechaHora: '2025-06-01T14:00:00',
      idBanco: 'BAN456',
      idCompra: 102,
      idFranquicia: 'MASTERCARD',
      idMetodoPago: 1,
      identificacion: '9876543210',
      numTarjeta: '**** **** **** 5678',
      valorTx: 120000
    }
  ];

  /** Devuelve todas las transacciones */
  getAll(): Transaccion[] {
    return [...this.transacciones];
  }

  /** (Opcional) Busca una transacción por ID */
  getById(id: number): Transaccion | undefined {
    return this.transacciones.find(t => t.id === id);
  }

  /** (Opcional) Elimina por ID */
  delete(id: number): void {
    this.transacciones = this.transacciones.filter(t => t.id !== id);
  }
}
