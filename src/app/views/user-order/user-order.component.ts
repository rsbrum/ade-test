import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.addEventListener("scroll", function () {
      var header = document.getElementById('header');

      if (window.pageYOffset > 70) {
        header.classList.add('header-scrolled');
        header.classList.remove('header-top')
      }
      else {
        header.classList.remove('header-scrolled');
        header.classList.add('header-top');
      }

    });
  }

}
