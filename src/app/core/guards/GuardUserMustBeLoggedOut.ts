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
export class GuardUserMustBeLoggedOut implements CanActivate {
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
 
    //console.log('GuardUserMustBeLoggedOut : ' +  route.url);
    if (this.authenticationService.isUserAuthentication()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
