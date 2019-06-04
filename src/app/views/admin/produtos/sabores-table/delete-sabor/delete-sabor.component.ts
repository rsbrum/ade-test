import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SaboresService } from '@services/sabores.service';


@Component({
  selector: 'app-delete-sabor',
  templateUrl: './delete-sabor.component.html',
  styleUrls: ['./delete-sabor.component.css']
})
export class DeleteSaborComponent implements OnInit {

  clicked: Boolean;

  constructor(
    public dialogRef: MatDialogRef<DeleteSaborComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public _opcionais: SaboresService
  ) { }

  ngOnInit() {
    if (document.documentElement.clientWidth < 1200) {
      this.dialogRef.updateSize("99%");
    }
  }

  deleteSabor() {
    this.clicked = true;

    this._opcionais.deleteSabor(this.data.id).subscribe(
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
