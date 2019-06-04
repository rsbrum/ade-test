import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SaboresService {

  apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient
  ) { }

  getSabores() {
    return this._http.get(this.apiUrl + 'api/sabor');
  }

  getSaborByTipo(tipo) {
    return this._http.get(this.apiUrl + 'api/sabor/' + tipo );
  }

  getSabor() {

  }

  addSabor(data) {
    return this._http.post(this.apiUrl + 'api/sabor', data);
  }

  editSabor(data, id) {
    return this._http.patch(this.apiUrl + 'api/opcional/' + id, data);
  }

  deleteSabor(id) {
    return this._http.delete(this.apiUrl + 'api/sabor/' + id);
  }

}
