import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  async checkoutStripe(orderData: any): Promise<any> {
    try {
      return await lastValueFrom(this.http.post(`${environment.apiURL}/payment/create-checkout-session`, orderData));
  
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al intentar realizar el pago:', error);
      throw error;
    }
  }

  async retrieveSession(id: any): Promise<any> {
    try {
      return await lastValueFrom(this.http.get(`${environment.apiURL}/payment/retrieve-checkout-session/${id}`));
  
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al intentar recuperar informacion del pago:', error);
      throw error;
    }
  }

}
