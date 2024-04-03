import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OrderComponent } from './order/order.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { OrderDetailComponent } from './order-detail/order.detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../../interceptors/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChildRoutingModule } from './child-routing.module';
import { CommonModule } from '@angular/common';
import { ChildComponent } from './child.component';

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        OrderComponent,
        DetailProductComponent,
        OrderDetailComponent,
        LoginComponent,
        RegisterComponent,
        UserProfileComponent,
        ChildComponent
    ],
    imports: [
        ChildRoutingModule, // import routes,
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ]
})
export class ChildModule { }