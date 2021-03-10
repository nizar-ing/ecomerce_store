import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import * as firebase from "firebase";
import {Observable, of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {UserService} from "./user.service";
import {AppUser} from "../models/app-user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : Observable<firebase.User>;
  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
    this.afAuth.signOut();
  }
  get appUser$(): Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user => (user) ? this.userService.getUser(user.uid).valueChanges() : of(null) )
    );
  }
}
