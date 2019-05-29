import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import {Router} from "@angular/router"

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

  constructor(
    private _auth: AuthService,
    private _router: Router) { }

  ngOnInit() {
  }

  login() {
    var email = this.loginForm.get('email').value;
    var pwd = this.loginForm.get('password').value;

    console.log(email, pwd);

    this._auth.login(email, pwd).subscribe(
      res => {
        this._auth.setTokens(res["tokens"]["access_token"], res["tokens"]["refresh_token"]);
        this._auth.setUser(res['user']);
        this._router.navigate(['admin']);
      },
      err => {
        console.log(err);
      }
    )

  }

  loginFacebook() {
    this._auth.loginFacebook().subscribe(
      res => {
      /*   window.location.href = res["target_url"]; */
        var url = res["target_url"];
        console.log(url);

        var str = url.split('=')[1];
        str = str.split('&')[0];

        /* window.location.href = url; */
      },
      err => {
        console.log(err);
      }
    )
   }

}
