import { Component, Input, OnDestroy } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController } from '@ionic/angular';
import { AppService } from '../../services/app.service';
import { Article } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnDestroy {

  @Input() article:Article=undefined;
  @Input() id:number=undefined;
  color:string;
  isMobile:boolean;
  loadingImg:boolean=true;
  private subscriptions:Subscription[]=[];

  constructor(
    private appBrowser:InAppBrowser,
    private _appService:AppService,
    private socialSharing: SocialSharing,
    public toastController: ToastController
  ) {
    this.subscriptions.push(
      this._appService._Color().subscribe(data => this.color = data),
      this._appService._IsMobile().subscribe(data => this.isMobile = data),
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
    document.getElementById('article-img-'+this.id).classList.add('animated', 'fadeIn');
  }

  goToArticle(){
    this.appBrowser.create(this.article.url, '_system');
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message, duration: 1500, keyboardClose: true
    });
    toast.present();
  }

  addAnimation(elem:HTMLElement, animation:string="animated") {
    elem.classList.add("animated");
    if (elem.onanimationend) return;
    elem.onanimationend=function (){ elem.classList.remove(animation);}
  }

  toggleFavArticle($event) {
    if (!$event && $event.target) return;
    const icon= $event.target;
    this.article.fav=!this.article.fav;
    if (this.article.fav) this._appService.addFavArticle( this.article );
    else this._appService.removeFavArticle( this.article );
    this.presentToast(this.article.fav? 'Noticia guardada en favoritos': 'Noticia eliminada de favoritos')
    this.addAnimation(icon);
  }

  shareArticle($event) {
    if (!$event && $event.target) return;
    const icon= $event.target;
    this.socialSharing.share(
      this.article.title,
      this.article.source.name,
      '',
      this.article.url
    );
    this.addAnimation(icon);
  }
}
