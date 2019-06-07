import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public cartSpan: Number;

  constructor(
    public dialog: MatDialog,
    private cartService: CartService,) { }


  ngOnInit() {

    if (!localStorage.getItem('cart-items')) {
      this.cartSpan = 0;
    } else {
      this.cartSpan = JSON.parse(localStorage.getItem('cart-items')).length
    }



    this.cartService.numberItems().subscribe(res => {
      if (!res)
        this.cartSpan = 0
      else
        this.cartSpan = res
    },
      err => {
        console.log(err)
      })
  }

  animal: String;

  openDialog(): void {
    const dialogRef = this.dialog.open(CartModalComponent, {
      height: '500px',
      maxHeight: '1000px',
      width: '80%',
      panelClass: 'cart-modal'
    });

  }

  toggleMenu() {
    var element = document.getElementById("collapse-menu");
    element.classList.toggle("show-menu");
  }

}
