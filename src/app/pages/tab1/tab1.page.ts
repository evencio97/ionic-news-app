import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { transition, style, animate, trigger } from '@angular/animations';
import { NewsService } from '../../services/news.service';
import { AppService } from '../../services/app.service';
import { AlertsService } from '../../services/alerts.service';
import { ValidationService } from 'src/app/services/validation.service';
import { Article, Country, Category } from '../../interfaces/interfaces';
import { IonContent } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  animations: [
    trigger(
      'SearchFormAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('.3s', style({ transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)' }),
        animate('.3s', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class Tab1Page implements OnInit, OnDestroy {
  
  @ViewChild(IonContent) content: IonContent;
  private subscriptions:Subscription[]= [];
  
  color:string;
  news:Article[]= [];
  total:number= 0;
  page:number= 1;
  
  hideForm:boolean=false;
  form: FormGroup;
  languages:Country[]= this._appService.languages;
  data={
    query: null,
    language: "es",
    sortBy: "publishedAt"
  };
  sortBy:Category[]= [
    { name: "Más reciente", value: "publishedAt" },
    { name: "Relevancia", value: "relevancy" },
    { name: "Popularidad", value: "popularity" },
  ];

  constructor(
    private _appService:AppService,
    private _newsService:NewsService,
    private _alertsService:AlertsService,
    private formBuilder: FormBuilder,
  ) { }
  
  ngOnInit() {
    this.subscriptions.push(this._appService._Color().subscribe(data => this.color = data));
    this.iniForm()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub=> sub.unsubscribe());
  }

  async iniForm() {
    this.form = await this.formBuilder.group({
      query: [
        this.data.query,
        [ValidationService.required, ValidationService.onlyAllowedCharValidator]
      ],
      language: [
        this.data.language,
        [ValidationService.required]
      ],
      sortBy: [
        this.data.sortBy,
        [ValidationService.required]
      ]
    });
  }

  loadNews(page:number=1, newPage:boolean=false, $event?){
    if (!this.data.query || this.data.query.trim().lenght<1){
      console.log(this.data)
      if ($event) $event.target.complete();
      return this._alertsService.showAlert('error', 'noQuery');
    }
    
    if (!newPage) this._appService.Loading=true;
    this._newsService.getNews( this.data.language, this.data.query, this.data.sortBy, page).subscribe( resp => {
      if (!newPage) this._appService.Loading=false;
      else if ($event) $event.target.complete();
      if (resp.status==='error' || !('articles' in resp))
        return this._alertsService.showAlert('error', 'loadingNews');
      
      this.news=page===1? resp.articles:this.news.concat(resp.articles);
      this.total=resp.totalResults;
      this.page= page;
      // this.iniForm();
      console.log({news: this.news, total: this.total, faltan: this.total-this.news.length});
    }, error => {
      if (!newPage) this._appService.Loading=false;
      else if ($event) $event.target.complete();
      this._alertsService.showAlert('error');
    })
  }

  onSubmit(form:FormGroup, $event) {
    $event.preventDefault();
    if (!form.valid) return this._alertsService.showAlert('error', 'invalidForm');
    this.data= form.value;
    this.loadNews(1);
  }
}
