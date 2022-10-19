import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';


@Injectable({
  providedIn: 'root'
})


export class UserAuthGuard implements CanActivate {
  constructor(private shared:SharedService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.shared.getResponse().role==="Admin" || this.shared.getResponse().role === 'User')
      {
        return true;
      }
      return false;
  }
  
}
