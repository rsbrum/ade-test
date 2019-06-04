import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Produto } from '@models/produto';
import { ProdutosService } from '../../../../../core/services/produtos.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-produto-modal',
  templateUrl: './add-produto-modal.component.html',
  styleUrls: ['./add-produto-modal.component.css']
})
export class AddProdutoModalComponent implements OnInit {

  produtosTipo = [
    "Pizza",
    "Pastel",
    "Bebida"
  ]

  clicked: Boolean = false;

  status = [
    { value: 1, viewValue: "Disponivel" },
    { value: 0, viewValue: "Indisponivel" }
  ]

  constructor(
    private _produtos: ProdutosService,
    public dialogRef: MatDialogRef<AddProdutoModalComponent>
  ) { }

  addProdutoForm = new FormGroup({
    codigo: new FormControl(''),
    nome: new FormControl(''),
    preco: new FormControl(''),
    status: new FormControl(''),
    tipo: new FormControl(''),
    descricao: new FormControl(''),
    sabores: new FormControl(''),
    opcional: new FormControl(''),
    quantidade_sabores: new FormControl(0)
  });

  ngOnInit() {
    if (document.documentElement.clientWidth < 1200) {
      this.dialogRef.updateSize("99%");
    }
  }

  addProduto() {
    this.clicked = true;

    this._produtos.addProduto(this.addProdutoForm.value).subscribe(
      res => {
        this.clicked = false;
        this.dialogRef.close('success');
      },
      err => {
        console.log(err);
        this.clicked = false;
      }
    )

  }

}

