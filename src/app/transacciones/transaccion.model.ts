export interface Transaccion {
  id: number;
  estado: number;            // byte en backend → number en frontend
  fechaHora: string;         // ISO string o Date
  idBanco: string;
  idCompra: number;
  idFranquicia: string;
  idMetodoPago: number;      // short → number
  identificacion: string;
  numTarjeta: string;
  valorTx: number;
}
