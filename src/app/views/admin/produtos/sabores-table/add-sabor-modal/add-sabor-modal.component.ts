import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { SaboresService } from '@services/sabores.service';
import { TIPOS_PRODUTOS} from '@core/models/tipos';

@Component({
  selector: 'app-add-sabor-modal',
  templateUrl: './add-sabor-modal.component.html',
  styleUrls: ['./add-sabor-modal.component.css']
})
export class AddSaborModalComponent implements OnInit {

  clicked: Boolean;
  status = [
    { value: 1, viewValue: "Disponivel" },
    { value: 0, viewValue: "Indisponivel" }
  ]

  tipos = TIPOS_PRODUTOS;

  sabor_tipos = [
    'Doce', 'Salgado'
  ]

  saborForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    sabor_tipo: new FormControl('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<AddSaborModalComponent>,
    public _sabores: SaboresService
  ) { }

  ngOnInit() {
    if (document.documentElement.clientWidth < 1200) {
      this.dialogRef.updateSize("99%", "500px");
    }
  }

  addSabor() {
    this._sabores.addSabor(this.saborForm.value).subscribe(
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
