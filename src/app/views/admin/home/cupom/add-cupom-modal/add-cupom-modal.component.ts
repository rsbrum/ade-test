import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CupomService } from '@services/cupom.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-cupom-modal',
  templateUrl: './add-cupom-modal.component.html',
  styleUrls: ['./add-cupom-modal.component.css']
})
export class AddCupomModalComponent implements OnInit {

  clicked: Boolean = false;
  status = [
    { value: 1, viewValue: "Disponivel" },
    { value: 0, viewValue: "Indisponivel" }
  ]

  constructor(
    public dialogRef: MatDialogRef<AddCupomModalComponent>,
    public _cupons: CupomService
  ) { }

  cupomForm = new FormGroup({
    codigo: new FormControl(''),
    status: new FormControl(''),
    porcentagem: new FormControl('')
  });

  ngOnInit() {
    if (document.documentElement.clientWidth < 1200) {
      this.dialogRef.updateSize("99%", "350px");
    }
  }

  addCupon() {
    this._cupons.add(this.cupomForm.value).subscribe(
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
