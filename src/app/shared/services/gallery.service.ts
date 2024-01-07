import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, from, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

  /*
    ---------------------------------------------
    ---------------  Gallery  -------------------
    ---------------------------------------------
  */

  // Gallery
  private async gallery(): Promise<any[]> {
    try {
      const response = await lastValueFrom(this.http.get<{ data: any[] }>(`${environment.apiURL}/gallery/getAllImages`));
      const gallery = response.data;
  
      localStorage['gallery'] = JSON.stringify(gallery);
  
      return gallery;
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al obtener colecciones:', error);
      throw error;
    }
  }

  public get getGallery(): Observable<any[]> {
    return from(this.gallery());
  }
}
