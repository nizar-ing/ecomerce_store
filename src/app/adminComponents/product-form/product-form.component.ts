import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Observable} from "rxjs";
import {Category} from "../../models/category";
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<Category[]>;
  // @ts-ignore
  product: Product = {};
  productId: string;
  constructor(private productService: ProductService, categoryService: CategoryService, private router: Router, route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories();
    this.productId = route.snapshot.paramMap.get('id');
    if(this.productId){
      this.productService.getProduct(this.productId).valueChanges().pipe(
        take(1)
      ).subscribe(p => this.product= p);
    }
  }

  ngOnInit(): void {
  }

  save(product: Product) {
    if(this.productId){
      this.productService.updateProduct(this.productId,{
        title: product.title,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl
      })
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm("Are you sure to delete this product ?")) return;
    this.productService.deleteProduct(this.productId);
    this.router.navigate(['/admin/products']);
  }
}
