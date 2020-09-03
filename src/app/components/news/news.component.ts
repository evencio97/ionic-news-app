import { Component, Input, OnDestroy } from '@angular/core';
import { transition, style, animate, trigger } from '@angular/animations';
import { AppService } from '../../services/app.service';
import { Article } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: [
    trigger(
      'articleFade', [
      transition(':enter', [
        style({ transform: 'translateY(20%)', opacity: 0 }),
        animate('.8s', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('.5s', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
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