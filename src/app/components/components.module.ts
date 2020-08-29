import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../modules/shared/shared.module';
import { LoadingComponent } from './loading/loading.component';
import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './article/article.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { UppageComponent } from './uppage/uppage.component';
import { ControlMessageComponent } from './control-message/control-message.component';


@NgModule({
  declarations: [
    LoadingComponent,
    NewsComponent,
    ArticleComponent,
    HeaderComponent,
    MenuComponent,
    UppageComponent,
    ControlMessageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
  ],
  exports: [
    LoadingComponent,
    NewsComponent,
    ArticleComponent,
    HeaderComponent,
    MenuComponent,
    UppageComponent,
    ControlMessageComponent
  ]
})
export class ComponentsModule { }
