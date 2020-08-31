import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { User, Country, Category, Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private isMobile = new BehaviorSubject<boolean>(true);
  private loading = new BehaviorSubject<boolean>(false);
  private dataLoading = new BehaviorSubject<boolean>(true);
  private user = new BehaviorSubject<User>({ name: null, lastname: null });
  private country = new BehaviorSubject<string>(null);
  private color = new BehaviorSubject<string>("dark");
  private favArticles = new BehaviorSubject<Article[]>([]);
  countries:Country[]= [
    { name: 'Venezuela', code: 've'}, { name: 'Argentina', code: 'ar'},
    { name: 'Brasil', code: 'br'}, { name: 'México', code: 'mx'},
    { name: 'Colombia', code: 'co'}, { name: 'Estados Unidos', code: 'us'},
    { name: 'Canadá', code: 'ca'},
  ];
  languages:Country[]= [
    { name: 'Español', code: 'es' }, { name: 'Inglés', code: 'en' },
    { name: 'Francés', code: 'fr' }, { name: 'Portugués', code: 'pt' },
  ];
  categories:Category[]=[
    { name: 'Todas', value: 'general'}, 
    { name: 'Negocios', value: 'business'}, 
    { name: 'Ciencia', value: 'science'},
    { name: 'Tecnología', value: 'technology'},
    { name: 'Entretenimiento', value: 'entertainment'},
    { name: 'Salud', value: 'health'},
    { name: 'Deportes', value: 'sports'}
  ]

  constructor(
    private platform: Platform,
    private _storage: Storage
  ) {
    this.platform.ready().then(async () => {
      this.loadAppInfo()
      this.IsMobile= this.platform.is("cordova");
    })
  }

  set IsMobile(value: boolean) { this.isMobile.next(value) }
  get IsMobile(): boolean { return this.isMobile.value }
  _IsMobile(): Observable<boolean> { return this.isMobile.asObservable() }

  set Loading(value: boolean) { this.loading.next(value) }
  get Loading(): boolean { return this.loading.value }
  _Loading(): Observable<boolean> { return this.loading.asObservable() }

  set DataLoading(value: boolean) { this.dataLoading.next(value) }
  get DataLoading(): boolean { return this.dataLoading.value }
  _DataLoading(): Observable<boolean> { return this.dataLoading.asObservable() }

  set User(value: User) { this.user.next(value); this._storage.set('user', value); }
  get User(): User { return this.user.value; }
  _User(): Observable<User> { return this.user.asObservable() }

  set Country(value: string) { this.country.next(value); this._storage.set('country', value); }
  get Country(): string { return this.country.value }
  _Country(): Observable<string> { return this.country.asObservable() }

  set Color(value: string) { this.color.next(value); this._storage.set('color', value===undefined?'undefined':value); }
  get Color(): string { return this.color.value }
  _Color(): Observable<string> { return this.color.asObservable() }

  set FavArticles(value: Article[]) { this.favArticles.next(value); this._storage.set('favArticles', value); }
  get FavArticles(): Article[] { return this.favArticles.value }
  _FavArticles(): Observable<Article[]> { return this.favArticles.asObservable() }

  async loadAppInfo() {
    // User
    let user:User= await this._storage.get('user');
    if (user && user !== this.User) this.user.next(user);
    // Country
    let country:string= await this._storage.get('country');
    this.country.next(country? country:"ve");
    // Color
    let color:string= await this._storage.get('color');
    if (color && color !== this.Color) this.color.next(color==="undefined"? undefined:color);
    // Fav articles
    let favArticles:Article[]= await this._storage.get('favArticles');
    if (favArticles?.length) this.favArticles.next(favArticles);
    // console.log({user, country, color, favArticles});
    this.DataLoading=false;
  }

  async addFavArticle(article:Article){
    let favArticles= this.FavArticles;
    // Check if exist
    if (favArticles.find( art=> art.title===article.title)) return;
    // Save
    favArticles.unshift(article);
    this.FavArticles= favArticles;
  }

  async removeFavArticle(article:Article){
    let favArticles= this.FavArticles;
    favArticles= favArticles.filter(art=> art.title!==article.title);
    // Check if not exist
    if (favArticles.length >= this.FavArticles.length) return;
    // Remove
    this.FavArticles= favArticles;
  }
}
