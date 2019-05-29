import { Component, OnInit } from '@angular/core';
import { CardapioItem } from '@models/cardapio-item';
import { Produto } from '@models/produto';
import { ProdutosService } from '../../../core/services/produtos.service';

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

  constructor(
    private _produtos: ProdutosService) {
  }

  ngOnInit() {
    this.getProdutos();
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
      if(produto.tipo == 'Pizza') {
        this.pizzas.push(produto);
      }

      if(produto.tipo == 'Pastel') {
        this.pasteis.push(produto);
      }
    });

  }

}
