import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Produto } from '@models/produto';
import { ProdutosService } from '../../../../../core/services/produtos.service';
import { MatDialogRef } from '@angular/material';
import { TIPOS_PRODUTOS} from '@core/models/tipos';

@Component({
  selector: 'app-add-produto-modal',
  templateUrl: './add-produto-modal.component.html',
  styleUrls: ['./add-produto-modal.component.css']
})
export class AddProdutoModalComponent implements OnInit {

  produtosTipo = TIPOS_PRODUTOS;
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
    codigo: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    preco: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    sabores: new FormControl('', Validators.required),
    opcional: new FormControl('', Validators.required),
    quantidade_sabores: new FormControl(0, Validators.required)
  });

  ngOnInit() {
    console.log(this.produtosTipo)
    if (document.documentElement.clientWidth < 1200) {
      this.dialogRef.updateSize("99%", "500px");
    }
  }

  addProduto() {
    this.clicked = true;
    console.log(this.addProdutoForm.status);
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

