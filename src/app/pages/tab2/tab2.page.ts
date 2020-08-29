import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { NewsService } from '../../services/news.service';
import { AlertsService } from '../../services/alerts.service';
import { Article, Category, Country } from '../../interfaces/interfaces';
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
  categories:Category[]=[
    { name: 'Todas', value: 'general'}, 
    { name: 'Negocios', value: 'business'}, 
    { name: 'Ciencia', value: 'science'},
    { name: 'Tecnología', value: 'technology'},
    { name: 'Entretenimiento', value: 'entertainment'},
    { name: 'Salud', value: 'health'},
    { name: 'Deportes', value: 'sports'}
  ]
  actualCategory:string;
  news:Article[]= [];
  total:number= 0;
  page:number= 1;
  countryCode:string;

  constructor(
    private _appService:AppService,
    private _newsService:NewsService,
    private _alersService:AlertsService
  ) { }
  
  ngOnInit() {
    this.subscriptions.push(
      this._appService._Color().subscribe(data => this.color = data),
      this._appService._Country().subscribe((data) => {
        if (data){
          this.countryCode=data;
          this.loadTopNews();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub=> sub.unsubscribe());
  }

  loadTopNews(page=1, category="general", source= null, query= null){
    // if (this.actualCategory===category) return;
    this._appService.Loading=true;
    this._newsService.getTopNews(category, source, query).subscribe( resp => {
      this._appService.Loading=false;
      if (resp.status==='error' || !('articles' in resp)) this._alersService.showAlert('error', 'loadingNews');
      this.news=page===1? resp.articles:this.news.concat(resp.articles);
      this.total=resp.totalResults;
      this.page= page;
      this.actualCategory= category;
      console.log(this.news);
    }, error => {
      this._appService.Loading=false;
      this._alersService.showAlert('error');
    })
  }

}
