import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private alertsMsg={
    successes: {
      settingsSaved: "La configuración de la aplicación se actualizó exitosamente.",
      default: "Operación realizada exitosamente."
    },
    errors: {
      invalidForm: "Hay un error con los datos del formulario, por favor verifique e intente de nuevo.",
      loadingNews: "Ha ocurrido un error cargando las noticias, por favor intenta de nuevo.",
      default: "Ha ocurrido un error, por favor intenta de nuevo."
    }
  }

  constructor() { }

  showAlert(type:any='error', msgCode='default') {
    return Swal.fire({
      icon: type,
      title: (type==='error'?'Oops...':'Éxito!'),
      text: this.alertsMsg[(type==='error'?'errors':'successes')][msgCode]
    })
  }
}
