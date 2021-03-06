import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CardapioItem } from '@models/cardapio-item';
import { FormGroup, FormControl } from '@angular/forms';
import { CartService } from '@services/cart.service';
import { CupomService } from '@services/cupom.service';
import { AuthService } from '@services/auth.service';
import { PedidosService } from '@services/pedidos.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit {

  public cartItems;
  public cartEmpty = true;
  public total;
  public total_display;
  public errorCupom = false;
  public cupomSuccess = false;
  disabled = false;

  cupomForm = new FormGroup({
    codigo: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<CartModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _cart: CartService,
    private _auth: AuthService,
    private _pedidos : PedidosService,
    private _cupom: CupomService) {

      var d = new Date();
      var currtime = d.getHours() * 100 + d.getMinutes();

/*       if(currtime > 1800 && currtime < 2315) {
        this.disabled = false;
      } else {
        this.disabled = true;
      } */
     }

  ngOnInit() {
    if (document.documentElement.clientWidth < 1200) {
      this.dialogRef.updateSize("99%", "auto");
    }

    this.getCartItems();
    this.calcularTotal();

  }

  updateTotalEvent() {
    this.calcularTotal();

  }

  calcularTotal() {

    var value = 0.0;
    var cart = JSON.parse(localStorage.getItem('cart-items'));

    if(this.cartItems) {
      var precos = [];
      var x = 0.0;

      cart.forEach(element => {
        x = parseFloat(element.preco);
        precos.push(x * element.quantidade);
        console.log(element.quantidade);
      });

      console.log(precos);

      precos.forEach(element => {
        value += parseFloat(element);
      });

      this.total = value;
      this.total_display = this.total.toFixed(2).replace('.', ',')

    } else {
      this.total = value;
      this.total_display = this.total.toFixed(2).replace('.', ',')
    }


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCartItems(): void {

    if(JSON.parse(localStorage.getItem('cart-items'))) {
      this.cartItems = JSON.parse(localStorage.getItem('cart-items'));
      if(this.cartItems.length == 0) {
        this.cartEmpty = true;
      } else {
        this.cartEmpty = false;
      }
    } else {
      this.cartEmpty = true;
    }

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

  applyCupom() {
    var cupom = this.cupomForm.get('codigo').value;

    if(this.cupomSuccess) {
      this.errorCupom = true;
      return;
    }

    this._cupom.checkValidity(cupom).subscribe(
      res => {
        if(res['status']){
          this.cupomSuccess = true;

          var percent = res['cupom']['porcentagem'];
          var subtract = (this.total * percent) / 100;
          this.total = (this.total - subtract).toFixed(2);
          this.total_display = this.total;

        } else {
          this.errorCupom = true;
        }
      },
      err => {
        console.log(err)
      }
    )
  }

  close(): void{
    this.dialogRef.close();
  }

}
