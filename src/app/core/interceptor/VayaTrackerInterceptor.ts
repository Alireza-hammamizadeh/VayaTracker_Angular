 
 
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DomainName } from '../utilities/pathTools';
import { EncryptionService } from '../services/security/encryption.service';
import { IResponseDtoCodes } from '../models/IResponseDto';
import { AuthenticationService } from '../services/user/authentication.service';


@Injectable({
  providedIn:'root'
})

export class vayaTrackerInterceptor implements HttpInterceptor {
  constructor(private router: Router,
    private encryptionService:EncryptionService,
    private authenticationService: AuthenticationService
     ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('VayaTracker_Token');
    if(token == null || token == 'user.Token'  )
    {
      for(let x= 0 ; 4 > x; x++)
      {
        token =  localStorage.getItem('VayaTracker_Token');
      }
    }
    try{
      token = this.encryptionService.Decrypt(token + '');
    }
    catch
    {
      token='null';
    }
    //console.log(token);
    let myRequest = req.clone({
      url: DomainName + req.url,
      headers :  req.headers.append('Authorization','Bearer ' + token)
    });
 
    //For Multi Language Files
    if (myRequest.url.match('i18n')) {
      return next.handle(req);
    }

    
    return next.handle(myRequest).pipe(catchError(x=> this.handleAuthError(x))).pipe(
      tap(evt => {
          if (evt instanceof HttpResponse) {
            //Chek If Access Denied
            if(evt.body != null && evt.body != undefined )
            {
              if(evt.body.IsSuccess != undefined &&  evt.body.IsSuccess != null)
              {
                if( evt.body.IsSuccess == false)
                {
                  if(evt.body.StatusCode == IResponseDtoCodes.NotAuthenticated)
                  {
                    this.router.navigate(['/login']);
                  }
                  else if(evt.body.StatusCode == IResponseDtoCodes.NoPermission)
                  {
                    this.router.navigate(['/accessdenied']);
                  }
                }
              }
            } 
          }
      }));;
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {

    if (err.status === 401 || err.status === 403) {
      this.authenticationService.setCurrenUser(null,true);
      this.router.navigate(['/login']);
        return of(err.message); 
    }
    else if (err.status === 404) {

      this.authenticationService.setCurrenUser(null,true);
      
      this.router.navigate(['/notfound']);
        return of(err.message);
    }
    return throwError(err);
}

 

}
