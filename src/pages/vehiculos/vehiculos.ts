import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { SingletonProvider } from '../../providers/singleton/singleton';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the VehiculosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vehiculos',
  templateUrl: 'vehiculos.html',
})
export class VehiculosPage {

  sectores = [];
  sector: any;
  tarifa: any = '3000';
  valorPagar: any = this.tarifa;

  //Separador de miles
  DECIMAL_SEPARATOR = ",";
  GROUP_SEPARATOR = ".";
  budget = 0;

  //Recibo
  retornar;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public speechRecognition: SpeechRecognition,
    private singleton: SingletonProvider,
    public databaseprovider: DatabaseProvider
  ) {
    this.retornar = this.navParams.get("callback");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehiculosPage');
    this.sectores = this.singleton.sectoresPlaza;
    this.sector = this.singleton.sector;
  }

  //para miles  
  format(valString) {
    if (!valString) {
      return '';
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    return parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, this.GROUP_SEPARATOR)

  };
  unFormat(val) {
    if (!val) {
      return '';
    }
    val = val.replace(/^0+/, '').replace(/\D/g, '');
    if (this.GROUP_SEPARATOR === ',') {
      return val.replace(/,/g, '');
    } else {
      return val.replace(/\./g, '');
    }
  };

  audioValor() {

    // Request permissions
    this.speechRecognition.requestPermission()
      .then(
        () => console.log('Granted'),
        () => console.log('Denied')
      )
    this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => console.log(available))

    // Start the recognition process
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          let aux = '';
          matches.forEach(element => {
            aux = element;
            //console.log("AUX", aux);
          });
          this.valorPagar = aux;

        },
        (onerror) => console.log('error:', onerror)
      )
  }

  aceptar() {
    this.retornar(true).then(() => {
      this.navCtrl.pop();
    });
  }

  cancelar() {
    this.retornar(false).then(() => {
      this.navCtrl.pop();
    });
  }

}
