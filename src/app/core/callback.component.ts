import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '@env/environment';
import { PedidosService } from '@services/pedidos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: 'callback.component.html'
})
export class CallbackComponent implements OnInit {
  public myModel = ''
  public mask = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  apiUrl = environment.apiUrl;
  clicked: Boolean = false;
  entrega: Boolean = false;
  local: Boolean = false;
  show_pedidoForm: Boolean = false;
  show_tele_error: Boolean = false;
  show_pedidoForm_error: Boolean = false;
  show_localForm_error: Boolean = false;
  user_id;
  valor_total = 0;
  valor_total_display;
  produtos;
  endereco;

  pedidoForm = new FormGroup({
    rua: new FormControl('', Validators.required),
    bairro: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    complemento: new FormControl('', Validators.required),
    contato: new FormControl('', Validators.required)
  });

  localForm = new FormGroup({
    contato: new FormControl('', Validators.required)
  });

  complementoForm = new FormGroup({
    complemento: new FormControl('', Validators.required)
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

    this.produtos = JSON.parse(localStorage.getItem('cart-items'));

    var precos = [];
    var x = 0.0;

    this.produtos.forEach(element => {
      x = parseFloat(element.preco);
      precos.push(x * element.quantidade);
    });

    precos.forEach(element => {
      this.valor_total += parseFloat(element);
    });

    this.valor_total_display = this.valor_total.toFixed(2).replace('.', ',')
    this.endereco = JSON.parse(localStorage.getItem('endereco'));

    if (this.endereco) {
      this.pedidoForm.get('rua').setValue(this.endereco[0].rua);
      this.pedidoForm.get('bairro').setValue(this.endereco[0].bairro);
      this.pedidoForm.get('numero').setValue(this.endereco[0].numero);
      this.pedidoForm.get('complemento').setValue(this.endereco[0].complemento);
    }
  }

  setLocal() {

    if (this.entrega == true) {
      this.valor_total = this.valor_total - 8;
    }

    this.local = true;
    this.entrega = false;
    this.show_pedidoForm = false;
  }

  pipe(preco, quantidade) {
    var price = preco * quantidade;
    return price.toFixed(2).replace('.', ',');
  }
  setTele() {
    if (this.entrega == false) {
      this.valor_total += 8;
    }

    this.show_pedidoForm = true;
    this.entrega = true;
    this.local = false;

  }

  cleanContato(str) {
    var buffer = "";
    for (var x = 0; x < str.length; x++) {
      if (str[x] != ' ') {
        buffer += str[x]
      }
    }

    return buffer;
  }

  callback(): void {

    this.clicked = true;

    var end = [{
      'rua': this.pedidoForm.get('rua').value,
      'bairro': this.pedidoForm.get('bairro').value,
      'numero': this.pedidoForm.get('numero').value,
      'complemento': this.pedidoForm.get('complemento').value
    }];

    localStorage.setItem('endereco', JSON.stringify(end));

    var url = window.location.href;
    var str = url.split('=')[1];
    str = str.split('&')[0];

    var data = { "code": str }
    var produtos = JSON.parse(localStorage.getItem('cart-items'));
    var value = 0;
    var endereco = "";
    var contato = "";
    var complemento = this.complementoForm.get('complemento').value;

/*     produtos.forEach(element => {
      value += parseFloat(element.preco);
    });
 */
    var precos = [];
    var x = 0.0;

    produtos.forEach(element => {
      x = parseFloat(element.preco);
      precos.push(x * element.quantidade);
    });

    precos.forEach(element => {
      value += parseFloat(element);
    });

    if (this.local == true && this.entrega == true) {
      this.show_tele_error = true;
      this.clicked = false;
      return;
    }

    if (!this.pedidoForm.valid && this.entrega == true) {
      this.show_pedidoForm_error = true;
      this.clicked = false;
      return;
    }

    this.show_pedidoForm_error = false;

    if (this.entrega == true) {
      value += 8;
      endereco = this.pedidoForm.get('bairro').value + " & " + this.pedidoForm.get('rua').value + " & "
        + this.pedidoForm.get('numero').value + " & " + this.pedidoForm.get('complemento').value;
      contato = this.cleanContato(this.pedidoForm.get('contato').value);
    }

    if (this.local == true) {
      endereco = "Retirar no local";

      if (!this.localForm.valid) {
        this.show_localForm_error = true;
        this.clicked = false;
        return;
      }

      contato = this.cleanContato(this.localForm.get('contato').value);
    }

    if (this.user_id) {
      var user_id = this.user_id;

      var data_pedido = {
        "user_id": user_id,
        "valor_total": value,
        "produtos": produtos,
        "endereco": endereco,
        "contato": contato,
        "complemento": complemento
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
          /*           var produtos = JSON.parse(localStorage.getItem('cart-items'));
                    var value = 0;
                    var endereco = this.pedidoForm.get('bairro').value + " & " + this.pedidoForm.get('rua').value + " & " + this.pedidoForm.get('numero').value;
                    var contato = this.cleanContato(this.pedidoForm.get('contato').value);

                    produtos.forEach(element => {
                      value += parseFloat(element.preco);
                    });
          */
          var data = {
            "user_id": user_id,
            "valor_total": value,
            "produtos": produtos,
            "endereco": endereco,
            "contato": contato,
            "complemento": complemento
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
