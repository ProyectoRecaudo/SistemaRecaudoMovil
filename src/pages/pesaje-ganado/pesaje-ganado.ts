import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { AlertController } from 'ionic-angular';
import { PrinterProvider } from '../../providers/printer/printer';
import { commands } from '../../providers/printer/printer-commands';
import { NumbersToLettersProvider } from '../../providers/numbers-to-letters/numbers-to-letters'
import { Storage } from '@ionic/storage';
import { ReciboPage } from '../recibo/recibo';
import { SingletonProvider } from '../../providers/singleton/singleton';




/**
 * Generated class for the PesajeGanadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-pesaje-ganado',
  templateUrl: 'pesaje-ganado.html',
})
export class PesajeGanadoPage {

  //Datos storage
  keyIdentificacion: string = "identiData";
  identiStorage: any = '';
  keyRecaudador: string = "nomRecaudadorData";
  recaudador: any = '';
  keyPlaza: string = "plazaData";
  miplaza: any = '';

  sectores = [];
  sector: any;
  flagNuevo: boolean = true;
  fechaCreacion: any = new Date().toLocaleString();
  fechaModificacion: any = new Date().toLocaleString();

  tercero = {};
  terceros = [];
  tarifa: any = '3000';
  nombretercero: any;
  identificaciontercero: any;
  telefonotercero: any;
  modificaciontercero: any;
  creaciontercero: any;
  valorPagar: any = this.tarifa;

  identificacion: any;
  nombrerecaudador: any;
  apellido: any;

  //Variables para cargar recibo
  reciboPage = ReciboPage;

  recibos: any;
  numRecibo: any = '001';
  totalCuota: any;
  ccUsuario: any;
  plaza: any;
  puesto: any;
  totalAbono: any;
  saldo: any = '0';
  numAbonoFactura: any;
  numAbonoAcuerdo: any;
  mesPago: any;
  fechaAbono: any = new Date().toLocaleString();
  miFecha: any = '';

  //Separador de miles
  DECIMAL_SEPARATOR = ",";
  GROUP_SEPARATOR = ".";
  budget = 0;


  //Guardar recibo
  pkidrecibopuestoeventual: any;
  numerorecibopuestoeventual: any;
  valorecibopuestoeventual: any;
  creacionrecibopuestoeventual: any;
  modificacionrecibopuestoeventual: any;
  fkidtarifapuestoeventual: any;
  fkidtercero: any;
  nombretercero_: any;
  valortarifa: any;
  nombreplaza: any;
  recibopuestoeventualactivo: any;
  nombreusuario: any;
  identificacionusuario: any;
  nombresector: any;
  fkidsector: any;
  sincronizado: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    public databaseprovider: DatabaseProvider,
    public speechRecognition: SpeechRecognition,
    private printer: PrinterProvider,
    private conversion: NumbersToLettersProvider,
    private storage: Storage,
    private singleton: SingletonProvider
  ) {

    //Recupera id recaudador
    this.storage.get(this.keyIdentificacion).then(
      (val) => {
        this.identiStorage = val;
        console.log('Identificacion Storage r: ', this.identiStorage);
      }
    );


    //Recupera nombre y apellido del recaudador
    this.storage.get(this.keyRecaudador).then(
      (val) => {
        this.recaudador = val;
        console.log('Nombre Storage r: ', this.recaudador);
      }
    );

    //Recupera la plaza
    this.storage.get(this.keyPlaza).then(
      (val) => {
        this.miplaza = val;
        //console.log('Plaza Storage', val);
        console.log('Plaza Storage', this.miplaza);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesajeGanadoPage');
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

  buscarTercero() {
    console.log("buscar: ", this.tercero['identificaciontercero']);
    this.databaseprovider.getTercero(this.tercero['identificaciontercero']).then(data => {
      //let terceros = data;
      let identificacion = this.tercero['identificaciontercero'];
      this.flagNuevo = data == null;
      if (this.flagNuevo) {
        this.tercero = { pkidsqlite: -1, nombretercero: null, identificaciontercero: identificacion, telefonotercero: null }
      }
      else {
        this.tercero = data;
      }


      console.log(this.tercero['nombretercero']);

    })
      .catch(error => {
        console.log("No existe, hay que agregarlo!");
      });

    console.log(this.tercero['nombretercero']);

  }

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

  buscarIdTercero() {
    this.buscarTercero();

  }

  loadTercerosData() {
    this.databaseprovider.getAllTerceros().then(data => {

      this.terceros = data;
    })
  }

  //Agrega registros desde el formulario

  addTercero() {
    // this.creaciontercero = this.fechaCreacion;
    // this.modificaciontercero = this.fechaModificacion;
    // this.tercero['creaciontercero'] = this.creaciontercero;
    // this.tercero['modificaciontercero'] = this.modificaciontercero;
    // this.tercero['pkidtercero'] = '-1';
    // this.tercero['tipotercero'] = 'Pesaje';

    // //this.databaseprovider.addTercero(this.tercero['nombretercero'], this.tercero['identificaciontercero'], this.tercero['telefonotercero'], this.tercero['creaciontercero'], this.tercero['modificaciontercero'], this.tercero['pkidtercero'], this.tercero['tipotercero'])
    // this.databaseprovider.addTercero(this.tercero['nombretercero'], this.tercero['identificaciontercero'], this.tercero['telefonotercero'], this.tercero['creaciontercero'], this.tercero['modificaciontercero'], this.tercero['pkidtercero'], this.tercero['tipotercero'])

    //   .then(data => {
    //     this.loadTercerosData();
    //   });
    // this.tercero = {};
  }


  //Editar registros desde el formulario
  updateTercero() {
    this.tercero['modificaciontercero'] = this.fechaModificacion;
    this.databaseprovider.updateTercero(this.tercero['nombretercero'], this.tercero['telefonotercero'], this.tercero['modificaciontercero'], this.tercero['identificaciontercero'])

      .then(data => {
        this.loadTercerosData();
      });
    this.tercero = {};
  }


  //Guarda en la tabla treciboeventual
  guardarRecibo() {

    console.log("flag ", this.flagNuevo);
    if (this.flagNuevo) {
      this.addTercero();
    }
    else {
      this.updateTercero();

    }
    //Recibo guardado en la bd
    this.pkidrecibopuestoeventual = '1';
    this.numerorecibopuestoeventual = '1';
    this.valorecibopuestoeventual = this.valorPagar;
    this.creacionrecibopuestoeventual = this.fechaCreacion;
    this.modificacionrecibopuestoeventual = this.fechaModificacion;
    this.fkidtarifapuestoeventual = '1';
    this.fkidtercero = 1;
    this.nombretercero_ = this.tercero["nombretercero"];
    this.valortarifa = this.tarifa;
    this.nombreplaza = this.miplaza;
    this.recibopuestoeventualactivo = '1';
    this.nombreusuario = this.recaudador;
    this.identificacionusuario = this.identiStorage;
    this.nombresector = 'Sector 1';
    this.fkidsector = '1';
    this.sincronizado = '0';

    this.tercero['pkidrecibopuestoeventual'] = this.pkidrecibopuestoeventual;
    this.tercero['numerorecibopuestoeventual'] = this.numerorecibopuestoeventual;
    this.tercero['valorecibopuestoeventual'] = this.valorecibopuestoeventual;
    this.tercero['creacionrecibopuestoeventual'] = this.creacionrecibopuestoeventual;

    this.tercero['modificacionrecibopuestoeventual'] = this.modificacionrecibopuestoeventual;
    this.tercero['fkidtarifapuestoeventual'] = this.fkidtarifapuestoeventual;
    this.tercero['fkidtercero'] = this.fkidtercero;
    this.tercero['nombretercero'] = this.nombretercero_;

    this.tercero['valortarifa'] = this.valortarifa;
    this.tercero['nombreplaza'] = this.nombreplaza;
    this.tercero['recibopuestoeventualactivo'] = this.recibopuestoeventualactivo;
    this.tercero['nombreusuario'] = this.nombreusuario;

    this.tercero['identificacionusuario'] = this.identificacionusuario;
    this.tercero['nombresector'] = this.nombresector;
    this.tercero['fkidsector'] = this.fkidsector;
    this.tercero['sincronizado'] = this.sincronizado;

    // this.databaseprovider.addReciboEventual(this.tercero['pkidrecibopuestoeventual'], this.tercero['numerorecibopuestoeventual'], this.tercero['valorecibopuestoeventual'], this.tercero['creacionrecibopuestoeventual'], this.tercero['modificacionrecibopuestoeventual'], this.tercero['fkidtarifapuestoeventual'], this.tercero['fkidtercero'], this.tercero['nombretercero'], this.tercero['valortarifa'], this.tercero['nombreplaza'], this.tercero['recibopuestoeventualactivo'], this.tercero['nombreusuario'], this.tercero['identificacionusuario'], this.tercero['nombresector'], this.tercero['fkidsector'], this.tercero['sincronizado']).then(() => {
    //   this.navCtrl.pop();
    // }).catch((error) => console.error(error.message));

    // .then(data => {
    //   this.loadRecibosData();
    // });
    // this.tercero = {};
  }

  guardar() {
    this.navCtrl.push("ReciboPage", { datosRecibo: this.armarRecibo(), callback: this.guardarFunc });
  }

  guardarFunc = (resultado) => {
    return new Promise((resolve, reject) => {
      if (resultado) {
        this.guardarRecibo();
      }
      else {
        console.log("no guardar");
      }
      resolve();
    });
  }

  private armarRecibo() {
    let datos = [];
    let numeroEnLetras = this.conversion.numeroALetras(this.unFormat(this.valorPagar), 0);
    datos.push({ "E": "No Recibo:", "V": this.numRecibo });
    datos.push({ "E": "Tarifa:", "V": this.format(this.tarifa) });
    datos.push({ "E": "Valor pagado:", "V": this.format(this.valorPagar) });
    datos.push({ "E": "En letras:", "V": numeroEnLetras });
    datos.push({ "E": "Usuario:", "V": this.tercero['nombretercero'] });
    datos.push({ "E": "Recaudador:", "V": this.recaudador });
    datos.push({ "E": "Fecha:", "V": new Date().toISOString() });
    return datos;
  }

}
