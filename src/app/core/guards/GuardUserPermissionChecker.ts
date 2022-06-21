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
export class GuardUserPermissionChecker implements CanActivate {
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
    let userPer = this.authenticationService.getUserPermissions();
    let roles = route.data['roles'] as Array<Number>;

    if (this.authenticationService.isUserAuthentication()) {
      if (userPer != null) {
        for (let x of roles) {
          if (userPer.includes(x)) {
            return true;
          }
        }
      }
      this.router.navigate(['/accessdenied']);
      return false;
    } else {
      this.router.navigate(['/login'], { queryParams: { url: route.url } });
    }
    return false;
  }
}
