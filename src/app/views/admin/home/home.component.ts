import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PedidosService } from '@services/pedidos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _http: HttpClient,
    private _pedidos: PedidosService ) { }

  ngOnInit() {

  }

  test() {
    this._http.get('http://larticles.test/api/auth/login').subscribe(res => console.log(res));
  }

}
