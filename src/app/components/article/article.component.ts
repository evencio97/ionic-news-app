import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article:Article=undefined;
  @Input() id:number=undefined;
  color:string;
  isMobile:boolean;
  loadingImg:boolean=true;

  constructor(
    private _appService:AppService,
  ) {
    this._appService._Color().subscribe(data => this.color = data);
    this._appService._IsMobile().subscribe(data => this.isMobile = data);
  }
  
  ngOnInit() {
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
