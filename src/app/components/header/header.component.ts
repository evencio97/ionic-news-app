import { Component, Input, OnDestroy } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {

  @Input() title:string='';
  color:string;
  private subscription:Subscription;

  constructor(
    private _appService:AppService,
  ) {
    this._appService._Color().subscribe(data => this.color = data);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
