import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ShoppingCart} from "../../models/shopping-cart";
import {Subscription} from "rxjs";
import {OrderService} from "../../services/order.service";
import {AuthService} from "../../services/auth.service";
import {Order} from "../../models/order";
import {Router} from "@angular/router";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{
  shipping = {name: '', addressLine1: '', addressLine2: '', city: ''};
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;
  constructor(private orderService: OrderService, private shoppingCartService: ShoppingCartService, private authService: AuthService, private router: Router) {
  }
  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
