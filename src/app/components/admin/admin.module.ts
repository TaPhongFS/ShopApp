import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { OrderAdminComponent } from './order/order.admin.component';
import { DetailOrderAdminComponent } from './detail-order/detail.order.admin.component';
import { ProductAdminComponent } from './product/product.admin.component';
import { CategoryAdminComponent } from './category/category.admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add.product.component';
import { DetailProductComponent } from './detail-product/detail.product.admin.component';

@NgModule({
    declarations: [
        AdminComponent,
        OrderAdminComponent,
        DetailOrderAdminComponent,
        ProductAdminComponent,
        CategoryAdminComponent,
        AddProductComponent,
        DetailProductComponent
    ],
    imports: [
        AdminRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AdminModule { }