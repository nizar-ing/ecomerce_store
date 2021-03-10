import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Observable, Subscription} from "rxjs";
import {ShoppingCart} from "../../models/shopping-cart";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentCategory: string;
  shoppingCart$: Observable<ShoppingCart>;
  constructor(private shoppingCartService: ShoppingCartService, private productService: ProductService, private route: ActivatedRoute) {  }
  async ngOnInit(){
    this.populateProducts();
    this.shoppingCart$ = await this.shoppingCartService.getCart();
  }
  private populateProducts(){
    this.productService.getAll().pipe(
      switchMap(p => {
        this.products = p;
        return this.route.queryParamMap;
      })).subscribe(params => {
      this.currentCategory = params.get('category');
      this.applyFilter();
    });
  }
  private applyFilter(){
    this.filteredProducts = (this.currentCategory) ? this.products.filter(p => p.category === this.currentCategory) : this.products;
  }
}
