import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order } from '../../../shared/classes/order';
import { OrderService } from '../../../shared/services/order.service';
import { ProductService } from '../../../shared/services/product.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit{

  public orderDetails : Order = {};
  public payment_ID : string = '';

  constructor(
    public productService: ProductService,
    private orderService: OrderService, 
    private paymentService: PaymentService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {	
    this.orderService.checkoutItems.subscribe(response => this.orderDetails = response);

    this.route.params.subscribe(async (params) => {
      const result = await this.paymentService.retrieveSession(params['id'])
      this.payment_ID = result.payment_intent;      
    });
    
  }

  ngAfterViewInit() {
    
  }

  formatDate() {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);

    const [month, day, year] = formattedDate.split(' ');

    // Asegurarse de que la primera letra del mes esté en mayúscula
    const monthFirstLetterCapitalized = month.charAt(0).toUpperCase() + month.slice(1);

    return `${monthFirstLetterCapitalized} ${day} ${year}`;
}

}
