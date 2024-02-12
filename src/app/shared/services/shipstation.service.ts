import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShipOrder } from '../classes/shipOrder';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class ShipstationService {

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Basic ${this.base64EncodeRFC2045(environment.shipAPI_KEY, environment.shipAPI_SECRET)}`
  });

  constructor(private http: HttpClient) { }

  public async createOrder(orderData: ShipOrder): Promise<any> {
    try {
      // const headers: HttpHeaders = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Authorization': `Basic ${this.base64EncodeRFC2045(environment.shipAPI_KEY, environment.shipAPI_SECRET)}`
      // });
      const response = await lastValueFrom(this.http.post<any>(`${environment.shipstationURL}/orders/createorder`, orderData, { headers: this.headers }));
      return response;
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al registrar la orden:', error);
      throw error;
    }
  }

  public async getOrder(orderId: string): Promise<any> {
    try {
      const response = await lastValueFrom(this.http.get<any>(`${environment.shipstationURL}/orders/${orderId}`, { headers: this.headers }));
      return response;
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al obtener la orden:', error);
      throw error;
    }
  }

  public async getShipment(orderId: string): Promise<any> {
    try {
      const response = await lastValueFrom(this.http.get<any>(`${environment.shipstationURL}/shipments?orderId=${orderId}`, { headers: this.headers }));
      return response;
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al obtener la orden:', error);
      throw error;
    }
  }

  private base64EncodeRFC2045(API_KEY: string, API_SECRET: string): string {
    const credentialsString = `${API_KEY}:${API_SECRET}`;
    const base64Credentials = Buffer.from(credentialsString).toString('base64');
    
    return base64Credentials;
  }

}
