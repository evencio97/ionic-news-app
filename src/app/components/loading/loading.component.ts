import { Component, OnDestroy } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnDestroy {

  loading:boolean;
  private subscription:Subscription;

  constructor(private appService:AppService) {
    this.appService._Loading().subscribe(data => this.loading = data);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
