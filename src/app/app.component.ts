import { Component } from '@angular/core';
import { transition, style, animate, trigger } from '@angular/animations';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    trigger(
      'fadeOut', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('.5s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent {

  initializing:boolean=true;
  fullName:string=null;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _appService: AppService
  ) {
    this.initializeApp();
    this._appService._DataLoading().subscribe( data=> {
      if (!data){
        if (this._appService.User.name)
          this.fullName=this._appService.User.name+' '+this._appService.User.lastname;
        setTimeout(() => {
          this.initializing=false;
        }, 2000);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this._appService._Color().subscribe( data=> {
        if (data==="dark") return this.statusBar.styleLightContent();
        this.statusBar.styleDefault();
      });
      this.splashScreen.hide();
    });
  }
}
