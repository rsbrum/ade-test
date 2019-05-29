import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private updateCart = new Subject<Number>();

  constructor() { }

  numberItems(): Observable<Number> {
    return this.updateCart.asObservable()
  }

  updateNumberItems(n: Number): void {
    this.updateCart.next(n);
  }

  addItem(itemInfo) {
    if (!localStorage.getItem('cart-items')) {
      var x = []
      localStorage.setItem('cart-items', JSON.stringify(x));
    }

    var items = JSON.parse(localStorage.getItem('cart-items'));
    items.push(itemInfo);

    localStorage.setItem('cart-items', JSON.stringify(items));
  }

}
