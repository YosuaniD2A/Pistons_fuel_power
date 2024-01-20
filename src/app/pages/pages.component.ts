import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  public url : any; 
  activeHeader2: boolean = false;

  constructor(private router: Router) {  
    this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            this.url = event.url;
          }
    });
  }

  ngOnInit(): void {
    this.activeHeader2 = window.innerWidth <= 577 ? true : false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.activeHeader2 = window.innerWidth <= 577 ? true : false;
  }

}
