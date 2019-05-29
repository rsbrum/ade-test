import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  login(email, pwd) {
    var data = {
      "email" : email,
      "password" : pwd
    }

    return this._http.post(this.apiUrl + "api/auth/login", data);
  }

  isLoggedIn() {
    var user = localStorage.getItem('current_user');

    if(!user)
      return false;
    else
      return true;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('current_user'));
  }

  loginFacebook() {
    return this._http.get(this.apiUrl + 'api/auth/login_facebook');
  }

  refreshToken() {
    var refresh_token = {
      "refresh_token" : this.getTokens()['refresh_token']
    }

    return this._http.post(this.apiUrl + "api/auth/refresh_token", refresh_token);
  }

  setTokens(access_token, refresh_token) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  }

  getTokens() {
    var access_token = localStorage.getItem('access_token');
    var refresh_token = localStorage.getItem('refresh_token');

    var tokens = {
      "access_token": access_token,
      "refresh_token": refresh_token
    }
    return tokens;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  setUser(user) {
    localStorage.setItem('current_user', JSON.stringify(user));
  }

}
