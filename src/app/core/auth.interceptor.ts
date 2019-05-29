import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpRequest, HttpClient } from "@angular/common/http";
import { HttpInterceptor } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap, flatMap, switchMap, concatMap } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';

/**
 *
 * @TODO Logout user
 *       Redirect to login
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _http: HttpClient,
    private _auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let tokens = this._auth.getTokens();

    if (tokens) {
      req = req.clone({
        setHeaders: {
          'Authorization': "Bearer " + tokens['access_token']
        }
      });
    }

    return next.handle(req).pipe(
/*       catchError(err => {
        if (err.status === 401) {
          console.log('unauthorized');
          var data = {"refresh_token" : tokens['refresh_token']}
          //refresh token
          return this._http.post("http://adepi.test/api/auth/refresh_token", data).pipe(
            flatMap(
              res => {
                this._auth.setTokens(res['access_token'], res['refresh_token']);
                tokens = this._auth.getTokens();

                req = req.clone({
                  setHeaders: {
                    'Authorization': "Bearer " + tokens['access_token']
                  }
                });
                return next.handle(req);
              }

            )
          )

        }

        return throwError(err);
      }) */
    )

  }
}

/* res => {
  console.log('errrrrrrrrrrrrr')
  if (0) {
    this._auth.setTokens(res['access_token'], res['refresh_token']);
    var token = this._auth.getTokens()['access_token'];

    //set tokens
    req = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + token
      }
    });
    return next.handle(req)
  } else {
    console.log('logout')
  }

} */
