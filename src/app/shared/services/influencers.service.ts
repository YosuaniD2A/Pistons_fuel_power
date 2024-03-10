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
  }

  async getCodeDescount(code: any): Promise<any> {
    try {
      return await lastValueFrom(this.http.get(`${environment.apiURL}/influencers/getCodeDescount/${code}`));
  
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al intentar recuperar informacion del codigo de descuento:', error);
      throw error;
    }
  }
}
