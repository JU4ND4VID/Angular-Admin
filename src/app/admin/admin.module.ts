import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component'; // ✅ PATH CORRECTO

@NgModule({

  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    AdminComponent
  ]
})
export class AdminModule { }
