import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Image } from '@ks89/angular-modal-gallery';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from 'src/app/shared/services/gallery.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ImageModalComponent } from 'src/app/shared/components/modal/image-modal/image-modal.component';

@Component({
  selector: 'app-masonry-grid-three',
  templateUrl: './masonry-grid-three.component.html',
  styleUrls: ['./masonry-grid-three.component.scss']
})
export class MasonryGridThreeComponent implements OnInit, AfterViewInit {


  public galleryFilter: string;
  public collection: string;
  public Images;
  public AllImage: any[] = [];
  public MuscleImage: any[] = [];
  public MotorsImages: any[] = [];
  public ClassicImages: any[] = [];
  public BadgesImages: any[] = [];

  mostrarImagenDeCarga = true;
  imagenCargada = false;

  showModal: boolean = false;
  selectedImage: any;

  constructor(private route: ActivatedRoute, private galleryService: GalleryService, private router: Router) {
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

        console.log(this.Images);

        this.filter(this.collection);

        console.log(this.Images);
      });
    });

  }

  ngOnInit(): void {
    this.showModal = false;
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
