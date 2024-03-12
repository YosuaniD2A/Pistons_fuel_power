import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfluencersService {

  constructor(private http: HttpClient) { }

  async login(data: any): Promise<any> {
    try {
      return await lastValueFrom(this.http.post(`${environment.apiURL}/influencers/login`, data));
  
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al intentar hacer login:', error);
      throw error;
    }
  };

  async getCodeDescount(code: any): Promise<any> {
    try {
      return await lastValueFrom(this.http.get(`${environment.apiURL}/influencers/getCodeDescount/${code}`));
  
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al intentar recuperar informacion del codigo de descuento:', error);
      throw error;
    }
  };

  async getInfluencer(value: any): Promise<any> {
    try {
      return await lastValueFrom(this.http.get(`${environment.apiURL}/influencers/getInfluencer/${value}`));
  
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al intentar recuperar informacion del influencer:', error);
      throw error;
    }
  };

  async updateInfluencer(id: any, data: any): Promise<any> {
    try {
      return await lastValueFrom(this.http.put(`${environment.apiURL}/influencers/updateInfluencer/${id}`, data));
  
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al intentar actualizar informacion del influencer:', error);
      throw error;
    }
  };

  async getAllOrdersWithMyCode(code: any): Promise<any> {
    try {
      return await lastValueFrom(this.http.get(`${environment.apiURL}/influencers/getAllOrdersWithMyCode/${code}`));
  
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al intentar actualizar informacion del influencer:', error);
      throw error;
    }
  };

  async createPaymentRequest(data: any): Promise<any> {
    try {
      return await lastValueFrom(this.http.post(`${environment.apiURL}/requests/createRequest`, data));
  
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al intentar crear una solicitud de pago:', error);
      throw error;
    }
  };

  async getRequests(id: number): Promise<any> {
    try {
      return await lastValueFrom(this.http.get(`${environment.apiURL}/requests/getRequestsByInfluencerId/${id}`));
  
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al intentar obtener las solicitudes de pago:', error);
      throw error;
    }
  };
}
