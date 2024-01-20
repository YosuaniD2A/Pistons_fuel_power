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
export class FashionTwoComponent implements OnInit {

  container: ElementRef;
  isLoading: boolean = false;
  miniMasonry: MiniMasonry;
  gutter: number = 20;
  baseWidth: number = 155;

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

  constructor(private route: ActivatedRoute, private galleryService: GalleryService, private router: Router, private el: ElementRef) {
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
    this.initMasonry(); 
  }

  initMasonry(){
    this.container = this.el.nativeElement.querySelector('.container_img');
    this.miniMasonry = new MiniMasonry({
      container: this.container,
      gutter: this.gutter,
      baseWidth: this.baseWidth
    });
  }

  handleOnLoadImage(){
    this.miniMasonry.layout();
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateBaseWidth(); // Actualizar baseWidth en tiempo real al cambiar el tamaño de la ventana
    this.initMasonry();
  }

  private updateBaseWidth(): void {
    // Define lógica para determinar baseWidth según el tamaño de la pantalla
    // Por ejemplo, si el ancho de la ventana es menor que cierto umbral, establece baseWidth en 100; de lo contrario, en 155
    this.baseWidth = window.innerWidth <= 410 ? 100 : 155;
    this.gutter = window.innerWidth <= 410 ? 10 : 20;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
  }

  isScrollNearBottom() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    return scrollHeight - scrollTop <= clientHeight + 100;
  };

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

  }
}
