import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditProdutoModalComponent } from './edit-produto-modal/edit-produto-modal.component'
import { AddProdutoModalComponent } from './add-produto-modal/add-produto-modal.component';
import { DeleteProdutoModalComponent } from './delete-produto-modal/delete-produto-modal.component';
import { Produto } from '@models/produto';
import { ProdutosService } from '../../../../core/services/produtos.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-produtos-table',
  templateUrl: './produtos-table.component.html',
  styleUrls: ['./produtos-table.component.css']
})
export class ProdutosTableComponent implements OnInit {

  selected: Produto[] = [];
  produtos: Produto[];
  disabledEdit: Boolean = true;
  disabledDelete: Boolean = true;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _produtos: ProdutosService,
    ) { }

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos() {
    this._produtos.getProdutos().subscribe(
      res => {
        this.produtos = res["produtos"];
        console.log(this.produtos);
      },
      err => {
        console.log(err);
      }
    )
  }

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

      this.getProdutos();
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

      this.getProdutos();
      this.selected = [];
    });

  }

  openDelete() {
    const dialogRef = this.dialog.open(DeleteProdutoModalComponent, {
      height: 'auto',
      width: 'auto',
      data: this.selected[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success') {
        this.snackBar.open('Produto deletado!', 'Ok', {duration: 3000});
      }

      this.getProdutos();
      this.selected = [];
    });
  }

  sortBy(key): void {
    /** Sort on click by key */
    var array = this.produtos;
    var res;

    res = array.sort(function (a, b) {
      var x = a[0]; var y = b[0];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    this.produtos = res;
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
  }

  searchItems(str): void {
    if(str == undefined) {
      return
    }
    if(str.length == 0) {
      this.getProdutos();
    }

    var matchedItems = []
    var regex = new RegExp(str.toLowerCase());
    //var len = search.length;

    this.produtos.forEach((item) => {


      if (regex.test(item.codigo.toLowerCase())) {
        matchedItems.push(item)
      }

      var id = item.id.toString();
      if (regex.test(id.toLowerCase())) {
        matchedItems.push(item)
      }

    })

    this.produtos = matchedItems;
  }

}
