import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CupomService {

  apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  get() {
    return this._http.get(this.apiUrl + 'api/cupom');
  }

  add(data) {
    return this._http.post(this.apiUrl + 'api/cupom', data);
  }

  delete(id) {
    return this._http.delete(this.apiUrl + 'api/cupom/' + id);
  }

  edit(id, data) {
    return this._http.patch(this.apiUrl + 'api/cupom/' + id, data);
  }

  checkValidity(code) {
    return this._http.get(this.apiUrl + 'api/cupom/validity/' + code );
  }

  cancelar(id) {
    return this._http.get(this.apiUrl + 'api/cupom/cancel/' + id);
  }

  ativar(id) {
    return this._http.get(this.apiUrl + 'api/cupom/activate/' + id);
  }

}
