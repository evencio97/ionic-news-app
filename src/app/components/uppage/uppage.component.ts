import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { transition, style, animate, trigger } from '@angular/animations';
import { IonContent } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-uppage',
  templateUrl: './uppage.component.html',
  styleUrls: ['./uppage.component.scss'],
  animations: [
    trigger(
      'buttonUpAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100px)', opacity: 0 }),
        animate('.5s', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('.5s', style({ transform: 'translateX(100px)', opacity: 0 }))
      ])
    ])
  ],
})
export class UppageComponent implements OnInit, OnDestroy {

  @Input() set content(content: IonContent) {
    if(!content || this.iniContent) return;
    this.iniContent=content;
    this.subscription= this.iniContent.ionScroll.subscribe(($event, arg) => { this.showButtonUp($event) });
  }
  private subscription:Subscription;
  iniContent:IonContent= undefined;
  show:boolean=false;

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  
  scrollTop() {
    this.iniContent.scrollToTop(500);
  }

  async showButtonUp($event) {
    const currentScrollDepth = $event.detail.scrollTop;
    const maxScroll= window.screen.height;
    if (currentScrollDepth > maxScroll) this.show=true;
    else if(currentScrollDepth <= maxScroll) this.show=false;
  }

}
