import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  @Input() news:Article[]=[];
  color:string;

  constructor(
    private _appService:AppService,
  ) {
    this._appService._Color().subscribe(data => this.color = data);
  }

  ngOnInit() {}

}