import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title:string='';
  color:string;

  constructor(
    private _appService:AppService,
  ) {
    this._appService._Color().subscribe(data => this.color = data);
  }

  ngOnInit() {}

}
