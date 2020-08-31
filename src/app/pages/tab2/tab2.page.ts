import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { NewsService } from '../../services/news.service';
import { AlertsService } from '../../services/alerts.service';
import { Article, Category } from '../../interfaces/interfaces';
import { IonContent } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  
  @ViewChild(IonContent) content: IonContent;
  private subscriptions:Subscription[]=[];
  color:string;
  categories:Category[]=this._appService.categories;
  actualCategory:string;
  news:Article[]= [];
  total:number= 0;
  page:number= 1;

  constructor(
    private _appService:AppService,
    private _newsService:NewsService,
    private _alertsService:AlertsService
  ) { }
  
  ngOnInit() {
    this.subscriptions.push(
      this._appService._Color().subscribe(data => this.color = data),
      this._appService._Country().subscribe((data) => {
        if (data){
          this.loadTopNews();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub=> sub.unsubscribe());
  }

  loadTopNews(page=1, category="general", newPage=false, $event?){
    if (this.actualCategory===category && page===this.page && !newPage) return $event? $event.target.complete():null;
    
    if (!newPage) this._appService.Loading=true;
    page= this.actualCategory===category? page:1;
    this._newsService.getTopNews(category, page).subscribe( resp => {
      if (!newPage) this._appService.Loading=false;
      else if ($event) $event.target.complete();
      if (resp.status==='error' || !('articles' in resp))
        return this._alertsService.showAlert('error', 'loadingNews');
      
      this.news=page===1? resp.articles:this.news.concat(resp.articles);
      this.total=resp.totalResults;
      this.page= page;
      this.actualCategory= category;
      // console.log({news: this.news, total: this.total, faltan: this.total-this.news.length});
    }, error => {
      if (!newPage) this._appService.Loading=false;
      else if ($event) $event.target.complete();
      this._alertsService.showAlert('error');
    })
  }

}
