import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SaboresService } from '@services/sabores.service';
import { TIPOS_PRODUTOS} from '@core/models/tipos';

@Component({
  selector: 'app-edit-sabor',
  templateUrl: './edit-sabor.component.html',
  styleUrls: ['./edit-sabor.component.css']
})
export class EditSaborComponent implements OnInit {

  clicked: Boolean;
  status = [
    { value: 1, viewValue: "Disponivel" },
    { value: 0, viewValue: "Indisponivel" }
  ]
  tipos = TIPOS_PRODUTOS;

  constructor(
    public dialogRef: MatDialogRef<EditSaborComponent>,
    public _sabores: SaboresService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.saborForm.controls['tipo'].setValue(this.data.tipo, {onlySelf: true});
    if (document.documentElement.clientWidth < 1200) {
      this.dialogRef.updateSize("99%", "500px");
    }
  }

  saborForm = new FormGroup({
    nome: new FormControl(this.data.nome),
    descricao: new FormControl(this.data.descricao),
    status: new FormControl(this.data.status),
    tipo: new FormControl(this.data.tipo)
  })

  editSabor(){
    this.clicked = true;
    console.log(this.data.id);
    this._sabores.editSabor(this.saborForm.value, this.data.id).subscribe(
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
