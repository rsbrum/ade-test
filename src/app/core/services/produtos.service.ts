import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient
  ) { }

  getProdutos() {
    return this._http.get(this.apiUrl + "api/produtos");
  }

  addProduto(data) {
    return this._http.post(this.apiUrl + "api/produtos", data);
  }

  editProduto(data, id) {
    return this._http.patch(this.apiUrl + "api/produtos/"  + id, data);
  }

  deleteProduto(id) {
    return this._http.delete(this.apiUrl + "api/produtos/"  + id)
  }

}
