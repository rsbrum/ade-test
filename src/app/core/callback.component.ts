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
  public myModel = ''
  public mask = [ /[1-9]/, /\d/, ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  apiUrl = environment.apiUrl;
  clicked: Boolean = false;
  user_id;
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
    this.activatedRoute.queryParams.subscribe(params => {
      this.user_id = params['user_id'];
    });
  }

  cleanContato(str) {
    console.log('here');
    var buffer = "";
    for(var x = 0; x< str.length; x++) {
      if(str[x] != ' ') {
        buffer += str[x]
      }
    }

    return buffer;
  }

  callback(): void {
    this.clicked = true;
    var url = window.location.href;
    var str = url.split('=')[1];
    str = str.split('&')[0];
    var data = { "code": str }

    if (this.user_id) {
      var user_id = this.user_id;
      var produtos = JSON.parse(localStorage.getItem('cart-items'));
      var value = 0;
      var endereco = this.pedidoForm.get('bairro').value + ", " + this.pedidoForm.get('rua').value + ", " + this.pedidoForm.get('numero').value;
      var str1 = this.pedidoForm.get('contato').value;
      var contato = this.cleanContato(str1);

      produtos.forEach(element => {
        value += parseFloat(element.preco);
      });

      var data_pedido = {
        "user_id": user_id,
        "valor_total": value,
        "produtos": produtos,
        "endereco": endereco,
        "contato": contato
      }
      //normal user
      this._pedidos.addPedido(data_pedido).subscribe(
        res => {
          this.clicked = false;
          window.location.href = "https://ade-pizzas.herokuapp.com/";
          localStorage.removeItem('cart-items');
        },
        err => {
          this.clicked = false;
          console.log(err)
        }
      )
      return;
    }

    //if facebook code is available
    if (data) {
      this._http.post(this.apiUrl + '/api/auth/callback', data).subscribe(
        res => {

          var user_id = res["user"]["id"];
          var produtos = JSON.parse(localStorage.getItem('cart-items'));
          var value = 0;
          var endereco = this.pedidoForm.get('bairro').value + ", " + this.pedidoForm.get('rua').value + ", " + this.pedidoForm.get('numero').value;
          var contato = this.cleanContato(this.pedidoForm.get('contato').value);

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
              this.clicked = false;
              window.location.href = "https://ade-pizzas.herokuapp.com/";
              localStorage.removeItem('cart-items');
            },
            err => {
              this.clicked = false;
              console.log(err)
            }
          )

        },
        err => {
          this.clicked = false;
          console.log(err);
        }
      );

    }

  }

}
//http://localhost:4200/callback/?#access_token=EAAPyYcFPgDkBAEfzEx8cQHg5j2vgriSVVS16Rrej0MtgIPAmvY36tx0bLU0AP9DSR9sUEwsyyphayNele1PZBW5PUned6thndIt0dzZAYvXnEFvKnRpgPOZB1Mr1compZCSmbU6d5AsTZBuO3nZAQAHWnLarR8JDZC6fM6utnlMDwZDZD&data_access_expiration_time=1566888902&expires_in=5183727
