import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '@env/environment';
import { PedidosService } from '@services/pedidos.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: 'callback.component.html'
})
export class CallbackComponent implements OnInit {

  apiUrl = environment.apiUrl;

  pedidoForm = new FormGroup({
    rua: new FormControl(''),
    bairro: new FormControl(''),
    numero: new FormControl(''),
    contato: new FormControl('')
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private _http: HttpClient,
    private _pedidos: PedidosService
  ) {
  }

  /**
   * Facebook callback component
   */
  ngOnInit() {

  }

  callback(): void {
    var url = window.location.href;
    var str = url.split('=')[1];
    str = str.split('&')[0];
    var data = { "code": str }

    this._http.post(this.apiUrl + '/api/auth/callback', data).subscribe(
      res => {
        var user_id = res["user"]["id"];
        var produtos = JSON.parse(localStorage.getItem('cart-items'));
        var value = 0;
        var endereco = this.pedidoForm.get('bairro').value + ", " + this.pedidoForm.get('rua').value + ", " + this.pedidoForm.get('numero').value;
        var contato = this.pedidoForm.get('contato').value;

        produtos.forEach(element => {
          value += parseFloat(element.preco);
        });

        var data = {
          "user_id": user_id,
          "valor_total": value,
          "produtos": produtos,
          "endereco": endereco,
          "contato": contato
        }

        this._pedidos.addPedido(data).subscribe(
          res => {
            window.location.href = "https://portalsulweb.com.br/sites/adepizzas.com.br/";
            localStorage.removeItem('cart-items');
          },
          err => {
            console.log(err)
          }
        )

      },
      err => {
        console.log(err);
      }
    );
  }

}
//http://localhost:4200/callback/?#access_token=EAAPyYcFPgDkBAEfzEx8cQHg5j2vgriSVVS16Rrej0MtgIPAmvY36tx0bLU0AP9DSR9sUEwsyyphayNele1PZBW5PUned6thndIt0dzZAYvXnEFvKnRpgPOZB1Mr1compZCSmbU6d5AsTZBuO3nZAQAHWnLarR8JDZC6fM6utnlMDwZDZD&data_access_expiration_time=1566888902&expires_in=5183727
