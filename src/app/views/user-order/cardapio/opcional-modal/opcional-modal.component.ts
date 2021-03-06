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
  public opcionais = [];
  sabores_pedido = [];
  opcionais_pedido = [];
  sabor_quantidade = [];
  adicional = 0.0;
  adicional_display;
  quantidade = 1;
  sabores_error = false;
  meiaBorda = [];
  bordaInteira = [];
  showMeia: Boolean = false;
  showInteira: Boolean = false;
  meiaBordaPedido = [];
  bordaInteiraPedido;
  nenhumaBorda = false;
  bordaError = false;

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

  filterBordas() {
    var regex = /meia borda/;

    this.opcionais.forEach( elm => {
      if(regex.test(elm["nome"].toLowerCase())){
        this.meiaBorda.push(elm);
      }
    });


    console.log(this.opcionais)
    this.opcionais.forEach( elm => {
      if(elm["nome"].toLowerCase().includes('borda') && !elm["nome"].toLowerCase().includes('meia')){
        this.bordaInteira.push(elm);
      }
    });

  }

  filterOpcionais() {

    for(var x = 0; x < this.opcionais.length; x++) {
      for(var y = 0; y < this.meiaBorda.length; y++) {
        if(this.meiaBorda[y]['nome'].toLowerCase() == this.opcionais[x]['nome'].toLowerCase()) {
          this.opcionais.splice(x, 1)
        }
      }
    }

    for(var x = 0; x < this.opcionais.length; x++) {
      for(var y = 0; y < this.bordaInteira.length; y++) {
        if(this.bordaInteira[y]['nome'].toLowerCase() == this.opcionais[x]['nome'].toLowerCase()) {
          this.opcionais.splice(x, 1)
        }
      }
    }

  }

  selectBordas(value) {

    if(value == 'meia') {
      this.showMeia = true;
      this.showInteira = false;
    }

    if(value == 'inteira') {
      this.showInteira = true;
      this.showMeia = false;
    }

    if(value == 'nenhum') {
      this.nenhumaBorda = true;
      this.showInteira = false;
      this.showMeia = false;
    }
  }

  selectBordaInteira(borda) {
    this.bordaInteiraPedido = borda;
    this.updateOpcionalAdicional();
  }

  selectMeiaBorda(borda, index) {
    this.meiaBordaPedido[index] = borda;
    this.updateOpcionalAdicional();
  }

  updateOpcionalAdicional() {
    this.adicional = 0.0;


    if(this.showMeia) {
      this.meiaBordaPedido.forEach(elm => {
        this.adicional += parseFloat(elm['adicional']);
      });
    }

    if(this.showInteira) {
      this.adicional += parseFloat(this.bordaInteiraPedido['adicional']);
    }

    this.opcionais_pedido.forEach( opcional => {
      this.adicional += parseFloat(opcional['adicional']);
    })

    this.adicional_display = this.adicional.toFixed(2).replace('.', ',');

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

    console.log(this.bordaError, this.sabores_error, this.data.sabores);

    this.bordaError = false;
    this.sabores_error = false;

    if(this.data.sabores == 0) {

      this.data["sabores_info"] = this.sabores_pedido;
      this.data["opcionais_info"] = this.opcionais_pedido;
      this.data["preco"] = parseFloat(this.data["preco"]) + this.adicional;
      this.data["quantidade"] = this.quantidade;
      this._cartService.addItem(this.data);
      this.updateCartHeader();
      this.dialogRef.close('success');
      return;

    }

    if(this.showMeia) {
      this.meiaBordaPedido.forEach(elm => {
        this.opcionais_pedido.push(elm);
      });

      if(this.meiaBordaPedido.length < 2 && !this.nenhumaBorda) {
        this.bordaError = true;
      } else {
        this.bordaError = false;
      }
    }

    if(this.showInteira) {
      this.opcionais_pedido.push(this.bordaInteiraPedido);

      if(!this.bordaInteiraPedido && !this.nenhumaBorda) {
        this.bordaError = true;
      } else {
        this.bordaError = false;
      }
    }

    if(!this.showInteira && !this.showMeia && !this.nenhumaBorda) {
      this.bordaError = true;
    }

    if(this.sabores_pedido.length > 0 || this.sabores_pedido.length == 0) {

      console.log(this.sabores_pedido.length, this.data.quantidade_sabores);

      if(this.sabores_pedido.length == 0) {
        this.sabores_error = true;
        return;
      }

      if(this.bordaError) {
        return;
      }


      this.data["sabores_info"] = this.sabores_pedido;
      this.data["opcionais_info"] = this.opcionais_pedido;
      this.data["preco"] = parseFloat(this.data["preco"]) + this.adicional;
      this.data["quantidade"] = this.quantidade;
      this._cartService.addItem(this.data);
      this.updateCartHeader();
      this.dialogRef.close('success');
      return;
    }

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
        this.filterBordas();
        this.filterOpcionais();

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

  selectSabor(ev, index) {
    this.sabores_pedido[index] = ev;
  }

}
