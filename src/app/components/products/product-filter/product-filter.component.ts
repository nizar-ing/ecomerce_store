import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../../../models/category";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$: Observable<Category[]>;
  @Input('currentCategory') currentCategory;
  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit(): void {
  }

}
