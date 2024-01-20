import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-three',
  templateUrl: './header-three.component.html',
  styleUrls: ['./header-three.component.scss']
})
export class HeaderThreeComponent implements OnInit {

  @Input() class: string = 'header-2';
  @Input() themeLogo: string = 'assets/images/logos/log2.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false

  public stick: boolean = false;
  public search: boolean = false;
  searchInput: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number >= 150 && window.innerWidth > 400) {
      this.stick = true;
    } else {
      this.stick = false;
    }
  }

  searchToggle() {
    this.search = !this.search;
  }

  searchProd() {
    if(this.searchInput != ''){
      const rutaConQueryParam = '/shop';
      const queryParams = { search: this.searchInput };
  
      // Navega a la ruta con el parámetro de consulta
      this.router.navigate([rutaConQueryParam], { queryParams: queryParams });
      this.searchToggle();
    }
  }

}
