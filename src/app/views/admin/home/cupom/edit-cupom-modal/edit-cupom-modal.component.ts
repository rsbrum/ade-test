import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CupomService } from '@services/cupom.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-cupom-modal',
  templateUrl: './edit-cupom-modal.component.html',
  styleUrls: ['./edit-cupom-modal.component.css']
})
export class EditCupomModalComponent implements OnInit {

  clicked: Boolean = false;
  status = [
    { value: 1, viewValue: "Disponivel" },
    { value: 0, viewValue: "Indisponivel" }
  ]

  constructor(
    public dialogRef: MatDialogRef<EditCupomModalComponent>,
    public _cupons: CupomService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  cupomForm = new FormGroup({
    codigo: new FormControl(this.data.codigo),
    status: new FormControl(this.data.status),
    porcentagem: new FormControl(this.data.porcentagem)
  });

  addCupon() {
    this._cupons.edit(this.data.id, this.cupomForm.value).subscribe(
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
