import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CupomService } from '@services/cupom.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-delete-cupom-modal',
  templateUrl: './delete-cupom-modal.component.html',
  styleUrls: ['./delete-cupom-modal.component.css']
})
export class DeleteCupomModalComponent implements OnInit {

  clicked = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteCupomModalComponent>,
    public _cupons: CupomService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    if (document.documentElement.clientWidth < 1200) {
      this.dialogRef.updateSize("99%");
    }
  }

  deleteCupom() {
    this._cupons.delete(this.data.id).subscribe(
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
