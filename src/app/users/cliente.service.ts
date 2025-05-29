import { Injectable } from '@angular/core';
import { Cliente } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  // Datos simulados iniciales
  private clientes: Cliente[] = [
    {
      id: 1,
      correoCliente: 'juan.perez@example.com',
      direccionCliente: 'Calle 123 #45-67, Bogotá',
      estado: 1,
      nombreCliente: 'Juan Pérez',
      telefono: '3101234567'
    },
    {
      id: 2,
      correoCliente: 'ana.lopez@example.com',
      direccionCliente: 'Carrera 10 #20-30, Medellín',
      estado: 0,
      nombreCliente: 'Ana López',
      telefono: '3209876543'
    }
  ];

  /** Devuelve todos los clientes */
  getAll(): Cliente[] {
    return [...this.clientes];
  }

  /** Busca un cliente por su ID */
  getById(id: number): Cliente | undefined {
    return this.clientes.find(c => c.id === id);
  }

  /** Crea un nuevo cliente */
  create(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  /** Actualiza un cliente existente */
  update(cliente: Cliente): void {
    const i = this.clientes.findIndex(c => c.id === cliente.id);
    if (i > -1) this.clientes[i] = cliente;
  }

  /** Elimina un cliente por ID */
  delete(id: number): void {
    this.clientes = this.clientes.filter(c => c.id !== id);
  }
}
