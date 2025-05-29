// src/app/products/product.model.ts

export interface Product {
  id: number;              // Id único del producto
  costoCompra: number;     // Costo de compra (precio base)
  descripcion: string;     // Descripción detallada
  estado: number;          // Estado (1=activo, 0=inactivo)
  existencia: number;      // Cantidad disponible
  fotoProducto?: string;   // URL o base64 de la imagen (opcional)
  idCategoria: number;     // Id de la categoría a la que pertenece
  precioVentaActual: number;   // Precio de venta actual
  precioVentaAnterior: number; // Precio de venta anterior (para comparativos)
  referencia: string;          // Código o referencia del producto
  stockMaximo: number;         // Cantidad máxima en stock permitida
  tieneIva: number;            // Indica si tiene IVA (1 = sí, 0 = no)
}
