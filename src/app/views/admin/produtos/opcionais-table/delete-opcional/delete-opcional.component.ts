import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { OpcionaisService } from '@services/opcionais.service';

@Component({
  selector: 'app-delete-opcional',
  templateUrl: './delete-opcional.component.html',
  styleUrls: ['./delete-opcional.component.css']
})
export class DeleteOpcionalComponent implements OnInit {

  clicked = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteOpcionalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public _opcionais: OpcionaisService
  ) { }

  ngOnInit() {
    if (document.documentElement.clientWidth < 1200) {
      this.dialogRef.updateSize("99%");
    }
  }

  deleteOpcional() {
    this.clicked = true;

    this._opcionais.deleteOpcional(this.data.id).subscribe(
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
