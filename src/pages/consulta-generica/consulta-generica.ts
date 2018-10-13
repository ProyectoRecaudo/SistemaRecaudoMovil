import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { SingletonProvider } from '../../providers/singleton/singleton';
import { PrepararReciboProvider } from '../../providers/preparar-recibo/preparar-recibo';

/**
 * Generated class for the ConsultaGenericaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consulta-generica',
  templateUrl: 'consulta-generica.html',
})
export class ConsultaGenericaPage {  

  plazas;
  recibos;
  plazaSeleccionada;

  tipoConsulta;
  selectExtra = true;

  etiquetaSelExtra
  extraSeleccionado
  etiquetaExtra;
  phExtra;
  datoExtra: string;
  numRecibo: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private databaseprovider: DatabaseProvider,
    private singleton: SingletonProvider,
    private prepRecibo: PrepararReciboProvider) {

    this.tipoConsulta = this.navParams.get("tipoConsulta");

    this.tipoConsulta = "eventual";
    if (this.tipoConsulta == "eventual") {
      this.selectExtra = false;
      this.etiquetaExtra = "Identificación";
      this.phExtra = "Buscar por identificación de usuario";
    }
    this.numRecibo = '';
    this.datoExtra = '';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultagenericaPage');

    this.plazas = this.singleton.plazas;
    this.plazaSeleccionada = this.singleton.plaza;

  }

  acerto(item) {
    this.showToast("numero recibo: " + item["norecibo"]);
  }

  imprimir(recibo) {
    if (this.tipoConsulta == "eventual") {
      let obj=this.prepRecibo.armarReciboEventual(recibo);
      this.navCtrl.push("ReciboPage", { datosRecibo:obj, callback: this.imprimirFunc });
    }
  }

  imprimirFunc = (resultado) => {
    return new Promise((resolve, reject) => {
      if (resultado) {
        //this.prepararImpresion();        
      }
      else {
        console.log("no imprimir");
      }

      resolve();
    });
  }

  anular(recibo) {
    if (recibo["sincronizado"] == "Sincronizado") {
      this.showToast("El recibo ya fue sincronizado, no se puede anular.");
      return;
    }
    else if (recibo["estado"] == "ANULADO") {
      this.showToast("El recibo ya está anulado.");
      return;
    }
    if (this.tipoConsulta == "eventual") {
      this.databaseprovider.anularReciboEventual(recibo["pkidsqlite"]).then((datos) => {
        this.showToast("Se anuló el recibo.");
      }).catch((e) => {
        if (!e.message) {
          recibo["estado"] = "ANULADO";
          this.showToast("Se anuló el recibo.");
        }
      });
    }
  }

  buscar() {
    let idplaza = -1;
    if (this.plazaSeleccionada && this.plazaSeleccionada["pkidplaza"] != undefined) {
      idplaza = this.plazaSeleccionada["pkidplaza"];
    }
    //console.log("plaza " +  + "; numrecibo " +this.numRecibo.trim()+ "; identifica " + this.datoExtra.trim());

    if (this.tipoConsulta == "eventual") {
      this.databaseprovider.consultaReciboEventual(idplaza, this.numRecibo.trim(), this.datoExtra.trim()).then((datos) => {
        this.recibos = datos;
      }).catch((e) => console.error(e.message)
      );
    }
  }

  showToast(data) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: data,
      position: 'bottom'
    });
    toast.present();
  }

}
