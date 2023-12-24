import { Component, OnInit } from '@angular/core';
import { ProductSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { Collection } from 'src/app/shared/classes/collection';

@Component({
  selector: 'app-fashion-one',
  templateUrl: './fashion-one.component.html',
  styleUrls: ['./fashion-one.component.scss']
})
export class FashionOneComponent implements OnInit {

  public themeLogo: string = 'assets/images/icon/logo-13.png';
  
  public collections: Collection[] = [];

  public products: Product[] = [];
  public productCollections: any[] = [];
  public active;

  constructor(public productService: ProductService, public collectionService: CollectionService) {
    this.productService.getProducts.subscribe(response => {
      this.products = response.filter(item => item.type == 'T-shirt');
      // Get Product Collection    
      this.products.filter((item) => {
        item.collection.filter((collection) => {          
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    });

    this.collectionService.getCollections.subscribe(response => {
      this.collections = response;
      console.log(this.collections);
    })

  }

  public ProductSliderConfig: any = ProductSlider;

  ngOnInit(): void {
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }

}
