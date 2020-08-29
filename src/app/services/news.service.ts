import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewsResp } from '../interfaces/interfaces';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http:HttpClient,
    private _appService: AppService
  ) { }

  getTopNews(category:string="general", page:number=1){
    let country= this._appService.Country;
    const url= environment.apiURL+'/top-headlines?country='+country+'&category='+category+
      '&page='+page+'&apiKey='+environment.apiKey;
    return this.http.get<NewsResp>(url);
  }
  
  getNews(language:string="es", query:string=null, sortBy:string=null, page:number=1){
    const url= environment.apiURL+'/everything?language='+language+(query?'&q='+query:'')+
      (sortBy?'&sortBy='+sortBy:'')+'&page='+page+'&apiKey='+environment.apiKey;
    return this.http.get<NewsResp>(url);
  }
}
