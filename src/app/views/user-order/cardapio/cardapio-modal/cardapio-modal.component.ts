import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SaboresService } from '@services/sabores.service';

@Component({
  selector: 'app-cardapio-modal',
  templateUrl: './cardapio-modal.component.html',
  styleUrls: ['./cardapio-modal.component.css']
})
export class CardapioModalComponent implements OnInit {

  panelOpenState = false;
  pasteis = {
    'doces' : [],
    'salgados' : []
  }

  pizzas = {
    'doces' : [],
    'salgados' : []
  }

  constructor(
    private dialog: MatDialogRef<CardapioModalComponent>,
    private _sabores: SaboresService) {}

  ngOnInit() {
    if (document.documentElement.clientWidth < 1200) {

      this.dialog.updateSize("90%", "auto");
    }

    this.getSabores();
  }

  getSabores() {
    this._sabores.getSabores().subscribe(res => {
      this.filterSabores(res['sabores']);

    }, err => {
      console.log(err);
    });
  }

  filterSabores(sabores) {
    sabores.forEach( sabor => {
      if (sabor['tipo'] == 'Pastel') {
        if(sabor['sabor_tipo'] == 'Doce') {
          this.pasteis['doces'].push(sabor);
        }

        if(sabor['sabor_tipo'] == 'Salgado') {
          this.pasteis['salgados'].push(sabor);
        }
      }

      if(sabor['tipo'] == 'Pizza') {
        if(sabor['sabor_tipo'] == 'Doce') {
          this.pizzas['doces'].push(sabor);
        }

        if(sabor['sabor_tipo'] == 'Salgado') {
          this.pizzas['salgados'].push(sabor);
        }
      }
    });

  }

}
