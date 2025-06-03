import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';

@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    ProductCatalogComponent // ✅ componente standalone importado como módulo
  ]
})
export class StoreModule { }
