import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { User, Country } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private isMobile = new BehaviorSubject<boolean>(true);
  private loading = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<User>({ name: null, lastname: null });
  private country = new BehaviorSubject<Country>({ "name": "Venezuela", "code": "ve" });
  private language = new BehaviorSubject<string>('es');
  private color = new BehaviorSubject<string>("dark");

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

  set User(value: User) { this.user.next(value); this._storage.set('user', value); }
  get User(): User { return this.user.value; }
  _User(): Observable<User> { return this.user.asObservable() }

  set Country(value: Country) { this.country.next(value); this._storage.set('country', value); }
  get Country(): Country { return this.country.value }
  _Country(): Observable<Country> { return this.country.asObservable() }

  set Language(value: string) { this.language.next(value); this._storage.set('language', value); }
  get Language(): string { return this.language.value }
  _Language(): Observable<string> { return this.language.asObservable() }

  set Color(value: string) { this.color.next(value); this._storage.set('color', value); }
  get Color(): string { return this.color.value }
  _Color(): Observable<string> { return this.color.asObservable() }

  async loadAppInfo() {
    let user:User= await this._storage.get('user');
    if (user) this.user.next(await this._storage.get('user'));
    let country:Country= await this._storage.get('country');
    if (country) this.country.next(await this._storage.get('country'));
    let language:string= await this._storage.get('language');
    if (language) this.language.next(await this._storage.get('language'));
  }
}
