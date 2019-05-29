import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { OpcionaisService } from '@services/opcionais.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-opcional',
  templateUrl: './add-opcional.component.html',
  styleUrls: ['./add-opcional.component.css']
})
export class AddOpcionalModalComponent implements OnInit {

  clicked: Boolean = false;
  status = [
    { value: 1, viewValue: "Disponivel" },
    { value: 0, viewValue: "Indisponivel" }
  ]

  opcionalForm = new FormGroup({
    nome: new FormControl(''),
    descricao: new FormControl(''),
    status: new FormControl(''),
    produto_id: new FormControl(''),
    tipo: new FormControl(''),
    adicional: new FormControl('')
  })
  constructor(
    public dialogRef: MatDialogRef<AddOpcionalModalComponent>,
    public _opcionais: OpcionaisService
  ) { }

  ngOnInit() {
  }

  addOpcional() {
    this.clicked = true;

    this._opcionais.addOpcional(this.opcionalForm.value).subscribe(
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
