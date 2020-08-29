import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
	selector: 'app-control-message',
	templateUrl: './control-message.component.html',
	styleUrls: ['./control-message.component.scss'],
})
export class ControlMessageComponent {

	_errorMessage: string;
	@Input() control: FormControl;
	constructor() { }

	get errorMessage() {
		for (let propertyName in this.control.errors) {
			if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
				return ValidationService.getValidatorErrorMessage(propertyName);
			}
		}
		return null;
	}

}
