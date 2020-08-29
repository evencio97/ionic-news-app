import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule, MatFormFieldModule, MatCheckboxModule, MatIconModule,
    MatSelectModule, MatSlideToggleModule, MatRadioModule, MatSliderModule,
    FormsModule, ReactiveFormsModule, MatAutocompleteModule,
    IonicModule,
  ],
  exports: [
    MatInputModule, MatFormFieldModule, MatCheckboxModule, MatIconModule,
    MatSelectModule, MatSlideToggleModule, MatRadioModule, MatSliderModule,
    FormsModule, ReactiveFormsModule, MatAutocompleteModule,
    IonicModule,
  ]
})
export class SharedModule { }
