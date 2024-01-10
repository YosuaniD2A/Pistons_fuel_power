import { Component, OnInit, Input } from '@angular/core';
import { NewProductSlider } from '../../../data/slider';
import { Product } from '../../../classes/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-box-vertical-slider',
  templateUrl: './product-box-vertical-slider.component.html',
  styleUrls: ['./product-box-vertical-slider.component.scss']
})
export class ProductBoxVerticalSliderComponent implements OnInit {

  @Input() title: string = 'New Product'; // Default
  @Input() type: string = 'T-shirt'; // Default Fashion

  public products : Product[] = [];

  public NewProductSliderConfig: any = NewProductSlider;

  constructor(public productService: ProductService) { 
    this.productService.getProducts.subscribe(response => 
      this.products = response.filter(item => item.type == this.type)
    );
  }

  ngOnInit(): void {
  }

  getProductRoute(product: any): string {
    const cleanedTitle = product.title.replace(/ /g, '-').trim();
    const code = product.code || ''; // Asegurándonos de que code tenga un valor
    const cleanedCode = code.replace(/ /g, '');
    return `/shop/product/${cleanedTitle}-${cleanedCode}`;
  }

}
