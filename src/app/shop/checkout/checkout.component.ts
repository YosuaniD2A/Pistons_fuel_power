import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
// import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Router } from '@angular/router';
import { InfluencersService } from 'src/app/shared/services/influencers.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm:  UntypedFormGroup;
  public products: Product[] = [];
  // public payPalConfig ? : IPayPalConfig;
  public payment: string = 'Stripe';
  public amount:  any;
  public discount: number = 0;

  constructor(private fb: UntypedFormBuilder,
    public productService: ProductService,
    private orderService: OrderService,
    private influencersService: InfluencersService,
    private paymentService: PaymentService,
    private router: Router) { 
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      town: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.productService.cartItems.subscribe(response => this.products = response);
    this.getSubTotal.subscribe(amount => this.amount = amount);
    this.initConfig();    
  }

  public get getSubTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  public getTotal() {
    return this.amount + this.discount;
  }

  // async applyDiscount(){
  //   try {
  //     if(this.checkoutForm.value.promotionalcode !== ''){
  //       const exist = await this.influencersService.getCodeDescount(this.checkoutForm.value.promotionalcode);
        
  //       if(exist.discount.length !== 0){
  //         this.getSubTotal.subscribe( total => {
  //           this.discount =  -((total * exist.discount[0].discount_percent)/100)
  //         })
  //       }
  //     }    
      
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }

  // Stripe Payment Gateway
  async stripeCheckout() {
    this.orderService.createOrder(this.products, this.checkoutForm.value, this.orderIDGenerator(), this.amount);

    const response = await this.paymentService.checkoutStripe({
      products: this.products, 
      amount: this.amount, 
      shippingDetails: this.checkoutForm.value,
    });
    window.location.href = response.url;
    
  }

  // Paypal Payment Gateway
  private initConfig(): void {
    // this.payPalConfig = {
    //     currency: this.productService.Currency.currency,
    //     clientId: environment.paypal_token,
    //     createOrderOnClient: (data) => < ICreateOrderRequest > {
    //       intent: 'CAPTURE',
    //       purchase_units: [{
    //           amount: {
    //             currency_code: this.productService.Currency.currency,
    //             value: this.amount,
    //             breakdown: {
    //                 item_total: {
    //                     currency_code: this.productService.Currency.currency,
    //                     value: this.amount
    //                 }
    //             }
    //           }
    //       }]
    //   },
    //     advanced: {
    //         commit: 'true'
    //     },
    //     style: {
    //         label: 'paypal',
    //         size:  'small', // small | medium | large | responsive
    //         shape: 'rect', // pill | rect
    //     },
    //     onApprove: (data, actions) => {
    //         this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal);
    //         console.log('onApprove - transaction was approved, but not authorized', data, actions);
    //         actions.order.get().then(details => {
    //             console.log('onApprove - you can get full order details inside onApprove: ', details);
    //         });
    //     },
    //     onClientAuthorization: (data) => {
    //         console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    //     },
    //     onCancel: (data, actions) => {
    //         console.log('OnCancel', data, actions);
    //     },
    //     onError: err => {
    //         console.log('OnError', err);
    //     },
    //     onClick: (data, actions) => {
    //         console.log('onClick', data, actions);
    //     }
    // };
  }

  orderIDGenerator() {
    const prefijo = 'PF-';
    const fecha = new Date();
  
    // Obtenemos los componentes de la fecha
    const year = fecha.getFullYear().toString().slice(-2);
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const day = ('0' + fecha.getDate()).slice(-2);
    const hours = ('0' + fecha.getHours()).slice(-2);
    const minutes = ('0' + fecha.getMinutes()).slice(-2);
    const seconds = ('0' + fecha.getSeconds()).slice(-2);
    const milliseconds = ('00' + fecha.getMilliseconds()).slice(-3);
  
    // Construimos el código
    const codigo = `${prefijo}${year}${month}${day}-${hours}${minutes}${seconds}${milliseconds}`;
  
    return codigo;
  }

}
