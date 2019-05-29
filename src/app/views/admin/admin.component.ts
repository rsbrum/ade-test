import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public mode = 'side'

  constructor() {
  }

  ngOnInit() {
    this.onResize(1);
  }

  onResize(ev) {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 959) {
      this.mode = 'side';
    } else {
      this.mode = 'over';
    }
  }

}
