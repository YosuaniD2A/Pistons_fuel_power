import { Component, OnInit } from '@angular/core';
import { ProductSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-fashion-one',
  templateUrl: './fashion-one.component.html',
  styleUrls: ['./fashion-one.component.scss']
})
export class FashionOneComponent implements OnInit {

  public themeLogo: string = 'assets/images/icon/logo-13.png';
  
  public products: Product[] = [];
  public productCollections: any[] = [];
  public active;

  constructor(public productService: ProductService) {
    this.productService.getProducts.subscribe(response => {
      this.products = response.filter(item => item.type == 'fashion');
      // Get Product Collection
      this.products.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    });
  }

  public ProductSliderConfig: any = ProductSlider;

  public sliders = [{
    title: 'welcome to Pistons Fuel Power',
    subTitle: 'Rev Up Your Passion for Muscle Cars and Motorcycles!',
    color: 'text-light',
    image: 'assets/images/slider/moto1.jpg'
  }, 
  // {
  //   title: '',
  //   subTitle: '',
  //   color: 'text-dark',
  //   image: 'assets/images/slider/car1.jpg'
  // }
  ]

  // Collection banner
  public collections = [{
    image: 'assets/images/collection/Motorcycles.jpeg',
    save: 'save 50%',
    color: 'text-light',
    title: 'Motorcycles'
  }, {
    image: 'assets/images/collection/Muscle_cars3.jpg',
    save: 'save 50%',
    color: 'text-light',
    title: 'Muscle Cars'
  },{
    image: 'assets/images/collection/Classic_cars.jpeg',
    save: 'save 50%',
    color: 'text-light',
    title: 'Classics'
  }, {
    image: 'assets/images/collection/motor_cars/badge1.jpg',
    save: 'save 50%',
    color: 'text-light',
    title: 'Badges'
  }];

  // Blog
  public blog = [{
    image: 'assets/images/blog/1.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/2.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/3.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/4.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }];

  // Logo
  public logo = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',
  }];

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
