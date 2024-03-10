import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order } from '../../../shared/classes/order';
import { OrderService } from '../../../shared/services/order.service';
import { ProductService } from '../../../shared/services/product.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Item, ShipOrder } from 'src/app/shared/classes/shipOrder';
import { ShipstationService } from 'src/app/shared/services/shipstation.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit {

  public orderDetails: Order = {};
  public payment_ID: string = '';
  public order_id: string = '';

  public subTotal: number = 0;
  public discount: number = 0;
  public shipping: number = 0;
  public tax: number = 0;
  public total: number = 0;

  constructor(
    public productService: ProductService,
    private orderService: OrderService,
    private shipstationService: ShipstationService,
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.orderService.checkoutItems.subscribe(response => this.orderDetails = response);
    //localStorage.removeItem("cartItems");
    this.cleanCart();

    this.route.params.subscribe(async (params) => {
      const stripeRetrieve = await this.paymentService.retrieveSession(params['id']);
      
      this.payment_ID = stripeRetrieve.retrieve.payment_intent;
      this.subTotal = stripeRetrieve.retrieve.amount_subtotal / 100;
      this.discount = - stripeRetrieve.retrieve.total_details.amount_discount / 100;
      this.shipping = stripeRetrieve.retrieve.total_details.amount_shipping / 100;
      this.tax = stripeRetrieve.retrieve.total_details.amount_tax / 100;
      this.total = stripeRetrieve.retrieve.amount_total / 100;

      
      
      this.createOrderForDatabase(this.orderDetails, stripeRetrieve.promotionCode, stripeRetrieve.retrieve);

    });

  }

  ngAfterViewInit() { }

  cleanCart(){
    const items = JSON.parse(localStorage.getItem("cartItems"));

    for (let i = 0; i < items.length; i++) {
      this.productService.removeCartItem(items[i]);
    }
  }

  async createOrderForDatabase(orderDetails: Order, promotionCode: string ,stripeRetrieve: any): Promise<void> {
    const exist = await this.orderService.getBySiteOrderId(orderDetails.orderId);

    try {
      if (exist.data.length == 0) {
        await this.createOrderForShipstation(this.orderDetails, stripeRetrieve);

        orderDetails.products.forEach(async (item) => {
          const orderItem = {
            site_name: 'Pistons Fuel Power',
            site_order_id: orderDetails.orderId,
            order_id: this.order_id,
            buyer: stripeRetrieve.customer_details.name,
            phone: stripeRetrieve.customer_details.phone,
            sku: item.sku,
            order_total: orderDetails.totalAmount,
            proportional: item.price * item.quantity,
            quantity: item.quantity,
            price: item.price,
            title: item.title,
            shipping_status: 'awaiting_shipment',
            street_1: orderDetails.shippingDetails.address,
            shipping_city: '',
            shipping_postal_code: orderDetails.shippingDetails.postalcode,
            shipping_state_province: orderDetails.shippingDetails.state,
            shipping_country: orderDetails.shippingDetails.country,
            tracking_number: '',
            carrier: '',
            promotional_code: promotionCode,
            service_code: '',
            payment_id: stripeRetrieve.payment_intent,
          }        
            const result = await this.orderService.registerOrder(orderItem);
        });
      }
    } catch (error) {
      console.error(error.message);
    }

  }

  async createOrderForShipstation(orderDetails: Order, stripeRetrieve: any): Promise<void> {

    const shipOrder: ShipOrder = {
      orderNumber: orderDetails.orderId,
      orderDate: new Date().toISOString(),
      paymentDate: new Date().toISOString(),
      orderStatus: "awaiting_shipment",
      billTo: {
        name: stripeRetrieve.customer_details.name,
        street1: stripeRetrieve.customer_details.address.line1,
        street2: stripeRetrieve.customer_details.address.line2,
        city: stripeRetrieve.customer_details.address.city,
        state: stripeRetrieve.customer_details.address.state,
        postalCode: stripeRetrieve.customer_details.address.postal_code,
        country: stripeRetrieve.customer_details.address.country,
        phone: stripeRetrieve.customer_details.phone,
      },
      shipTo: {
        name: `${orderDetails.shippingDetails.firstname} ${orderDetails.shippingDetails.lastname}`,
        street1: orderDetails.shippingDetails.address,
        city: orderDetails.shippingDetails.town,
        state: orderDetails.shippingDetails.state,
        postalCode: orderDetails.shippingDetails.postalcode,
        country: orderDetails.shippingDetails.country,
        phone: orderDetails.shippingDetails.phone,
      },
      items: this.productsGenerator(orderDetails.products),
      advancedOptions: {
        source: 'Pistons Fuel Power'
      }
    }    

    try {
      const result = await this.shipstationService.createOrder(shipOrder);
      
      if (!result.orderId)
        console.error('No se pudo registrar la orden en ShipStation');
      else{
        this.order_id = result.orderId.toString();
      }

    } catch (error) {
      console.error(error.message);
    }
  }

  productsGenerator(productsList: any[]): Item[] {
    let itemsList: Item[] = [];

    productsList.forEach(prod => {
      const objItem = {
        sku: prod.sku,
        name: prod.title,
        imageUrl: prod.images[0].img_url,
        quantity: prod.quantity,
        unitPrice: prod.price,
      }

      itemsList.push(objItem);
    })

    return itemsList
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
