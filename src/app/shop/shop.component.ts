import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  activeHeader2: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.activeHeader2 = window.innerWidth <= 577 ? true : false;
  }

  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.activeHeader2 = window.innerWidth <= 577 ? true : false;
  }
}
