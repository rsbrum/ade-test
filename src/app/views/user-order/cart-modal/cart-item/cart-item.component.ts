import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { CardapioItem } from '@models/cardapio-item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() data;
  @Output() deleteEvent = new EventEmitter<String>();
  @Output() updateTotalEvent = new EventEmitter<String>();
  selected = 1;
  price_display;
  price = 0.0;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
    this.selected = this.data["quantidade"];
    this.price= this.data["preco"] * this.data["quantidade"];
    this.price_display = this.price.toFixed(2).replace('.', ',')
  }

  deleteItem(): void {
    this.deleteEvent.emit(this.data.id)
  }

  onChangeSelected() {
    var produtos = JSON.parse(localStorage.getItem('cart-items'));

    produtos.forEach(produto => {
      if(produto.id === this.data.id) {
        produto["quantidade"] = this.selected;
        localStorage.setItem('cart-items', JSON.stringify(produtos));
      }
    })

    this.updateTotalEvent.emit(this.data.id);
  }
}
