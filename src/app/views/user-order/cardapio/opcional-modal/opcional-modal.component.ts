import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SaboresService } from '@services/sabores.service';
import { OpcionaisService } from '@services/opcionais.service';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-opcional-modal',
  templateUrl: './opcional-modal.component.html',
  styleUrls: ['./opcional-modal.component.css']
})
export class OpcionalModalComponent implements OnInit {

  public sabores;
  public opcionais;
  sabores_pedido = [];
  opcionais_pedido = [];
  sabor_quantidade = [];
  adicional = 0.0;
  adicional_display;
  quantidade = 1;

  constructor(
    public _cartService: CartService,
    public _opcionais: OpcionaisService,
    public _sabores: SaboresService,
    public dialogRef: MatDialogRef<OpcionalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ) { }

  ngOnInit() {

    this.adicional_display = this.adicional.toFixed(2).replace('.', ',')

    for(let x=0; x < this.data.quantidade_sabores; x++) {
      this.sabor_quantidade.push('1');
    }

    if (document.documentElement.clientWidth < 1200) {
      this.dialogRef.updateSize("99%", 'auto');
    }

    this.getSabores();
    this.getOpcionais();
  }

  updateOpcionalAdicional() {
    this.adicional = 0.0;
    this.opcionais_pedido.forEach( opcional => {
      this.adicional += parseFloat(opcional['adicional']);
    })

    this.adicional_display = this.adicional.toFixed(2).replace('.', ',');

  }

  removeMeiaBorda() {

  }

  selectOpcional(item) {
    if (this.opcionais_pedido.includes(item)) {
      for (var x = 0; x < this.opcionais_pedido.length; x++) {
        if (this.opcionais_pedido[x].id == item.id) {
          this.opcionais_pedido.splice(x, 1)
          break;
        }
      }
    } else {
      this.opcionais_pedido.push(item);
    }
    this.updateOpcionalAdicional();
  }

  addToCart(): void {
    this.data["sabores_info"] = this.sabores_pedido;
    this.data["opcionais_info"] = this.opcionais_pedido;
    this.data["preco"] = parseFloat(this.data["preco"]) + this.adicional;
    this.data["quantidade"] = this.quantidade;
    this._cartService.addItem(this.data);
    this.updateCartHeader();
    this.dialogRef.close('success');

  }

  onChangeSelected() {
    console.log(this.quantidade);

  }

  updateCartHeader(): void {
    var items = JSON.parse(localStorage.getItem('cart-items')).length;
    this._cartService.updateNumberItems(items);
  }

  getSabores() {
    this._sabores.getSaborByTipo(this.data.tipo).subscribe(
      res => {
        this.sabores = res["sabores"];
      },
      err => {
        console.log(err)
      }
    )
  }

  getOpcionais() {
    this._opcionais.getOpcional(this.data.id).subscribe(
      res => {
        this.opcionais = res["opcionais"];

        if(this.data.quantidade_sabores == '1') {
          var regex = /meia/;
          var opcionaisSemMeia = [];

          this.opcionais.forEach( elm => {
            if(!regex.test(elm["nome"].toLowerCase())){
              opcionaisSemMeia.push(elm);
            }
          });

          this.opcionais = opcionaisSemMeia;

        }

      },
      err => {
        console.log(err);
      }
    )
  }

  selectSabor(sabor, index) {
    this.sabores_pedido[index] = sabor;
  }

}
