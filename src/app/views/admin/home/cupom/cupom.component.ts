import { Component, OnInit } from '@angular/core';
import { CupomService } from '@services/cupom.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { AddCupomModalComponent } from './add-cupom-modal/add-cupom-modal.component';
import { EditCupomModalComponent } from './edit-cupom-modal/edit-cupom-modal.component';
import { DeleteCupomModalComponent } from './delete-cupom-modal/delete-cupom-modal.component';

@Component({
  selector: 'app-cupom',
  templateUrl: './cupom.component.html',
  styleUrls: ['./cupom.component.css']
})
export class CupomComponent implements OnInit {

  cupons = [];
  selected = [];
  disabledEdit: Boolean = true;
  disabledConcluir: Boolean = true;
  disabledDelete: Boolean = true;
  disabledAtivar: Boolean = true;
  disabledCancelar: Boolean = true;

  constructor(
    private _cupons: CupomService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCupons();
  }

  getCupons() {
    this._cupons.get().subscribe(
      res => {
        this.cupons = res['cupons'];
      },
      err => {

      }
    )
  }

  openAdd(): void {
    const dialogRef = this.dialog.open(AddCupomModalComponent, {
      height: '350px',
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success') {
        this.snackBar.open('Cupom adicionado!', 'Ok', {duration: 3000});
      }

      this.getCupons();
    });

  }

  openEdit(): void {
    const dialogRef = this.dialog.open(EditCupomModalComponent, {
      height: '350',
      width: '50%',
      data: this.selected[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success') {
        this.snackBar.open('Cupom editado!', 'Ok', {duration: 3000});
      }

      this.getCupons();
    });
  }

  openDelete() {
    const dialogRef = this.dialog.open(DeleteCupomModalComponent, {
      height: 'auto',
      width: 'auto',
      data: this.selected[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success') {
        this.snackBar.open('Cupom deletado!', 'Ok', {duration: 3000});
      }

      this.getCupons();
      this.selected = [];
    });
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

      /** Disable/enable ativar */
    if (this.selected.length > 0)
      this.disabledAtivar = false;

    if (this.selected.length == 0)
      this.disabledAtivar = true;

    /** Disable/enable ativar */
    if (this.selected.length > 0)
      this.disabledCancelar = false;

    if (this.selected.length == 0)
      this.disabledCancelar = true;
  }

  cancelarCupom() {
    var cupons_ids = [];

    this.selected.forEach(item => {
      cupons_ids.push(item["id"]);
    });

    var ids =  {
      "pedidos_ids":  cupons_ids
    };

    this._cupons.cancelar(cupons_ids[0]).subscribe(
      res => {
        this.getCupons();
        this.selected = [];

      },
      err => {
        console.log(err)
      }
    )
  }

  ativarCupom() {
    var cupons_ids = [];

    this.selected.forEach(item => {
      cupons_ids.push(item["id"]);
    });

    var ids =  {
      "pedidos_ids":  cupons_ids
    };

    this._cupons.ativar(cupons_ids[0]).subscribe(
      res => {
        this.getCupons();
        this.selected = [];

      },
      err => {
        console.log(err)
      }
    )
  }

  searchItems(str): void {
    if (str == undefined) {
      return
    }
    if (str.length == 0) {
      this.getCupons();
    }

    var matchedItems = []
    var regex = new RegExp(str.toLowerCase());
    //var len = search.length;

    this.cupons.forEach((item) => {

      if (regex.test(item.codigo.toLowerCase())) {
        matchedItems.push(item)
      }

      var id = item.id.toString();
      if (regex.test(id.toLowerCase())) {
        matchedItems.push(item)
      }

    })

    this.cupons = matchedItems;
  }

}
