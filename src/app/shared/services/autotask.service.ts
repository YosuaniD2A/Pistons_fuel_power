import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { Interface } from 'readline';
import { ShipstationService } from './shipstation.service';

// interface Order {
//   shippingDetails?: any;
//   products?: Product[];
//   orderId?: any;
//   totalAmount?: any;
// }

@Injectable({
  providedIn: 'root'
})
export class AutotaskService {

  constructor(private orderService: OrderService, private shipstationService: ShipstationService) { }

  updateOrderStatus(): void {
    this.executeTask();

    setInterval(() => {
      this.executeTask();
    }, 12 * 60 * 60 * 1000);

  }

  private async executeTask(): Promise<void> {
    try {
      const ordersIdList = await this.orderService.getAllOrderId();
      let trackingNumber = '';

      if (ordersIdList.data.length > 0) {

        const ordersInfo = await Promise.all(ordersIdList.data.map(async (order) => {
          const { orderStatus, carrierCode, serviceCode } = await this.shipstationService.getOrder(order.order_id);

          if (orderStatus === 'shipped') {
            trackingNumber = await this.shipstationService.getShipment(order.order_id);
          }

          const idList = await this.orderService.getByOrderId(order.order_id);

          idList.data.forEach(async (elem) => {
            if (elem.shipping_status !== orderStatus) {              
              await this.orderService.updateOrder({
                shipping_status: orderStatus,
                tracking_number: trackingNumber,
                carrier: carrierCode,
                service_code: serviceCode
              }, elem.id)
            }
          })

          return `Order status ${order.order_id}, updated`
        }));

        // console.log(ordersInfo);
      }

    } catch (error) {
      console.error(`An error occurred updating the statuses: ${error}`);
    }
  }

}
