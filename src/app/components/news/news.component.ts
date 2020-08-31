import { Component, Input, OnDestroy } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Article } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnDestroy {

  @Input() news:Article[]=[];
  @Input() noNewsMsg:string="No se encontraron noticias";
  @Input() noNewsIcon:string="alert-circle";
  color:string;
  private subscription:Subscription;

  constructor(
    private _appService:AppService,
  ) {
    this.subscription= this._appService._Color().subscribe(data => this.color = data);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}