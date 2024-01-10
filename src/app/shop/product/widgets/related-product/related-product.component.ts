import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../shared/classes/product';
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss']
})
export class RelatedProductComponent implements OnInit {
  
  @Input() collection: string

  public products: Product[] = [];

  constructor(public productService: ProductService) { 
    this.productService.getProducts.subscribe(response => 
      this.products = response.filter(item => item.collection[0] == this.collection)
    );
  }

  ngOnInit(): void {
  }

}
