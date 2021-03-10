import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Observable} from "rxjs";
import {ShoppingCart} from "../../models/shopping-cart";

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit(){
    this.cart$ = await(this.shoppingCartService.getCart());
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }
}
