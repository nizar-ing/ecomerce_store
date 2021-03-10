import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject, SnapshotAction} from "@angular/fire/database";
import {Product} from "../models/product";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }
  create(product: Product){
    this.db.list('products').push(product);
  }
  getAll(): Observable<Product[]>{
    return this.db.list('products').snapshotChanges().pipe(
      map(res => res.map(obj => ({ key: obj.payload.key, ...(obj as SnapshotAction<any>).payload.val()})))
    );
  }
  getProduct(productId: string):AngularFireObject<Product>{
    return this.db.object('products/' + productId);
  }
  updateProduct(productId: string, product){
    return this.db.object('products/' + productId).update(product);
  }
  deleteProduct(productId: string){
    return this.db.object('products/' + productId).remove();
  }
}
