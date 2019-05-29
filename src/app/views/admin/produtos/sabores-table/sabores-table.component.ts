import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { SaboresService } from '@services/sabores.service';
import { AddSaborModalComponent } from './add-sabor-modal/add-sabor-modal.component';

@Component({
  selector: 'app-sabores-table',
  templateUrl: './sabores-table.component.html',
  styleUrls: ['./sabores-table.component.css']
})
export class SaboresTableComponent implements OnInit {

  disabledEdit: Boolean = true;
  disabledDelete: Boolean = true;
  selected = [];
  sabores;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public _sabores: SaboresService
  ) { }

  ngOnInit() {
    this.getSabores();
  }

  openAdd() {
    const dialogRef = this.dialog.open(AddSaborModalComponent, {
      height: 'auto',
      width: '50%',
      data: this.selected[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success') {
        this.snackBar.open('Produto editado!', 'Ok', {duration: 3000});
      }

      this.getSabores();
    });
  }

  getSabores() {
    this._sabores.getSabores().subscribe(
      res => {
        this.sabores = res["sabores"];
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  openEdit(): void {
/*     const dialogRef = this.dialog.open(EditProdutoModalComponent, {
      height: 'auto',
      width: '50%',
      data: this.selected[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success') {
        this.snackBar.open('Produto editado!', 'Ok', {duration: 3000});
      }

      this.getSabores();
    }); */
  }

  openDelete() {
/*     const dialogRef = this.dialog.open(DeleteProdutoModalComponent, {
      height: 'auto',
      width: 'auto',
      data: this.selected[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success') {
        this.snackBar.open('Produto deletado!', 'Ok', {duration: 3000});
      }

      this.getSabores();
    }); */
  }

  sortBy(key): void {
    /** Sort on click by key */
    var array = this.sabores;
    var res;

    res = array.sort(function (a, b) {
      var x = a[0]; var y = b[0];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    this.sabores = res;
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
      this.getSabores();
    }

    var matchedItems = []
    var regex = new RegExp(str.toLowerCase());
    //var len = search.length;

    this.sabores.forEach((item) => {


      if (regex.test(item.codigo.toLowerCase())) {
        matchedItems.push(item)
      }

      var id = item.id.toString();
      if (regex.test(id.toLowerCase())) {
        matchedItems.push(item)
      }

    })

    this.sabores = matchedItems;
  }
}
