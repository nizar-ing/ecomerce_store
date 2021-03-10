import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, SnapshotAction} from "@angular/fire/database";
import {Observable} from "rxjs";
import {Category} from "../models/category";
import {map} from "rxjs/operators";

class Categorye {
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(): Observable<Category[]>{
    return this.db.list('/categories').snapshotChanges().pipe(
      map(res => res.map(c  => ({ key: c.payload.key, ...(c as SnapshotAction<any>).payload.val()})))
    );
  }
}
