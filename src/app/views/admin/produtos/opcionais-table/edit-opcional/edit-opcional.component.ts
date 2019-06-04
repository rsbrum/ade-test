import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { OpcionaisService } from '@services/opcionais.service';

@Component({
  selector: 'app-edit-opcional',
  templateUrl: './edit-opcional.component.html',
  styleUrls: ['./edit-opcional.component.css']
})
export class EditOpcionalComponent implements OnInit {

  clicked: Boolean = false;
  status = [
    {value: 1, viewValue: "Disponivel"},
    {value: 0, viewValue: "Indisponivel"}
  ]

  constructor(
    public dialogRef: MatDialogRef<EditOpcionalComponent>,
    private _opcionais: OpcionaisService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  editOpcionalForm = new FormGroup({
    nome: new FormControl(this.data.nome),
    descricao: new FormControl(this.data.descricao),
    status: new FormControl(this.data.status),
    produto_id: new FormControl(this.data.produto_id),
    tipo: new FormControl(this.data.tipo),
    adicional: new FormControl(this.data.adicional)
  });

  ngOnInit() {
    if (document.documentElement.clientWidth < 1200) {
      this.dialogRef.updateSize("99%");
    }
    console.log(this.data);
  }

  editOpcional(){
    this.clicked = true;
    console.log(this.data.id);
    this._opcionais.editOpcional(this.editOpcionalForm.value, this.data.id).subscribe(
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
