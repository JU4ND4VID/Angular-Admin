import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';

import { ProductListComponent }  from './product-list/product-list.component';
import { ProductFormComponent }  from './product-form/product-form.component';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ProductListComponent,
    ProductFormComponent
  ]
})
export class ProductsModule {}
