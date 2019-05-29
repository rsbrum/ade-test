import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProdutosService } from '@core/services/produtos.service';
//import { ProdutosService } from '../../../core/services/produtos.service';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  link = "";
  constructor(
    private _http: HttpClient,
    private _produto: ProdutosService
    ) { }

  ngOnInit() {

  }

  test() {

    this._http.get('http://localhost:8000/api/auth/login').subscribe(
      res => (
        window.open(res['target_url'])
        ), err => (
          console.log(err))
          );

    /* window.location.href = '...'; */
  }

  facebookCallback(url: string) {
    this._http.get(url).subscribe(
      res => {
        console.log(res)
        /* set token */
      }, err => {
        console.log(err)
      }
    )
  }


}
