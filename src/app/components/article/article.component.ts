import { Component, Input, OnDestroy } from '@angular/core';
import { transition, style, animate, trigger } from '@angular/animations';
import { AppService } from '../../services/app.service';
import { Article } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: [
    trigger(
      'fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.4s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ArticleComponent implements OnDestroy {

  @Input() article:Article=undefined;
  @Input() id:number=undefined;
  color:string;
  isMobile:boolean;
  loadingImg:boolean=true;
  private subscriptions:Subscription[]=[];

  constructor(
    private _appService:AppService,
  ) {
    this.subscriptions.push(
      this._appService._Color().subscribe(data => this.color = data),
      this._appService._IsMobile().subscribe(data => this.isMobile = data)
    );
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe() );
  }

  imgError() {
    this.article.urlToImage= undefined;
    this.loadingImg= false;
  }

  imgLoaded() {
    this.loadingImg= false;
    document.getElementById('article-img-'+this.id).classList.remove('img-loading');
  }
}
