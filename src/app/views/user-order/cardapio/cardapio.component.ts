import { Component, OnInit } from '@angular/core';
import { CardapioItem } from '@models/cardapio-item';
import { Produto } from '@models/produto';
import { ProdutosService } from '../../../core/services/produtos.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { CardapioModalComponent } from './cardapio-modal/cardapio-modal.component';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {

  //produtos: Produto[];
  produtos = [];
  pizzas = [];
  vinhos = [];
  porcoes = [];
  pasteis = [];
  cervejas = [];
  refrigerantes = [];
  sucos = [];
  aguas = [];
  espumantes = [];
  date = false;

  constructor(
    private _produtos: ProdutosService,
    private dialog: MatDialog) {
    var d = new Date();
    var currtime = d.getHours() * 100 + d.getMinutes();
/*
    if(currtime > 1800 && currtime < 2315) {
      this.date = true;
    } else {
      this.date = false;
    } */

  }

  ngOnInit() {
    this.getProdutos();

  }

  openCardapioModal() {
    const dialogRef = this.dialog.open(CardapioModalComponent, {
      height: 'auto',
      width: '50%',
      panelClass: 'cardapio-class'
    });

    dialogRef.afterClosed().subscribe(result => {
/*
      if(result === 'success'){
        this.snackBar.open('Produto adicionado ao carrinho!', 'OK', {duration: 3000});
        this.isInCart = true;
      } */

    });
  }

  getProdutos() {
    this._produtos.getProdutos().subscribe(
      res => {
        this.produtos = res["produtos"];
        this.sortProdutos();
      },
      err => {
        console.log(err);
      }
    )
  }

  sortProdutos() {
    this.produtos.forEach(produto => {
      if (produto.tipo == 'Pizza') {
        this.pizzas.push(produto);
      }

      if (produto.tipo == 'Pastel') {
        this.pasteis.push(produto);
      }

      if (produto.tipo == 'Cerveja') {
        this.cervejas.push(produto);
      }

      if (produto.tipo == 'Espumante') {
        this.espumantes.push(produto);
      }

      if (produto.tipo == 'Suco') {
        this.sucos.push(produto);
      }

      if (produto.tipo == 'Porcao') {
        this.porcoes.push(produto);
      }

      if (produto.tipo == 'Vinho') {
        this.vinhos.push(produto);
      }

      if (produto.tipo == 'Agua') {
        this.aguas.push(produto);
      }

      if (produto.tipo == 'Refrigerante') {
        this.refrigerantes.push(produto);
      }

    });

  }

}
