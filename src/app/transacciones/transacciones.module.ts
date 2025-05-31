import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransaccionesRoutingModule } from './transacciones-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TransaccionesRoutingModule
    // NOTA: No es necesario importar el componente standalone aquí
  ]
})
export class TransaccionesModule {}
