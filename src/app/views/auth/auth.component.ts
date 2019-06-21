import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  signupForm = new FormGroup({
    email: new FormControl(''),
    confirmEmail: new FormControl(''),
    name: new FormControl(''),
    pwd: new FormControl('')
  });

  showLogin = false;
  showSignup = false;
  emailEqual: boolean;
  clicked = false;
  error = false;
  verify_email_message = false;
  error_login = false;
  error_signup = false;

  constructor(
    private _auth: AuthService,
    private _router: Router) { }

  ngOnInit() {
  }

  showLoginFunc() {
    this.showLogin = true;
    this.showSignup = false;
  }

  showSignupFunc() {
    this.showSignup = true;
    this.showLogin = false;
  }

  login() {
    var email = this.loginForm.get('email').value;
    var pwd = this.loginForm.get('password').value;

    this.error = false;
    this.verify_email_message = false;
    this.error_login = false;
    this.error_signup = false;

    this.clicked = true;

    this._auth.login(email, pwd).subscribe(
      res => {
        this.clicked = false;

        if (res['user']['admin'] == '1') {
          this._auth.setTokens(res["tokens"]["access_token"], res["tokens"]["refresh_token"]);
          this._auth.setUser(res['user']);
          this._router.navigate(['admin']);
          return;
        }

        if(res['user']['verified'] == '0') {
          this.clicked = false;
          this.error_login = true;
          return;
        }

        window.location.href = 'https://ade-pizzas.herokuapp.com/callback?user_id=' + res['user']['id'];

      },
      err => {
        this.clicked = false;
        this.error_login = true;
        console.log(err);
      }
    )

  }

  loginFacebook() {
    this.clicked = true;
    this._auth.loginFacebook().subscribe(
      res => {
        /*   window.location.href = res["target_url"]; */
        this.clicked = false;
        var url = res["target_url"];

        var str = url.split('=')[1];
        str = str.split('&')[0];

        window.location.href = url;
      },
      err => {
        this.clicked = false;
        this.error = true;
        console.log(err);
      }
    )
  }

  signup() {
    this.clicked = true;
    var email1 = this.signupForm.get('email').value;
    var email2 = this.signupForm.get('confirmEmail').value;

    this.error = false;
    this.verify_email_message = false;
    this.error_login = false;
    this.error_signup = false;

    if(email1 != email2){
      this.error_signup = true;
      this.clicked = false;
      return;
    }

    this._auth.signup(this.signupForm.value).subscribe(
      res => {
        this.clicked = false;
        this.showSignup = false;
        this.showLogin = true;
        this.verify_email_message = true;
      },
      err => {
        this.clicked = false;
        this.error_signup = true;
        console.log(err)
      }
    )
  }

}
