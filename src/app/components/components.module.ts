import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from './loading/loading.component';
import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './article/article.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { UppageComponent } from './uppage/uppage.component';



@NgModule({
  declarations: [
    LoadingComponent,
    NewsComponent,
    ArticleComponent,
    HeaderComponent,
    MenuComponent,
    UppageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    LoadingComponent,
    NewsComponent,
    ArticleComponent,
    HeaderComponent,
    MenuComponent,
    UppageComponent
  ]
})
export class ComponentsModule { }
