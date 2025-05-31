// src/app/ventas/venta.model.ts

/**
 * Modelo Venta — coincide con la entidad Java
 */
export interface Venta {
  id: number;          // PK
  estado: number;      // byte -> number (0 o 1)
  fechaVenta: string;  // Date en backend -> string YYYY-MM-DD
  idCliente: number;   // FK al cliente
  valorDscto: number;  // integer
  valorIva: number;    // integer
  valorVenta: number;  // integer
}
