import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Produto } from '../../../../../core/models/produto';
import { ProdutosService } from '../../../../../core/services/produtos.service';

@Component({
  selector: 'app-delete-produto-modal',
  templateUrl: './delete-produto-modal.component.html',
  styleUrls: ['./delete-produto-modal.component.css']
})
export class DeleteProdutoModalComponent implements OnInit {

  clicked = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteProdutoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produto,
    private _produtos: ProdutosService,
  ) { }

  ngOnInit() {
    if (document.documentElement.clientWidth < 1200) {
      this.dialogRef.updateSize("99%");
    }
  }

  deleteProduto() {
    this.clicked = true;

    this._produtos.deleteProduto(this.data.id).subscribe(
      res => {
        this.dialogRef.close('success');
        this.clicked = false;
      },
      err => {
        console.log(err);
        this.clicked = false;
      }
    )
  }

}
