import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  color:string;

  constructor(
    private _appService:AppService
  ) {
    this._appService._Color().subscribe(data => this.color = data);
  }

}
