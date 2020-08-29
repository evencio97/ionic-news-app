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

  getTopNews(category="general", source=null, query=null, page=1){
    let country= this._appService.Country;
    const url= environment.apiURL+'/top-headlines?country='+country+'&category='+category+
      (source?'&sources='+source:'')+(query?'&q='+query:'')+'&page='+page+'&apiKey='+environment.apiKey;
    return this.http.get<NewsResp>(url);
  }
  
  getNews(source=null, query=null, sortBy=null, page=1){
    let language= this._appService.Language;
    const url= environment.apiURL+'/everything?language='+language+
      (source?'&sources='+source:'')+(query?'&q='+query:'')+(sortBy?'&sortBy='+sortBy:'')+
      '&page='+page+'&apiKey='+environment.apiKey;
    return this.http.get<NewsResp>(url);
  }
}
