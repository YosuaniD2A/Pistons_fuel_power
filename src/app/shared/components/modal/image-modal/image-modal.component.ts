import { Component, Input, Output, EventEmitter, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent {

  @Input() show: boolean;
  @Input() image: any;
  @Output() closeModal = new EventEmitter();

  rotationDegrees: number = 0;
  zoomFactor: number = 0.5;

  isPanning: boolean = false;
  startX: number = 0;
  startY: number = 0;
  translateX: number = 0;
  translateY: number = 0;

  @ViewChild('imageContainer') imageContainer: ElementRef;

  constructor(private router: Router) { }

  goShop(){
    const products = JSON.parse(localStorage.getItem('products'));
    const productLinked = products.find(prod => prod.id == this.image.products_id);

    if (productLinked) {      
      // Navegar a la nueva ruta con el título del producto
      this.router.navigate(['/shop/product', productLinked.code]);
    }

  }

  storeProduct(product: any){
    localStorage['productDetail'] = JSON.stringify(product);
  }

  rotateRight() {
    this.rotationDegrees += 90;
  }

  rotateLeft() {
    this.rotationDegrees -= 90;
  }

  zoomIn() {
    this.zoomFactor += 0.1;
  }

  zoomOut() {
    this.zoomFactor -= 0.1;
    if (this.zoomFactor < 0.1) {
      this.zoomFactor = 0.1;
    }
  }

  activePanning() {
    this.isPanning = !this.isPanning;
  }

  startPanning(event: MouseEvent | TouchEvent) {
    this.isPanning = true;
      const { clientX, clientY } = this.getEventCoordinates(event);
      this.startX = clientX;
      this.startY = clientY;
  
    console.log(this.startX, this.startY);

  }

  onPanning(event: MouseEvent | TouchEvent) {
    if (this.isPanning) {
      const { clientX, clientY } = this.getEventCoordinates(event);
      this.translateX += clientX - this.startX;
      this.translateY += clientY - this.startY;
      this.startX = clientX;
      this.startY = clientY;
    }

    console.log(this.translateX, this.translateY);
  }

  stopPanning() {
    this.isPanning = false;
  }

  private getEventCoordinates(event: MouseEvent | TouchEvent) {
    return event instanceof TouchEvent ? event.touches[0] : event;
  }

  restartImage() {
    this.rotationDegrees = 0;
    this.zoomFactor = 0.5;
    this.translateX = 0;
    this.translateY = 0;
  }

  onCloseModal() {
    this.closeModal.emit();
    this.rotationDegrees = 0;
    this.zoomFactor = 0.5;
  }
}
