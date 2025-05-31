import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { VentasRoutingModule } from './ventas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    VentasRoutingModule
    // Nota: VentaListComponent es standalone, por eso no va en declarations.
  ]
})
export class VentasModule {}
