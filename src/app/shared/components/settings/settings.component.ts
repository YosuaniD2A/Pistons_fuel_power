import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../classes/product";
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public products: Product[] = [];
  public search: boolean = false;
  public track: boolean = false;
  selectedOption: string = 'default';
  placeholderText: string = 'Search...';

  public languages = [{
    name: 'English',
    code: 'en'
  }, {
    name: 'French',
    code: 'fr'
  }];

  public currencies = [{
    name: 'Euro',
    currency: 'EUR',
    price: 0.90 // price of euro
  }, {
    name: 'Rupees',
    currency: 'INR',
    price: 70.93 // price of inr
  }, {
    name: 'Pound',
    currency: 'GBP',
    price: 0.78 // price of euro
  }, {
    name: 'Dollar',
    currency: 'USD',
    price: 1 // price of usd
  }]

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public productService: ProductService, private router: Router) {
    this.productService.cartItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
    
  }

  searchToggle() {
    this.search = !this.search;
  }

  // trackToggle() {
  //   this.track = !this.track;
  // }

  updatePlaceholderText() {
    if (this.selectedOption === 'products') {
      this.placeholderText = 'Search Product';
    } else if (this.selectedOption === 'tracking') {
      this.placeholderText = 'Track your order, enter your order ID';
    } else {
      this.placeholderText = 'Search...';
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (this.selectedOption === 'products') {
      if (event.key === 'Enter') {
        const inputValue = (event.target as HTMLInputElement).value;
        console.log(inputValue);
        // Construye la URL con el parámetro de consulta
        const rutaConQueryParam = '/shop';
        const queryParams = { search: inputValue };

        // Navega a la ruta con el parámetro de consulta
        this.router.navigate([rutaConQueryParam], { queryParams: queryParams });
        this.searchToggle();
      }
    } else {
      if (event.key === 'Enter') {
        const inputValue = (event.target as HTMLInputElement).value;
        console.log(inputValue);
        // Construye la URL con el parámetro de consulta
        const rutaConQueryParam = '/page/tracking';
        const queryParams = { search: inputValue };

        // Navega a la ruta con el parámetro de consulta
        this.router.navigate([rutaConQueryParam], { queryParams: queryParams });
        this.searchToggle();
      }
    }
  }

  changeLanguage(code) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
    }
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency
  }

}
