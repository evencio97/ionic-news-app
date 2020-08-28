import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { User, Country } from '../../interfaces/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  color:string= this._appService.Color;
  user:User= this._appService.User;
  country:Country= this._appService.Country;
  language:string= this._appService.Language;

  constructor(
    private _appService:AppService,
  ) { }

  ngOnInit() {}

}
