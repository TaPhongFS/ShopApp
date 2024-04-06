import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {
    DetailProductComponent
} from './detail-product/detail-product.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order.detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuardFn } from '../../guards/auth.guard';
import { ChildComponent } from './child.component';

const routes: Routes = [
    {
        path: '',
        component: ChildComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'detail-product/:id', component: DetailProductComponent },
            { path: 'orders', component: OrderComponent, canActivate: [AuthGuardFn] },
            { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardFn] },
            { path: 'orders-list', component: OrderDetailComponent, canActivate: [AuthGuardFn] },
        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ChildRoutingModule { }
