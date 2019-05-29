import { Component, OnInit } from '@angular/core';
import { PedidosService } from '@services/pedidos.service';

@Component({
  selector: 'app-pedidos-table',
  templateUrl: './pedidos-table.component.html',
  styleUrls: ['./pedidos-table.component.css']
})
export class PedidosTableComponent implements OnInit {

  selected = [];
  pedidos = [];
  disabledEdit: Boolean = true;
  disabledConcluir: Boolean = true;
  disabledDelete: Boolean = true;

  constructor(
    /* public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _produtos: ProdutosService, */
    private _pedidos: PedidosService
  ) { }

  ngOnInit() {
    this.getPedidos();

  }

  getPedidos() {
    this._pedidos.getPedidos().subscribe(
      res => {
        this.pedidos = res["pedidos"];
        console.log(this.pedidos);
      },
      err => {
        console.log(err);
      }
    )
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
  /*
    openEdit(): void {
      const dialogRef = this.dialog.open(EditProdutoModalComponent, {
        height: 'auto',
        width: '50%',
        data: this.selected[0]
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result === 'success') {
          this.snackBar.open('Produto editado!', 'Ok', {duration: 3000});
        }

        this.getPedidos();
      });
    }

    openAdd(): void {
      const dialogRef = this.dialog.open(AddProdutoModalComponent, {
        height: 'auto',
        width: '60%'
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result === 'success') {
          this.snackBar.open('Produto adicionado!', 'Ok', {duration: 3000});
        }

        this.getPedidos();
      });

    }

    openDelete() {
      const dialogRef = this.dialog.open(DeleteProdutoModalComponent, {
        height: 'auto',
        width: '60%',
        data: this.selected[0]
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result === 'success') {
          this.snackBar.open('Produto deletado!', 'Ok', {duration: 3000});
        }

        this.getPedidos();
      });
    } */

  sortBy(key): void {
    /** Sort on click by key */
        var array = this.pedidos;
        var res;

        if(key === 'id')
        {

        }
        res = array.sort(function (a, b) {
          var x = a[key]; var y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        console.log(res);
        this.pedidos = res;
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
