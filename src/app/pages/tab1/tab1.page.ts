import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { AppService } from '../../services/app.service';
import { AlertsService } from '../../services/alerts.service';
import { Article } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  private subscriptions:Subscription[]= [];
  color:string;
  news:Article[]= [];
  total:number= 0;
  sortBy:string= "publishedAt";
  source:string= null;
  query:string= null;
  page:number= 1;

  constructor(
    private _appService:AppService,
    private _newsService:NewsService,
    private _alersService:AlertsService
  ) { }
  
  ngOnInit() {
    this.subscriptions.push(
      this._appService._Color().subscribe(data => this.color = data),
      this._appService._Language().subscribe(() => this.loadNews())
    );
    // this.loadNews();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub=> sub.unsubscribe());
  }

  loadNews(page=1) {
    this._newsService.getNews(this.source, this.query, this.sortBy, page).subscribe( resp => {
      if (resp.status==='error' || !('articles' in resp)) this._alersService.showAlert('error', 'loadingNews');
      this.news.push(...resp.articles);
      this.total=resp.totalResults;
      this.page= page;
      console.log(this.news);
    }, error => {
      console.log(error);
      this._alersService.showAlert('error');
    })
  }
}
