// src/app/users/cliente.model.ts

/**
 * Modelo Cliente — coincide con tu entidad Spring Boot
 */
export interface Cliente {
  /** Id único (PK) */
  id: number;

  /** Correo electrónico del cliente */
  correoCliente: string;

  /** Dirección física del cliente */
  direccionCliente: string;

  /** Estado (1=activo, 0=inactivo) */
  estado: number;

  /** Nombre completo del cliente */
  nombreCliente: string;

  /** Teléfono de contacto */
  telefono: string;
}
