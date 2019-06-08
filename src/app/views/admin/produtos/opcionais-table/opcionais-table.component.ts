import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AddOpcionalModalComponent } from './add-opcional/add-opcional.component';
import { EditOpcionalComponent } from './edit-opcional/edit-opcional.component';
import { DeleteOpcionalComponent } from './delete-opcional/delete-opcional.component';
import { OpcionaisService } from '@services/opcionais.service';

@Component({
  selector: 'app-opcionais-table',
  templateUrl: './opcionais-table.component.html',
  styleUrls: ['./opcionais-table.component.css']
})
export class OpcionaisTableComponent implements OnInit {

  disabledEdit: Boolean = true;
  disabledDelete: Boolean = true;
  selected = [];
  opcionais;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public _opcionais: OpcionaisService
  ) { }

  ngOnInit() {
    this.getOpcionais();
  }

  openAdd() {
    const dialogRef = this.dialog.open(AddOpcionalModalComponent, {
      height: 'auto',
      width: '50%',
      data: this.selected[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.snackBar.open('Opcional adicionado!', 'Ok', { duration: 3000 });
      }

      this.getOpcionais();
    });
  }

  getOpcionais() {
    this._opcionais.getOpcionais().subscribe(
      res => {
        this.opcionais = res["opcionais"];
      },
      err => {
        console.log(err);
      }
    )
  }

  openEdit(): void {
    const dialogRef = this.dialog.open(EditOpcionalComponent, {
          height: 'auto',
          width: '50%',
          data: this.selected[0]
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result === 'success') {

            this.snackBar.open('Opcional editado!', 'Ok', {duration: 3000});
          }

          this.getOpcionais();
          this.selected = [];
        });
  }

  openDelete() {
        const dialogRef = this.dialog.open(DeleteOpcionalComponent, {
          height: 'auto',
          width: 'auto',
          data: this.selected[0]
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result === 'success') {
            this.snackBar.open('Opcional deletado!', 'Ok', {duration: 3000});
          }

          this.getOpcionais();
        });
  }

  sortBy(key): void {
    /** Sort on click by key */
    var array = this.opcionais;
    var res;

    res = array.sort(function (a, b) {
      var x = a[0]; var y = b[0];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    this.opcionais = res;
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
    if (str == undefined) {
      return
    }
    if (str.length == 0) {
      this.getOpcionais();
    }

    var matchedItems = []
    var regex = new RegExp(str.toLowerCase());
    //var len = search.length;

    this.opcionais.forEach((item) => {

      if (regex.test(item.nome.toLowerCase())) {
        matchedItems.push(item)
      }

      var id = item.id.toString();
      if (regex.test(id.toLowerCase())) {
        matchedItems.push(item)
      }

    })

    this.opcionais = matchedItems;
  }

}
