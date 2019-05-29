import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { SaboresService } from '@services/sabores.service';

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

  tipos =[
    'Pizza',
    'Pastel',
    'Vinho',
    'Espumante'
  ]

  saborForm = new FormGroup({
    nome: new FormControl(''),
    descricao: new FormControl(''),
    status: new FormControl(''),
    tipo: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<AddSaborModalComponent>,
    public _sabores: SaboresService
  ) { }

  ngOnInit() {
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
