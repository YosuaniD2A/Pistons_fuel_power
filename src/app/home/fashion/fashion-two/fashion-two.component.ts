import { Component, OnInit, AfterViewInit, HostListener, Renderer2, ElementRef } from '@angular/core';
import { Image } from '@ks89/angular-modal-gallery';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from 'src/app/shared/services/gallery.service';
import MiniMasonry from "minimasonry";

@Component({
  selector: 'app-fashion-two',
  templateUrl: './fashion-two.component.html',
  styleUrls: ['./fashion-two.component.scss']
})
export class FashionTwoComponent implements OnInit, AfterViewInit {
  container: ElementRef;
  isLoading: boolean = false;
  miniMasonry: MiniMasonry;

  public galleryFilter: string;
  public collection: string;
  public Images: any[] = [];
  public AllImage: any[] = [];
  public MuscleImage: any[] = [];
  public MotorsImages: any[] = [];
  public ClassicImages: any[] = [];
  public BadgesImages: any[] = [];

  showOverlay: boolean[] = new Array(this.Images.length).fill(false);

  mostrarImagenDeCarga = true;
  imagenCargada = false;

  showModal: boolean = false;
  selectedImage: any;

  constructor(private route: ActivatedRoute, private galleryService: GalleryService, private router: Router,
    private renderer: Renderer2, private el: ElementRef) {
    this.route.queryParams.subscribe(params => {
      this.collection = params.collection ? params.collection : 'all';

      if (this.collection === "Muscle cars")
        this.collection = "Muscle_cars";

      this.galleryService.getGallery.subscribe(response => {
        this.AllImage = response;
        this.MuscleImage = response.filter(item => item.collection == 'Muscle cars');
        this.MotorsImages = response.filter(item => item.collection == 'Motorcycles');
        this.ClassicImages = response.filter(item => item.collection == 'Classics');
        this.BadgesImages = response.filter(item => item.collection == 'Badges');

        this.filter(this.collection);
      });
    });

  }

  ngOnInit(): void {
    this.showModal = false;

    this.container = this.el.nativeElement.querySelector('.container_img');
    this.miniMasonry = new MiniMasonry({
      container: this.container,
    });

    // this.renderer.selectRootElement(this.container)
    //   .querySelectorAll('img')
    //   .forEach((img: HTMLImageElement) => {
    //     this.renderer.listen(img, 'load', () => this.handleOnLoadImage());
    //   });

  }

  ngAfterViewInit(): void {
    setTimeout(function () {
      // vanilla JS
      var grid = document.querySelector('.isotopeContainer');
      new (<any>window).Isotope(grid, {
        // options...
        itemSelector: '.isotopeSelector'
      });
    }, 1000);

    
  }

  handleOnLoadImage(){
    this.miniMasonry.layout();
  };

  // getRandomValueInRange(min, max) {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };

  // addNewImages() {
  //   for (let i = 0; i < 20; i++) {
  //     const div = this.renderer.createElement('div');
  //     const img = this.renderer.createElement('img');
  //     this.renderer.setAttribute(img, 'src', `https://picsum.photos/${this.getRandomValueInRange(200, 500)}/${this.getRandomValueInRange(200, 500)}`);
  //     this.renderer.listen(img, 'load', () => this.handleOnLoadImage());
  //     this.renderer.appendChild(div, img);
  //     this.renderer.appendChild(this.container.nativeElement, div);
  //   }
  //   window.setTimeout(() => {
  //     this.isLoading = false;
  //   }, 1000);
  // };

  isScrollNearBottom() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    return scrollHeight - scrollTop <= clientHeight + 100;
  };

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
  }

  private checkScroll(): void {
    if (this.isScrollNearBottom() && !this.isLoading) {
      console.log("Esta en el fondo");
      this.isLoading = true;
      // this.addNewImages();
    }
  }

  switchOverlay(index: number, state: boolean): void {
    this.showOverlay[index] = state;
  }

  goShop(image: any) {
    const products = JSON.parse(localStorage.getItem('products'));
    const productLinked = products.find(prod => prod.id == image.products_id);

    if (productLinked) {
      const cleanedTitle = productLinked.title.replace(/ /g, '-').trim();
      const code = productLinked.code || '';
      const cleanedCode = code.replace(/ /g, '');
      this.router.navigate([`/shop/product/${cleanedTitle}-${cleanedCode}`]);
    }
  }


  openModal(image: any) {
    this.selectedImage = image;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  cargarImagenPorDefecto(image: any) {
    image.modal.img = 'assets/images/portfolio/1.jpg';
    this.mostrarImagenDeCarga = false;
  }

  imageCloaded() {
    this.imagenCargada = true;
    this.mostrarImagenDeCarga = false;
  }

  openImage(image) {
    const index: number = this.getCurrentIndexCustomLayout(image, this.Images);
    // this.GalleryConfig = Object.assign({}, this.GalleryConfig, { 
    //     layout: new AdvancedLayout(index, true) 
    // });
  }

  getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
    return image ? images.indexOf(image) : -1;
  };

  filter(term) {

    if (term == 'all') {
      this.Images = this.AllImage
    } else if (term == 'Muscle_cars') {
      this.Images = this.MuscleImage
    } else if (term == 'Motorcycles') {
      this.Images = this.MotorsImages
    } else if (term == 'Classics') {
      this.Images = this.ClassicImages
    } else if (term == 'Badges') {
      this.Images = this.BadgesImages
    }

    this.galleryFilter = term

    // For isotop layout
    setTimeout(function () {
      // vanilla JS
      var grid = document.querySelector('.isotopeContainer');
      new (<any>window).Isotope(grid, { filter: '.' + term });
    }, 500);

  }
}
