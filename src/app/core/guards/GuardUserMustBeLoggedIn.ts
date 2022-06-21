import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/user/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class GuardUserMustBeLoggedIn implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let myurl = '';
    for (let child of route.url) {
      myurl += '/' + child.path;
    }
 
    if (this.authenticationService.isUserAuthentication()) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { url: myurl } });
    return false;
  }
}
