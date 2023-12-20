import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Collection } from '../classes/collection';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  /*
    ---------------------------------------------
    ---------------  Collection  -------------------
    ---------------------------------------------
  */

  // Collection
  private async collections(): Promise<Collection[]> {
    try {
      const response = await lastValueFrom(this.http.get<{ data: Collection[] }>(`${environment.apiURL}/collections/getAllCollections`));
      const collections = response.data;
  
      localStorage['collections'] = JSON.stringify(collections);
  
      return collections;
    } catch (error) {
      // Manejar errores aquí según tus necesidades
      console.error('Error al obtener colecciones:', error);
      throw error;
    }
  }

  public get getCollections(): Observable<Collection[]> {
    return from(this.collections());
  }
}
