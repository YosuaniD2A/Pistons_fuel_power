import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

const state = {
  checkoutItems: JSON.parse(localStorage['checkoutItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private router: Router, private http: HttpClient) { }

  // Get Checkout Items
  public get checkoutItems(): Observable<any> {
    const itemsStream = new Observable(observer => {
      observer.next(state.checkoutItems);
      observer.complete();
    });
    return <Observable<any>>itemsStream;
  }

  // Create order
  public createOrder(products: any, details: any, orderId: string, amount: any) {
    var item = {
        shippingDetails: details,
        products,
        orderId,
        totalAmount: amount
    };
    state.checkoutItems = item;
    localStorage.setItem("checkoutItems", JSON.stringify(item));
    // localStorage.removeItem("cartItems");
    // this.router.navigate(['/shop/checkout/success', orderId]);
  }

  public async registerOrder(orderData: any): Promise<any> {
    try {
      const response = await lastValueFrom(this.http.post<any>(`${environment.apiURL}/orders/createOrder`, orderData));
      return response;

    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al registrar la orden:', error);
      throw error;
    }
  }

  public async getBySiteOrderId(site_order_id): Promise<any> {
    try {
      const response = await lastValueFrom(this.http.get<any>(`${environment.apiURL}/orders/getBySiteOrderId/${site_order_id}`));
      return response;
      
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al obtener la orden por site_order_id:', error);
      throw error;
    }
  }

  public async getByOrderId(orderId): Promise<any> {
    try {
      const response = await lastValueFrom(this.http.get<any>(`${environment.apiURL}/orders/getByOrderId/${orderId}`));
      return response;
      
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al obtener la orden por order_id:', error);
      throw error;
    }
  }

  public async getAllOrderId(): Promise<any> {
    try {
      const response = await lastValueFrom(this.http.get<any>(`${environment.apiURL}/orders/getAllOrderId`));
      return response;
      
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al obtener todas la ordenes:', error);
      throw error;
    }
  }

  public async updateOrder(data, id): Promise<any> {
    try {
      const response = await lastValueFrom(this.http.patch<any>(`${environment.apiURL}/orders/updateOrder/${id}`, data));
      return response;
      
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al obtener todas la ordenes:', error);
      throw error;
    }
  }
  
}
