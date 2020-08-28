import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  loading:boolean;

  constructor(private appService:AppService) {
    this.appService._Loading().subscribe(data => this.loading = data);
  }

  ngOnInit() {
  }

}
