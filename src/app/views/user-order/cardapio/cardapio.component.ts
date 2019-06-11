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
  cervejas = [];
  refrigerantes = [];
  sucos = [];
  aguas = [];
  espumantes = [];
  date;
  constructor(
    private _produtos: ProdutosService) {
    var d = new Date();
    var currtime = d.getHours() * 100 + d.getMinutes();

    if(currtime > 1800 && currtime < 2315) {
      this.date = true;
    } else {
      this.date = false;
    }

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
