import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './components/login/login.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { AdminProductsComponent } from './adminComponents/admin-products/admin-products.component';
import { AdminOrdersComponent } from './adminComponents/admin-orders/admin-orders.component';
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireModule} from "@angular/fire";
import {RouterModule} from "@angular/router";
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth-guard.service";
import {UserService} from "./services/user.service";
import {AdminAuthGuard} from "./services/admin-auth-guard.service";
import { ProductFormComponent } from './adminComponents/product-form/product-form.component';
import {CategoryService} from "./services/category.service";
import {FormsModule} from "@angular/forms";
import {ProductService} from "./services/product.service";
import {CustomFormsModule} from "ngx-custom-validators";
import {NgxDataTableModule} from "angular-9-datatable";
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import {ShoppingCartService} from "./services/shopping-cart.service";
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import {OrderService} from "./services/order.service";
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ShoppingCartComponent,
    LoginComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    MyOrdersComponent,
    HomeComponent,
    BsNavbarComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    NgxDataTableModule,
    CustomFormsModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },

      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },

      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] }
    ]),
    NgbModule

  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
