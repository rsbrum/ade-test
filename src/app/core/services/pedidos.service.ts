import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient
  ) { }

  addPedido(data) {
    return this._http.post(this.apiUrl + "api/pedidos", data);
  }

  getPendentes() {
    return this._http.get(this.apiUrl + "api/pedidos/pendentes");
  }

  getPedidos() {
    return this._http.get(this.apiUrl + 'api/pedidos');
  }

  concluirPedido(pedido_id) {
    return this._http.post(this.apiUrl + "api/pedidos/concluir", pedido_id);
  }

  cancelarPedido(pedido_id) {
    return this._http.post(this.apiUrl + "api/pedidos/cancelar", pedido_id);
  }

}
