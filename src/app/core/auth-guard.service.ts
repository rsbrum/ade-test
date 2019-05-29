import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public _auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this._auth.isLoggedIn()) {
      this.router.navigate(['', 'auth']);
      return false;
    }
    return true;
  }
}

