import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { CartComponent } from './cart/cart.component';
import { PagoComponent } from './pago/pago.component';

const routes: Routes = [
  {
    path: '',
    component: ProductCatalogComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'pago',
    component: PagoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
