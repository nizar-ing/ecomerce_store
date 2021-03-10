import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import * as firebase from "firebase";
import {AppUser} from "../models/app-user";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User){
    this.db.object('/users/' + user.uid).update({
       name: user.displayName,
       email: user.email
      }
    );
  }
  getUser(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }
}
