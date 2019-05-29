import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CardapioItem } from '@models/cardapio-item';
import { CartService } from '@services/cart.service'
import { AuthService } from '@services/auth.service'
import { PedidosService } from '@services/pedidos.service'

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit {

  public cartItems;
  public total;

  constructor(
    public dialogRef: MatDialogRef<CartModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _cart: CartService,
    private _auth: AuthService,
    private _pedidos : PedidosService) { }

  ngOnInit() {
    if (document.documentElement.clientWidth < 1200) {
      this.dialogRef.updateSize("99%");
    }

    this.getCartItems();
    this.calcularTotal();

  }

  calcularTotal() {
    var value = 0;
    this.cartItems.forEach(element => {
      value += parseFloat(element.preco);
    });

    this.total = value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCartItems(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart-items'));
  }

  deleteItem(id): void{
    var cartItems = JSON.parse(localStorage.getItem('cart-items'));

    for( var x=0; x< cartItems.length; x++) {
      if(id == cartItems[x].id) {
        console.log(x);
        cartItems.splice(x, 1);
        break;
      }
    }

    this.cartItems = cartItems;
    localStorage.setItem('cart-items', JSON.stringify(this.cartItems));

    this._cart.updateNumberItems(this.cartItems.length);
    this.calcularTotal();
  }

  close(): void{
    this.dialogRef.close();
  }

}
