import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {map, switchMap} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private authService: AuthService, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
     return this.authService.user$.pipe(
       switchMap(user => this.userService.getUser(user.uid).valueChanges()),
       map(appUser => appUser.isAdmin)
     );
  }
}
