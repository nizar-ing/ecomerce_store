import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Observable, Subscription} from "rxjs";
import {Product} from "../../models/product";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  constructor(productService: ProductService) {
    this.subscription = productService.getAll().subscribe( products => {
      this.products = this.filteredProducts = products;
    });
  }

  ngOnInit(): void {
  }

  filter(query: string) {
    this.filteredProducts = (query) ? this.filteredProducts.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
