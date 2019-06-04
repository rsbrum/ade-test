import { Component, OnInit, Input, Inject } from '@angular/core';
import { CardapioItem } from '@models/cardapio-item';
import { CartService } from '@services/cart.service';
import { OpcionalModalComponent } from '../opcional-modal/opcional-modal.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-cardapio-item',
  templateUrl: './cardapio-item.component.html',
  styleUrls: ['./cardapio-item.component.css']
})
export class CardapioItemComponent implements OnInit {

  @Input() itemInfo;
  public added: Boolean;
  public isInCart: Boolean = false;
  public showBtn: Boolean = true;
  public preco;

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
   ) {

   }

  ngOnInit() {
    this.preco = this.itemInfo["preco"].replace('.', ',')
    if (this.checkInCart())
      this.isInCart = true;

    this.cartService.numberItems().subscribe(res => {
      this.isInCart = this.checkInCart();
    },
      err => {
        console.log(err)
      })

    /** Set default quantidade to 1 */
    this.itemInfo["quantidade"] = 1;

  }

  checkItemTipo() {

  }

  btnAction() {
    var opcional = parseInt(this.itemInfo.opcional);

    switch (opcional) {
      case 1: {
        this.openOpcional();
        break;
      }
      case 0: {
        this.addToCart();
        break;
      }

    }

  }

  openOpcional() {
    const dialogRef = this.dialog.open(OpcionalModalComponent, {
      height: 'auto',
      width: '50%',
      data: this.itemInfo
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result === 'success'){
        this.isInCart = true;
      }

    });
  }


  addToCart(): void {
    this.cartService.addItem(this.itemInfo);
    this.updateCartHeader();
    this.isInCart = true;
  }

  updateCartHeader(): void {
    var items = JSON.parse(localStorage.getItem('cart-items')).length;
    this.cartService.updateNumberItems(items);
  }

  checkInCart(): Boolean {
    var id = this.itemInfo.id;
    var items = JSON.parse(localStorage.getItem('cart-items'));

    if (!items)
      return false

    for (let item of items) {
      if (id == item.id) {
        return true;
      }
    }

    return false;
  }

}
