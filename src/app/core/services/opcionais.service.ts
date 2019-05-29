import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class OpcionaisService {

  apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient
  ) { }

  getOpcionais() {
    return this._http.get(this.apiUrl + 'api/opcional');
  }

  getOpcional(produto_id) {
    return this._http.get(this.apiUrl + 'api/opcional/' + produto_id);
  }

  addOpcional(data) {
    return this._http.post(this.apiUrl + '/api/opcional', data);
  }

  deleteOpcional() {

  }

  editOpcional() {

  }

}
