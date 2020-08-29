import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  static getValidatorErrorMessage(validatorName: string) {
    let config = {
      'required': "Por favor complete este campo.",
      'onlyAllowedChar': "No se permiten caracteres numericos o simbolos.",
      'minlength': "",
      'maxlength': ""
    };
    return config[validatorName];
  }

  static required(control) {
    if (!control.value || typeof control.value === 'string' && !control.value.trim()) return { required: true };
    return null;
  }

  static onlyAllowedCharValidator(control) {
    if (!control.value || control.value === '') return null;
    if (control && control.value && !control.value.match(/[^\sa-zA-Z]/g)) return null;
    else return { 'onlyAllowedChar': true };
  }
}
