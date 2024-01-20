import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from "../../../shared/services/product.service";
import { Product } from '../../../shared/classes/product';
import * as _ from 'lodash'

@Component({
  selector: 'app-collection-infinitescroll',
  templateUrl: './collection-infinitescroll.component.html',
  styleUrls: ['./collection-infinitescroll.component.scss']
})
export class CollectionInfinitescrollComponent implements OnInit {

  public grid: string = 'col-xl-3 col-md-4 col-6';
  public layoutView: string = 'grid-view';
  public all_products: any[] = [];
  public products: any[] = [];
  public brands: any[] = [];
  public colors: any[] = [];
  public size: any[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 1200;
  public tags: any[] = [];
  public collection: string;
  public search : string;
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  public mobileSidebar: boolean = false;
  public loader: boolean = true;
  public finished: boolean = false  // boolean when end of data is reached
  public addItemCount = 8;

  constructor(private route: ActivatedRoute, private router: Router,
    private viewScroller: ViewportScroller, public productService: ProductService) {
    // Get Query params..
    this.route.queryParams.subscribe(params => {
      this.products = [];
      this.finished = false;

      this.search = params.search ? params.search : null;
      this.brands = params.brand ? params.brand.split(",") : [];
      this.colors = params.color ? params.color.split(",") : [];
      this.size = params.size ? params.size.split(",") : [];
      this.minPrice = params.minPrice ? params.minPrice : this.minPrice;
      this.maxPrice = params.maxPrice ? params.maxPrice : this.maxPrice;
      this.tags = [...this.brands, ...this.colors, ...this.size]; // All Tags Array

      this.collection = params.collection ? params.collection : null;
      this.sortBy = params.sortBy ? params.sortBy : 'ascending';

      // Get Filtered Products..
      this.productService.filterProducts(this.tags).subscribe(response => {

        // All Products
        this.all_products = response;

        // Sorting Filter
        this.all_products = this.productService.sortProducts(response, this.sortBy);

        // Category Filter
        if (params.collection) {
          if (this.collection === 'All')
            this.all_products = this.all_products;
          else
            this.all_products = this.all_products.filter(item => item.collection == this.collection);
        }

        // Search Filter
        if (params.search) {
          const searchTerm = this.search.toLowerCase();
          
          // Filtrar por title
          let filteredProducts = this.all_products.filter(item => item.title.toLowerCase().includes(searchTerm));
      
          // Si no se encontraron coincidencias en title, buscar en code
          if (filteredProducts.length === 0) {
              filteredProducts = this.all_products.filter(item => item.code.toLowerCase().includes(searchTerm));
          }
      
          this.all_products = filteredProducts;
      }

        // Price Filter
        this.all_products = this.all_products.filter(item => item.price >= this.minPrice && item.price <= this.maxPrice)

        this.addItems();

      })
    })
  }

  ngOnInit(): void {

  }

  addItems() {
    if (this.all_products.length == this.products.length) {
      this.finished = true;
      return
    }
    this.products = this.all_products.slice(0, this.addItemCount);
  }

  // Infinite scroll
  public onScroll() {
    // add another items
    this.addItemCount += 8;
    this.addItems();
  }

  // Append filter value to Url
  updateFilter(tags: any) {
    tags.page = null; // Reset Pagination
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: tags,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // SortBy Filter
  sortByFilter(value) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Remove Tag
  removeTag(tag) {

    this.brands = this.brands.filter(val => val !== tag);
    this.colors = this.colors.filter(val => val !== tag);
    this.size = this.size.filter(val => val !== tag);

    let params = {
      brand: this.brands.length ? this.brands.join(",") : null,
      color: this.colors.length ? this.colors.join(",") : null,
      size: this.size.length ? this.size.join(",") : null
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Clear Tags
  removeAllTags() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }



  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if (value == 'list-view')
      this.grid = 'col-lg-12';
    else
      this.grid = 'col-xl-3 col-md-6';
  }

  // Mobile sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

}
