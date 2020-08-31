import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Article } from '../../interfaces/interfaces';
import { IonContent } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {

  @ViewChild(IonContent) content: IonContent;
  private subscriptions:Subscription[]=[];
  color:string;
  news:Article[]= [];

  constructor(
    private _appService:AppService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this._appService._Color().subscribe(data => this.color = data),
      this._appService._FavArticles().subscribe((data) => {
        if (Array.isArray(data)) this.news= data;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub=> sub.unsubscribe());
  }

}
