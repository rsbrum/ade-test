import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Produto } from '../../../../../core/models/produto';
import { ProdutosService } from '../../../../../core/services/produtos.service';
import { TIPOS_PRODUTOS} from '@core/models/tipos';

@Component({
  selector: 'app-edit-produto-modal',
  templateUrl: './edit-produto-modal.component.html',
  styleUrls: ['./edit-produto-modal.component.css']
})
export class EditProdutoModalComponent implements OnInit {

  produtosTipo = TIPOS_PRODUTOS;

  clicked: Boolean = false;

  status = [
    {value: 1, viewValue: "Disponivel"},
    {value: 0, viewValue: "Indisponivel"}
  ]

  constructor(
    public dialogRef: MatDialogRef<EditProdutoModalComponent>,
    private _produtos: ProdutosService,
    @Inject(MAT_DIALOG_DATA) public data: Produto) { }

    editProdutoForm = new FormGroup({
      codigo: new FormControl(this.data.codigo),
      nome: new FormControl(this.data.nome),
      preco: new FormControl(this.data.preco),
      status: new FormControl(this.data.status),
      tipo: new FormControl(this.data.tipo),
      descricao: new FormControl(this.data.descricao)
    });

  ngOnInit() {
    if (document.documentElement.clientWidth < 1200) {
      this.dialogRef.updateSize("99%", "500px");
    }
  }

  editProduto(){
    this.clicked = true;

    this._produtos.editProduto(this.editProdutoForm.value, this.data.id).subscribe(
      res => {
        this.clicked = false;
        this.dialogRef.close('success');
      },
      err => {
        console.log(err)
        this.clicked = false;
      }
    )
  }

}
