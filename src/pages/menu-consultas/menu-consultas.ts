import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the MenuConsultasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-consultas',
  templateUrl: 'menu-consultas.html',
})
export class MenuConsultasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public myToastCtrl: ToastController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuConsultasPage');
  }

  //Mensaje para botones que aun estan en desarrollo
  msjEnDesarrollo() {
    let toast = this.myToastCtrl.create({
      message: 'Sección en Desarrollo',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('toast Dismissed');
    });

    toast.present();
  }

  consultaEventuales()
  {
    this.navCtrl.push("ConsultaGenericaPage", { tipoConsulta: "eventual" });
  }

}
