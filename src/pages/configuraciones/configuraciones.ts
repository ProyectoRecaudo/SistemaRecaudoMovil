import { SincSetProvider } from './../../providers/sinc-set/sinc-set';
import { Component } from '@angular/core';
import { GLOBAL } from './../../providers/fecha/globales';
import { IonicPage, NavController, NavParams, LoadingController, Events, Platform, AlertController, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatabaseProvider } from '../../providers/database/database';
import { PrinterProvider } from '../../providers/printer/printer';
import { SincGetProvider } from '../../providers/sinc-get/sinc-get';

import { Storage } from '@ionic/storage';
import { SingletonProvider } from '../../providers/singleton/singleton';
import { PlazasPage } from '../plazas/plazas';
import { HomePage } from '../home/home';

/**
 * Generated class for the ConfiguracionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-configuraciones',
  templateUrl: 'configuraciones.html',
})
export class ConfiguracionesPage {

  sectores = [];
  usuarios = [];
  plazas = [];
  terceros = [];
  recibos = [];
  tarifaparqueadero = [];
  facturas = [];
  tarifapesaje = [];
  puestos = [];
  puestoseventuales = [];
  tarifavehiculos = [];
  zonas = [];
  tipopuesto = [];
  categoriaanimal = [];
  especieanimal = [];
  

  /* Variables para crear el archivo sql*/
  public pkidtiposector: number;
  public codigotiposector: string;
  public nombretiposector: string;
  public tiposectoractivo: number;
  public creaciontiposector: string;
  public modificaciontiposector: string;
  public descripciontiposector: string;

  //datosServidor: any[]; //descarga los datos de la REST API

  loading: any;

  /**
   * Variables de conexión
   */
  _TOKEN: any = "tokenData"; //Recupera el token guardado en el Storage
  TOKEN: any = '';
  public API_URL: string;
  public headers;
  public flagTercero: string = 'true';



  public sql_tipoSectores: string;
  public sql_usuarios: string;
  public sql_plazas: string;
  public sql_terceros: string;
  /* - Fin -*/

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private databaseprovider: DatabaseProvider,
    private storage: Storage,
    public http: HttpClient,
    public events: Events,
    public loadingCtrl: LoadingController,
    private sincget: SincGetProvider,
    private impresora: PrinterProvider,
    private singleton: SingletonProvider,
    private synset: SincSetProvider
  ) {

    this.API_URL = GLOBAL.url;
    this.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    /**
     * Recupera el token que se generó al inicio de sesión
     */
    this.storage.get(this._TOKEN).then((val) => {
      this.TOKEN = val;
      //console.log('TOKEN STORAGE en configuracion', val);
    });


  }

  dataSQLLocal() {
    this.databaseprovider.fillDatabase();
  }

  //Carga los registros existentes
  listarDatosDB() {

    //Sectores
    this.databaseprovider.getAllSectores().then(data => {
      this.sectores = data;
    })

    //Usuarios
    this.databaseprovider.getAllUsuarios().then(data => {
      this.usuarios = data;
    })

    //Plazas
    this.databaseprovider.getAllPlazas().then(data => {
      this.plazas = data;
    })

    //Terceros
    this.databaseprovider.getAllTerceros().then(data => {
      this.terceros = data;
    })

    //TarifaParqueadero
    this.databaseprovider.getAllTarifaParqueadero().then(data => {
      this.tarifaparqueadero = data;
    })

    //TarifaPesaje
    this.databaseprovider.getAllTarifaPesaje().then(data => {
      this.tarifapesaje = data;
    })

    //TarifaPuesto
    this.databaseprovider.getAllTarifaPuesto().then(data => {
      this.puestos = data;
    })

    //TarifaPuestoEventual
    this.databaseprovider.getAllTarifaPuestoEventual().then(data => {
      this.puestoseventuales = data;
    })

    //TarifaVehiculo
    this.databaseprovider.getAllTarifaVehiculo().then(data => {
      this.tarifavehiculos = data;
    })

    //Zonas
    this.databaseprovider.getAllZonas().then(data => {
      this.zonas = data;
    })

    //TipoPuesto
    this.databaseprovider.getAllTipoPuesto().then(data => {
      this.tipopuesto = data;
    })

    //CategoriaAnimal
    this.databaseprovider.getAllCategoriaAnimal().then(data => {
      this.categoriaanimal = data;
    })

    //EspecieAnimal
    this.databaseprovider.getAllEspecieAnimal().then(data => {
      this.especieanimal = data;
    })

    //Facturas
    this.databaseprovider.getAllFacturas().then(data => {
      this.facturas = data;
    })

    


  }


  /* Creación de Archivo SQL*/

  setOcupado(mensaje: string = 'cargando') {
    this.loading = this.loadingCtrl.create({
      content: mensaje
    });

    this.loading.present();

  }

  setDesocupado() {
    try {
      this.loading.dismiss().catch(() => console.error("dimis"));
    } catch (error) {

    }
  }

  ionViewDidLoad() {

  }

  /**
   * @loadSectores(): Descarga sectores del REST API
   */
  // loadSectores() {
  //   //this.setOcupado('Descargando datos sectores...');

  //   let parametros = 'authorization=' + this.TOKEN;

  //   return new Promise(resolve => {
  //     this.http.post(this.API_URL + 'sector/query', parametros, { headers: this.headers })
  //       .subscribe(res => {
  //         resolve(res);
  //         this.setDesocupado();

  //       }, error => {
  //         console.error(error.message);
  //       });
  //   }).catch(e => { console.error("Error al descargar sectores" + e.message) });
  // }


  /**
   * @loadUsuarios(): Descarga usuarios del REST API
   */
  // loadUsuarios() {
  //   //this.setOcupado('Descargando datos de usuarios...');

  //   let parametros = 'authorization=' + this.TOKEN;

  //   //usuarios
  //   return new Promise(resolve => {
  //     this.http.post(this.API_URL + 'user/query', parametros, { headers: this.headers })
  //       .subscribe(res => {
  //         resolve(res);
  //         this.setDesocupado();

  //       }, error => {
  //         console.error(error.message);
  //       });
  //   }).catch(e => { console.error("Error al descargar usuarios" + e.message) });
  // }

  /**
  * @loadPlazas(): Descarga plazas del REST API
  */
  // loadPlazas() {
  //   //this.setOcupado('Descargando datos de plazas...');

  //   let parametros = 'authorization=' + this.TOKEN;

  //   //usuarios
  //   return new Promise(resolve => {
  //     this.http.post(this.API_URL + 'plaza/query', parametros, { headers: this.headers })
  //       .subscribe(res => {
  //         resolve(res);
  //         this.setDesocupado();

  //       }, error => {
  //         console.error(error.message);
  //       });
  //   }).catch(e => { console.error("Error al descargar plazas" + e.message) });
  // }

  /**
   * @loadTerceros(): Descarga terceros del REST API
   */
  // loadTerceros() {
  //   //this.setOcupado('Descargando datos terceros...');

  //   let parametros = 'authorization=' + this.TOKEN + '&tercero=' + this.flagTercero;

  //   return new Promise(resolve => {
  //     this.http.post(this.API_URL + 'asignaciondependiente/query', parametros, { headers: this.headers })
  //       .subscribe(res => {
  //         resolve(res);
  //         //console.log("RESPUESTA: ", res.status);

  //         this.setDesocupado();

  //       }, error => {
  //         console.error(error.message);
  //       });
  //   }).catch(e => { console.error("Error al descargar terceros" + e.message) });
  // }

  traerDatos() {
    if (this.singleton.TOKEN) {
      this.getDataApi();
    }
    else {
      this.navCtrl.push(HomePage, { getAuth: true, callback: this.traerDatosAuth });
    }
  }

  traerDatosAuth = (resultado) => {
    return new Promise((resolve, reject) => {
      if (resultado) {
        this.getDataApi();
      }
      else {
        console.log("no imprimir");
      }

      resolve();
    });
  }

  getDataApi() {


    this.setOcupado('Importando BD');
    let aux = this.sincget.prepararSinc().subscribe((listo) => {
      try {

        if (listo) {
          aux.unsubscribe();

          this.getSectores();
          this.getUsuarios();
          this.getPlazas();
          this.getTerceros();
          this.getTarifaParqueadero();
          this.getTarifaPesaje();
          // this.getTarifaPuesto();
          // this.getTarifaPuestoEventual();
          this.getTarifaVehiculo();
          this.getZonas();
          this.getTipoPuesto();
          this.getCategoriaAnimal();
          this.getEspecieAnimal();
          this.getFacturas();

          this.setDesocupado();
        }
      } catch (error) {

      }

    });

  }

  /**
   * Trae los datos desde el API con (loadSectores();), 
   * los guarda en la variable sql_tipoSector 
   * y posteriormente crea el archivo RecaudoDB.sql el cual contiene la creación y los insert de la tabla tipo sector
   */
  getSectores() {
    console.log("inició a descargar sectores");

    this.sincget.loadSectores().then(() => {
      console.log("bien sectores");
    }).catch((err) => console.error(err.message));

  }

  getUsuarios() {
    //Usuarios
    console.log("inició a descargar Usuarios");
    this.sincget.loadUsuarios().then(() => {
      console.log("bien usuarios");
    }).catch((err) => console.error(err.message));

  }

  getPlazas() {
    console.log("inició a descargar plazas");

    this.sincget.loadPlazas().then(() => {
      console.log("bien plazaloadPlazas");
    }).catch((err) => console.error(err.message));
  }

  getTerceros() {
    console.log("inició a descargar terceros");
    this.sincget.loadTerceros().then(() => {
      console.log("bien terloadTerceros");
    }).catch((err) => console.error(err.message));
  }

  getTarifaParqueadero() {
    console.log("inició a descargar tarifa parqueaderos");
    this.sincget.loadTarifaParqueadero().then(() => {
      console.log("bien loadTarifaParqueadero");
    }).catch((err) => console.error(err.message));
  }

  getTarifaPesaje() {
    console.log("inició a descargar tarifa pesaje");
    this.sincget.loadTarifaPesaje().then(() => {
      console.log("bien loadTarifaPesaje");
    }).catch((err) => console.error(err.message));
  }
  
  
  // getTarifaPuesto() {
  //   console.log("inició a descargar tarifa puesto");
  //   this.sincget.loadTarifaPuesto().then(() => {
  //     console.log("bien loadTarifaPuesto");
  //   }).catch((err) => console.error(err.message));
  // }
  
  // getTarifaPuestoEventual() {
  //   console.log("inició a descargar tarifa puesto eventual");
  //   this.sincget.loadTarifaPuestoEventual().then(() => {
  //     console.log("bien loadTarifaPuestoEventual");
  //   }).catch((err) => console.error(err.message));
  // }
  
  getTarifaVehiculo() {
    console.log("inició a descargar tarifa vehiculo");
    this.sincget.loadTarifaVehiculo().then(() => {
      console.log("bien loadTarifaVehiculo");
    }).catch((err) => console.error(err.message));
  }
  
  
  getZonas() {
    console.log("inició a descargar zonas");
    this.sincget.loadZonas().then(() => {
      console.log("bien loadZonas");
    }).catch((err) => console.error(err.message));
  }
  
  getTipoPuesto() {
    console.log("inició a descargar tipo puesto");
    this.sincget.loadTipoPuestos().then(() => {
      console.log("bien loadTipoPuesto");
    }).catch((err) => console.error(err.message));
  }
  
  getCategoriaAnimal() {
    console.log("inició a descargar categoria animal");
    this.sincget.loadCategoriaAnimales().then(() => {
      console.log("bien loadCategoriaAnimales");
    }).catch((err) => console.error(err.message));
  }
  
   getEspecieAnimal() {
    console.log("inició a descargar especie animal");
    this.sincget.loadEspecieAnimal().then(() => {
      console.log("bien loadEspecieAnimal");
    }).catch((err) => console.error(err.message));
  }

  getFacturas() {
    console.log("inició a descargar facturas");
    this.sincget.loadFacturas().then(() => {
      console.log("bien facturas");
    }).catch((err) => console.error(err.message));
  }

  backup() {
    this.databaseprovider.backup();
  }


  restore() {
    this.databaseprovider.restore();
  }

  configurarImpresora() {
    this.impresora.seleccionarImpresora(null, this.alertCtrl, this.loadCtrl, this.toastCtrl, false);
  }

  n() {
    console.log("VER TOKEN: ", this.TOKEN);

  }

  empezar() {
    this.databaseprovider.existenPlazas().then((existen) => {
      if (existen) {
        this.navCtrl.setRoot(PlazasPage);
      }
      else {
        this.showToast("Debe sincronizar las tablas base.");
      }
    });
  }

  showToast(data) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: data,
      position: 'bottom'
    });
    toast.present();
  }



  enviarDatos() {
    if (this.singleton.TOKEN) {
      this.synset.uploadReciboEventual();
    }
    else {
      this.navCtrl.push(HomePage, { getAuth: true, callback: this.enviarDatosAuth });
    }
  }

  enviarDatosAuth = (resultado) => {
    return new Promise((resolve, reject) => {
      if (resultado) {
        this.synset.uploadReciboEventual();
      }
      else {
        console.log("no imprimir");
      }

      resolve();
    });
  }

  listarDatosCargador() {

    //Recibos
    this.databaseprovider.getAllRecibosEventuales().then(data => {
      this.recibos = data;
    })
  }


  // authorization
  // http://contalentosas.com/SistemaRecaudoBackend/web/app_dev.php/plaza/query
  // http://contalentosas.com/SistemaRecaudoBackend/web/app_dev.php/user/query
  // http://contalentosas.com/SistemaRecaudoBackend/web/app_dev.php/login
  // http://contalentosas.com/SistemaRecaudoBackend/web/app_dev.php/sector/query
  // http://contalentosas.com/SistemaRecaudoBackend/web/app_dev.php/configuracion/query
  // http://contalentosas.com/SistemaRecaudoBackend/web/app_dev.php/user/query
  //http://contalentosas.com/SistemaRecaudoBackend/web/app_dev.php/asignaciondependiente/query  --tercero: true
  //http://contalentosas.com/SistemaRecaudoBackend/web/app_dev.php/tarifapuestoeventual/query



}
