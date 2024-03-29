import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';
import { Product } from '../../../../shared/classes/product';
import { ProductService } from '../../../../shared/services/product.service';
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { CartModalComponent } from 'src/app/shared/components/modal/cart-modal/cart-modal.component';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {

  @Input() currency: any = this.productService.Currency;
  @Input() cartModal: boolean = true; // Default False

  public products: Product[];
  public product: Product = {};
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  public selectedColor: string;
  public mobileSidebar: boolean = false;
  public active = 1;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(private route: ActivatedRoute, private router: Router,
    public productService: ProductService) {

      this.products = JSON.parse(localStorage.getItem('products'));
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(response => {
  
      const prod = this.products.find(p => {
        return p.code == response.get('slug').toString().split('-').pop();
    } );

      this.product = prod;

      if(this.Color(this.product.variants).length === 1){
        this.selectedColor = this.Color(this.product.variants)[0];
      } 
    });
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }

  // Get Product Size
  Size(variants) {
    const uniqSize = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size)
      }
    }
    return uniqSize
  }

  selectSize(size) {
    this.selectedSize = size;
  }

  selectColor(color) {
    this.selectedColor = color;
  }

  // Increament
  increment() {
    this.counter++;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter--;
  }

  // Add to cart
  async addToCart(product: any) {
    product.quantity = this.counter || 1;
    product.color = this.selectedColor;
    product.size = this.selectedSize;
    product.sku = product.variants.filter(item => {
      return item.color === product.color && item.size === product.size;
    })[0]?.sku;
    const status = await this.productService.addToCart(product);
    if (status)
      // this.router.navigate(['/shop/cart']);
      this.CartModal.openModal(product);
  }

  // Buy Now
  async buyNow(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if (status)
      this.router.navigate(['/shop/checkout']);
  }

  // Add to Wishlist
  // addToWishlist(product: any) {
  //   this.productService.addToWishlist(product);
  // }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

}
