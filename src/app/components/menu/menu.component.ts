import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { User, Country } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';
import { ValidationService } from '../../services/validation.service';
import { AlertsService } from '../../services/alerts.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  
  private subscriptions:Subscription[]= [];
  form: FormGroup;
  color:string;
  countries:Country[]= this._appService.countries;

  constructor(
    private formBuilder: FormBuilder,
    private _appService:AppService,
    private _alertsService:AlertsService,
    private menu:MenuController
  ) { }
  
  ngOnInit() {
    this.subscriptions.push(
      this._appService._Color().subscribe(data => this.color = data),
      this._appService._DataLoading().subscribe(data => { if(!data) this.iniForm() }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub=> sub.unsubscribe());
  }

  async iniForm() {
    this.form = await this.formBuilder.group({
      name: [
        this._appService.User.name,
        [ValidationService.onlyAllowedCharValidator]
      ],
      lastname: [
        this._appService.User.lastname,
        [ValidationService.onlyAllowedCharValidator]
      ],
      country: [
        this._appService.Country,
        [ValidationService.required]
      ],
      color: [
        (this._appService.Color==='dark'? true:false)
      ]
    });
  }

  onSubmit(form, $event) {
    $event.preventDefault();
    if (!form.valid) return this._alertsService.showAlert('error', 'invalidForm');
    let data = form.value;
    
    this._appService.Loading=false;
    if (this._appService.User.name !== data.name || this._appService.User.lastname !== data.lastname) 
      this._appService.User= <User>{ name: data.name, lastname: data.lastname };
    
    if (this._appService.Country !== data.country) this._appService.Country= <string>data.country;
    
    let newColor= data.color? 'dark':undefined;
    if (this._appService.Color !== newColor)
      this._appService.Color= <string>newColor;
    
    this._appService.Loading=false;
    this._alertsService.showAlert('success', 'settingsSaved');
    this.menu.close('menu');
  }

}
