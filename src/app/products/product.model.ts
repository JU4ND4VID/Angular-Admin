export interface Product {
  id: number;
  costoCompra: number;
  descripcion: string;
  estado: number;
  existencia: number;
  fotoProducto: string;
  idCategoria: number;
  precioVentaActual: number;
  precioVentaAnterior: number;
  referencia: string;
  stockMaximo: number;
  tieneIva: number;
}
