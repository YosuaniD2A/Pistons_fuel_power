import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private url: string ="https://newsapi.org/v2/everything?q=tesla&from=2023-10-13&sortBy=publishedAt&apiKey=82e2cd1329b44b6fb90bae78bfdaa8d1";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any>{
      return this.httpClient.get<any>(this.url);
  }
  
}
