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
      const stripeRetrieve = await this.paymentService.retrieveSession(params['id'])
      this.payment_ID = stripeRetrieve.payment_intent;

      this.createOrderForDatabase(this.orderDetails, stripeRetrieve);

    });

  }

  ngAfterViewInit() {

  }

  cleanCart(){
    const items = JSON.parse(localStorage.getItem("cartItems"));

    for (let i = 0; i < items.length; i++) {
      this.productService.removeCartItem(items[i]);
    }
  }

  async createOrderForDatabase(orderDetails: Order, stripeRetrieve: any): Promise<void> {
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
      items: this.productsGenerator(orderDetails.products)
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
