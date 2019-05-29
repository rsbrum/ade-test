import { Component, OnInit } from '@angular/core';
import { PedidosService } from '@services/pedidos.service';

@Component({
  selector: 'app-pedidos-pendentes-table',
  templateUrl: './pedidos-pendentes-table.component.html',
  styleUrls: ['./pedidos-pendentes-table.component.css']
})
export class PedidosPendentesTableComponent implements OnInit {

  pedidos;
  selected = [];
  disabledEdit: Boolean = true;
  disabledConcluir: Boolean = true;
  disabledDelete: Boolean = true;

  constructor(private _pedidos: PedidosService) { }

  ngOnInit() {
    this.getPedidos();
  }

  getPedidos() {
    this._pedidos.getPendentes().subscribe(
      res => {
        this.pedidos = res["pedidos_pendentes"];
      },
      err => {
        console.log(err)
      }
    )
  }

  selectProduto(item): void {
    /** Push/pop selected items */
    if (this.selected.includes(item)) {
      for (var x = 0; x < this.selected.length; x++) {
        if (this.selected[x].id == item.id) {
          this.selected.splice(x, 1)
          break;
        }
      }
    } else {
      this.selected.push(item);
    }

    /** Enable/disable edit*/
    if (this.selected.length > 1)
      this.disabledEdit = true;

    if (this.selected.length == 0)
      this.disabledEdit = true;

    if (this.selected.length == 1)
      this.disabledEdit = false;

    /** Enable/disable delete */
    if (this.selected.length > 0)
      this.disabledDelete = false;

    if (this.selected.length == 0)
      this.disabledDelete = true;

    /** Enable/disable delete */
    if (this.selected.length > 0)
      this.disabledConcluir = false;

    if (this.selected.length == 0)
      this.disabledConcluir = true;
  }

  cancelarPedido() {
    var pedidos_ids = [];

    this.selected.forEach(item => {
      pedidos_ids.push(item["id"]);
    });

    var ids =  {
      "pedidos_ids":  pedidos_ids
    };

    this._pedidos.cancelarPedido(ids).subscribe(
      res => {
        this.getPedidos();
        this.selected = [];
        console.log(res);

      },
      err => {
        console.log(err)
      }
    );

  }

  concluirPedido() {
    var pedidos_ids = [];

    this.selected.forEach(item => {
      pedidos_ids.push(item["id"]);
    });

    var ids =  {
      "pedidos_ids":  pedidos_ids
    };

    this._pedidos.concluirPedido(ids).subscribe(
      res => {
        this.getPedidos();
        this.selected = [];
        console.log(res);

      },
      err => {
        console.log(err)
      }
    );

  }

  searchItems(str): void {
    if(str == undefined) {
      return
    }
    if(str.length == 0) {
      this.getPedidos();
    }

    var matchedItems = []
    var regex = new RegExp(str.toLowerCase());
    //var len = search.length;

    this.pedidos.forEach((item) => {
      var id = item.id.toString();
      var nome = item.user_name['name'];

      if (regex.test(nome.toLowerCase())) {
        matchedItems.push(item)
      }


      if (regex.test(id.toLowerCase())) {
        matchedItems.push(item)
      }

    })

    this.pedidos = matchedItems;
  }
}
