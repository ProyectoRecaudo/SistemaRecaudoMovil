import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DatabaseProvider } from './../../providers/database/database';
import { GLOBAL } from './../../providers/fecha/globales';
import { ApiServicesProvider } from '../../providers/api-services/api-services';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { MenuPrincipalPage } from '../menu-principal/menu-principal';
import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';
import { ConfiguracionesPage } from '../configuraciones/configuraciones';
import { SingletonProvider } from '../../providers/singleton/singleton';

/**
 * Generated class for the PlazasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-plazas',
  templateUrl: 'plazas.html',
})
export class PlazasPage {

  usuario = {};
  usuarios = [];
  plazas = [];
  sectores = [];

  plaza = null;
  sector = null;
  keyPlaza: string = "plazaData";
  keySector: string = "sectorData";

  loading: any; //Mensaje de carga

  _TOKEN: any = "tokenData"; //Recupera el token guardado en el Storage
  TOKEN: any;
  public API_URL: string;
  public headers;

  usuariosData: any[]; //descarga los datos de la REST API

  /* Variables para crear el archivo sql*/
  public pkidusuario: number;
  public nombreusuario: string;
  public mensajeError: string = '';
  public contrasenia: string;
  public apellido: number;
  public identificacion: string;
  public codigousuario: string;
  public rutaimagen: string;
  public usuarioactivo: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public apiServices: ApiServicesProvider,
    public databaseprovider: DatabaseProvider,
    public http: HttpClient, private platform: Platform,
    private singleton: SingletonProvider
  ) {
    this.API_URL = GLOBAL.url;
    this.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    /**
     * Recupera el token que se generó al inicio de sesión
     */
    this.storage.get(this._TOKEN).then((val) => {
      this.TOKEN = val;
      //console.log('TOKEN STORAGE en plaza', val);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlazasPage');
    // plazas
    // this.plaza=this.singleton.plaza;
    // this.sector=this.singleton.sector;
    this.platform.ready().then(() => this.getPlazas());

  }

  
  /**
   * 
   * @param mensaje recibe el mensaje que se mostrará en el loadingController
   */
  setOcupado(mensaje: string = 'cargando') {
    this.loading = this.loadingCtrl.create({
      content: mensaje
    });

    this.loading.present();

  }

  /**
   * Destruye el loading al obtener una respuesta
   */
  setDesocupado() {
    this.loading.dismiss();
  }

  /**
   * Guarda la plaza seleccionada a recaudar en el storage
   */
  seleccionarPlaza() {
    this.mensajeError = '';
    //this.storage.set(this.keyPlaza, this.plaza);
    this.singleton.plaza = this.plaza;
    console.log("Plaza Storange: " + this.plaza["nombreplaza"]);
    this.cargarSectores();
    // this.navCtrl.push(MenuPrincipalPage);

  }

  cargarSectores() {

    this.sectores = [];
    this.databaseprovider.getSectoresByPlaza(this.plaza["pkidplaza"]).then((sectoress) => {

      this.singleton.sectoresPlaza = sectoress;
      this.sectores = sectoress;
      if (this.sectores.length == 0) {
        this.mensajeError = "La plaza seleccionada no tiene sectores. Por favor comuníquese con el administrador.";
        console.error(this.mensajeError);

      }
    });
  }

  /**
   * Navega a la pagina HomePage
   */
  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }



  goToConfiguracion() {
    this.navCtrl.push(ConfiguracionesPage);
  }

  goToMenu() {
    this.mensajeError='';
    if (this.sector) {
      this.singleton.sector = this.sector;
      console.log("sector seleccionado: ", this.sector["nombresector"]);
      this.navCtrl.push(MenuPrincipalPage);
    }
    else
    {
      this.mensajeError = "Debe seleccionar un sector. Si la plaza no tiene sectores por favor comuníquese con el administrador.";
    }
    
  }

  getPlazas() {
    this.databaseprovider.getAllPlazas().then(data => {

      if (data) {
        this.plazas = data;
        this.plaza = this.plazas[0];
        this.singleton.plazas = this.plazas;
        console.log("plazas en plazas: ", this.plazas.length);
        this.seleccionarPlaza();
      }
      else {
        this.plazas = [{ "nombreplaza": "Debe cargar plazas", "pkidsqlite": -1 }];
      }
    })
  }

}
