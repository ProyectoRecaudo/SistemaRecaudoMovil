import { Injectable } from '@angular/core';
import { GLOBAL } from './../../providers/fecha/globales';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from '../../providers/database/database';
import { SingletonProvider } from '../singleton/singleton';

/*
  Generated class for the SincGetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SincGetProvider {

  /**
   * Variables de conexión
   */
  _TOKEN: any = "tokenData"; //Recupera el token guardado en el Storage

  public API_URL: string;
  public headers;
  public flagTercero: string = 'true';



  public sql_tipoSectores: string;
  public sql_usuarios: string;
  public sql_plazas: string;
  public sql_terceros: string;
  public sql_factura: string;
  public sql_tarifaparqueadero: string;
  public sql_tarifapesaje: string;
  public sql_tarifapuesto: string;
  public sql_tarifapuestoeventual: string;
  public sql_tarifavehiculo: string;
  public sql_zonas: string;
  public sql_tipoPuestos: string;
  public sql_categoriaAnimal: string;
  public sql_especieAnimal: string;
  /* - Fin -*/

  constructor(private databaseprovider: DatabaseProvider,
    private storage: Storage,
    public http: HttpClient,
    private singleton: SingletonProvider) {
    this.API_URL = GLOBAL.url;
    this.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    /**
     * Recupera el token que se generó al inicio de sesión
     */
    // this.storage.get(this._TOKEN).then((val) => {
    //   this.singleton.TOKEN = val;
    //   //console.log('TOKEN STORAGE en configuracion', val);
    // });

  }

  prepararSinc() {
    this.databaseprovider.crearEstructura();
    return this.databaseprovider.crearEstructuraReady;
  }

  /**
   * @loadUsuarios(): Descarga usuarios del REST API
   */
  loadUsuarios() {
    //this.setOcupado('Descargando datos de usuarios...');

    let parametros = 'authorization=' + this.singleton.TOKEN + "&activo=true";

    //usuarios
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + 'user/query', parametros, { headers: this.headers })
        .subscribe(res => {
          if (res["status"] != "error") {
            let datosServidor = res['users']; //"users" key del Json

            let ContadorLongitud = datosServidor.length;
            console.log("Longitud: " + ContadorLongitud);

            this.sql_usuarios = '';

            datosServidor.forEach(elemento => {
              this.sql_usuarios += "INSERT INTO tusuario (pkidusuario, identificacion,nombreusuario,apellido,usuarioactivo,fkidrol,contrasenia,rutaimagen, numerorecibo) VALUES ("
                + "" + elemento.pkidusuario + ", "
                + "'" + elemento.identificacion + "',"
                + "'" + elemento.nombreusuario + "',"
                + "'" + elemento.apellido + "',"
                + "'" + elemento.usuarioactivo + "',"
                + "'" + elemento.fkidrol + "',"
                + "'" + elemento.contrasenia + "',"
                + "'" + elemento.rutaimagen + "',"
                + "'" + elemento.numerorecibo + "');"
            });

            console.log("termino de armar archivo usuarios");

            this.databaseprovider.fillDatabase(this.sql_usuarios);
            resolve(res);

          }
          else {
            reject("error")
          }
        }, error => {
          console.error(error.message);
        });
    }).catch(e => {
      console.error("Error al descargar usuarios" + e.message)
    });
  }

  /**
   * @loadSectores(): Descarga sectores del REST API
   */
  loadSectores() {

    let parametros = 'authorization=' + this.singleton.TOKEN; //+ "&activo=true";

    return new Promise(resolve => {
      this.http.post(this.API_URL + 'sector/query', parametros, { headers: this.headers })
        .subscribe(res => {
          if (res["status"] != "error") {
            let datosServidor = res['sector']; //"sector" key del Json

            let ContadorLongitud = datosServidor.length;
            console.log("Longitud: " + ContadorLongitud);

            this.sql_tipoSectores = '';

            datosServidor.forEach(elemento => {
              this.sql_tipoSectores += "INSERT INTO tsector ( pkidsector, nombresector, fkidplaza, fkidtiposector) VALUES (" +
                "" + elemento.pkidsector + ", " +
                "'" + elemento.nombresector + "', " +
                "'" + elemento.fkidplaza + "', " +
                "'" + elemento.fkidtiposector + "'); ";
            });

            console.log("termino de armar archivo sectores");

            this.databaseprovider.fillDatabase(this.sql_tipoSectores);
            resolve(res);
          }

        }, error => {
          console.error(error.message);
        });
    }).catch(e => {
      console.error("Error al descargar sectores" + e.message)
    });
  }

  /**
  * @loadPlazas(): Descarga plazas del REST API
  */
  loadPlazas() {
    //this.setOcupado('Descargando datos de plazas...');

    let parametros = 'authorization=' + this.singleton.TOKEN + "&activo=true";


    //usuarios
    return new Promise(resolve => {


      this.http.post(this.API_URL + 'plaza/query', parametros, { headers: this.headers })
        .subscribe(res => {
          if (res["status"] != "error") {
            let datosServidor = res['plaza']; //"plaza" key del Json

            let ContadorLongitud = datosServidor.length;
            console.log("Longitud: " + ContadorLongitud);

            this.sql_plazas = '';

            datosServidor.forEach(elemento => {
              this.sql_plazas += "INSERT INTO tplaza (pkidplaza, nombreplaza) VALUES ("
                + "" + elemento.pkidplaza + ","
                + "'" + elemento.nombreplaza + "');"

            });
            console.log("termino de armar archivo plazas");

            this.databaseprovider.fillDatabase(this.sql_plazas);
            resolve(res);
          }

        }, error => {
          console.error(error.message);
        });
    }).catch(e => {
      console.error("Error al descargar plazas" + e.message)
    });
  }

  /**
     * @loadTerceros(): Descarga terceros del REST API
     */
  loadTerceros() {
    //this.setOcupado('Descargando datos terceros...');

    let parametros = 'authorization=' + this.singleton.TOKEN + '&tercero=' + this.flagTercero;

    return new Promise(resolve => {
      this.http.post(this.API_URL + 'asignaciondependiente/query', parametros, { headers: this.headers })
        .subscribe(res => {
          if (res["status"] != "error") {
            let datosServidor = res['tercero']; //"tercero" key del Json

            let ContadorLongitud = datosServidor.length;
            console.log("Longitud: " + ContadorLongitud);

            this.sql_terceros = '';

            datosServidor.forEach(elemento => {
              this.sql_terceros += "INSERT INTO ttercero (nombretercero, identificaciontercero, telefonotercero, creaciontercero, modificaciontercero, pkidtercero, tipotercero) VALUES ("
                + "'" + elemento.nombretercero + "',"
                + "'" + elemento.identificaciontercero + "',"
                + "'" + elemento.telefonotercero + "',"
                + "'" + elemento.creaciontercero + "',"
                + "'" + elemento.modificaciontercero + "',"
                + "" + elemento.pkidtercero + ","
                + "'" + elemento.tipotercero + "');"

            });
            console.log("termino de armar archivo terceros");

            this.databaseprovider.fillDatabase(this.sql_terceros);
            resolve(res);
          }

        }, error => {
          console.error(error.message);
        });
    }).catch(e => {
      console.error("Error al descargar terceros" + e.message)
    });
  }


  
  /**
   * @loadTarifaParqueadero(): Descarga TarifaParqueadero del REST API
   */
  loadTarifaParqueadero() {

    let parametros = 'authorization=' + this.singleton.TOKEN; //+ "&activo=true";

    return new Promise(resolve => {
      this.http.post(this.API_URL + 'tarifaparqueadero/query', parametros, { headers: this.headers })
        .subscribe(res => {
          if (res["status"] != "error") {
            let datosServidor = res['tarifaparqueadero']; //"tarifaparqueadero" key del Json

            let ContadorLongitud = datosServidor.length;
            console.log("Longitud: " + ContadorLongitud);

            this.sql_tarifaparqueadero= '';

            datosServidor.forEach(elemento => {
              this.sql_tarifaparqueadero += "INSERT INTO ttarifaparqueadero ( pkidtarifaparqueadero, valortarifaparqueadero, descripciontarifaparqueadero, numeroresoluciontarifaparqueadero, documentoresoluciontarifaparqueadero, craciontarifaparqueadero, modificaciontarifaparqueadero, tarifaparqueaderoactivo, valorincrementoporcentual, fkidtipoparqueadero, fkidplaza) VALUES (" +
                "" + elemento.pkidtarifaparqueadero + ", " +
                "'" + elemento.valortarifaparqueadero + "', " +
                "'" + elemento.descripciontarifaparqueadero + "', " +
                "'" + elemento.numeroresoluciontarifaparqueadero + "', " +
                "'" + elemento.documentoresoluciontarifaparqueadero + "', " +
                "'" + elemento.craciontarifaparqueadero + "', " +
                "'" + elemento.modificaciontarifaparqueadero + "', " +
                "'" + elemento.tarifaparqueaderoactivo + "', " +
                "'" + elemento.valorincrementoporcentual + "', " +
                "'" + elemento.fkidtipoparqueadero + "', " +
                "'" + elemento.fkidplaza + "'); ";
            });

            console.log("termino de armar archivo tarifaparqueadero");

            this.databaseprovider.fillDatabase(this.sql_tarifaparqueadero);
            resolve(res);
          }

        }, error => {
          console.error(error.message);
        });
    }).catch(e => {
      console.error("Error al descargar tarifaparqueadero" + e.message)
    });
  }


  /**
   * @loadTarifaPesaje(): Descarga TarifaPesaje del REST API
   */
  loadTarifaPesaje() {

    let parametros = 'authorization=' + this.singleton.TOKEN; //+ "&activo=true";

    return new Promise(resolve => {
      this.http.post(this.API_URL + 'tarifapesaje/query', parametros, { headers: this.headers })
        .subscribe(res => {
          if (res["status"] != "error") {
            let datosServidor = res['tarifapesaje']; //"tarifapesaje" key del Json

            let ContadorLongitud = datosServidor.length;
            console.log("Longitud: " + ContadorLongitud);

            this.sql_tarifapesaje= '';

            datosServidor.forEach(elemento => {
              this.sql_tarifapesaje += "INSERT INTO ttarifapesaje ( pkidtarifapesaje, valortarifapesaje, numeroresoluciontarifapesaje, documentoresoluciontarifapesaje, creaciontarifapesaje, modificaciontarifapesaje, fkidplaza, tarifapesajeactivo, valorincrementoporcentual, descripciontarifapesaje) VALUES (" +
                "" + elemento.pkidtarifapesaje + ", " +
                "'" + elemento.valortarifapesaje + "', " +
                "'" + elemento.numeroresoluciontarifapesaje + "', " +
                "'" + elemento.documentoresoluciontarifapesaje + "', " +
                "'" + elemento.creaciontarifapesaje + "', " +
                "'" + elemento.modificaciontarifapesaje + "', " +
                "'" + elemento.fkidplaza + "', " +
                "'" + elemento.tarifapesajeactivo + "', " +
                "'" + elemento.valorincrementoporcentual + "', " +
                "'" + elemento.descripciontarifapesaje + "'); ";
            });

            console.log("termino de armar archivo tarifapesaje");

            this.databaseprovider.fillDatabase(this.sql_tarifapesaje);
            resolve(res);
          }

        }, error => {
          console.error(error.message);
        });
    }).catch(e => {
      console.error("Error al descargar tarifapesaje" + e.message)
    });
  }

  /**
   * @loadTarifaPuesto(): Descarga tarifapuesto del REST API
   */
  // loadTarifaPuesto() {

  //   let parametros = 'authorization=' + this.singleton.TOKEN; //+ "&activo=true";

  //   return new Promise(resolve => {
  //     this.http.post(this.API_URL + 'tarifapuesto/query', parametros, { headers: this.headers })
  //       .subscribe(res => {
  //         if (res["status"] != "error") {
  //           let datosServidor = res['tarifapuesto']; //"tarifapuesto" key del Json

  //           let ContadorLongitud = datosServidor.length;
  //           console.log("Longitud: " + ContadorLongitud);

  //           this.sql_tarifapuesto= '';

  //           datosServidor.forEach(elemento => {
  //             this.sql_tarifapuesto += "INSERT INTO ttarifapuesto ( pkidtarifapuesto, valortarifapuesto, creaciontarifapuesto, modificaciontarifapuesto, numeroresoluciontarifapuesto, documentoresoluciontarifapuesto, tarifapuestoactivo, valorincrementoporcentual, fkidplaza) VALUES (" +
  //               "" + elemento.pkidtarifapuesto + ", " +
  //               "'" + elemento.valortarifapuesto + "', " +
  //               "'" + elemento.creaciontarifapuesto + "', " +
  //               "'" + elemento.modificaciontarifapuesto + "', " +
  //               "'" + elemento.numeroresoluciontarifapuesto + "', " +
  //               "'" + elemento.documentoresoluciontarifapuesto + "', " +
  //               "'" + elemento.tarifapuestoactivo + "', " +
  //               "'" + elemento.valorincrementoporcentual + "', " +
  //               "'" + elemento.fkidplaza + "'); ";
  //           });

  //           console.log("termino de armar archivo tarifapuesto");

  //           this.databaseprovider.fillDatabase(this.sql_tarifapuesto);
  //           resolve(res);
  //         }

  //       }, error => {
  //         console.error(error.message);
  //       });
  //   }).catch(e => {
  //     console.error("Error al descargar tarifapuesto" + e.message)
  //   });
  // }

  /**
   * @loadTarifaPuestoEventual(): Descarga tarifapuestoEventual del REST API
   */
  // loadTarifaPuestoEventual() {

  //   let parametros = 'authorization=' + this.singleton.TOKEN; //+ "&activo=true";

  //   return new Promise(resolve => {
  //     this.http.post(this.API_URL + 'tarifapuestoeventual/query', parametros, { headers: this.headers })
  //       .subscribe(res => {
  //         if (res["status"] != "error") {
  //           let datosServidor = res['tarifapuestoeventual']; //"tarifapuestoeventual" key del Json

  //           let ContadorLongitud = datosServidor.length;
  //           console.log("Longitud: " + ContadorLongitud);

  //           this.sql_tarifapuestoeventual= '';

  //           datosServidor.forEach(elemento => {
  //             this.sql_tarifapuestoeventual += "INSERT INTO ttarifapuestoeventual ( pkidtarifapuestoeventual, valortarifapuestoeventual, descripciontarifapuestoeventual, numeroresoluciontarifapuestoeventual, documentoresoluciontarifapuestoeventual, documentoresoluciontarifapuesto, craciontarifapuestoeventual, modificaciontarifapuestoeventual, fkidplaza, tarifapuestoeventualactivo, valorincrementoporcentual) VALUES (" +
  //               "" + elemento.pkidtarifapuestoeventual + ", " +
  //               "'" + elemento.valortarifapuestoeventual + "', " +
  //               "'" + elemento.descripciontarifapuestoeventual + "', " +
  //               "'" + elemento.numeroresoluciontarifapuestoeventual + "', " +
  //               "'" + elemento.documentoresoluciontarifapuestoeventual + "', " +
  //               "'" + elemento.documentoresoluciontarifapuesto + "', " +
  //               "'" + elemento.craciontarifapuestoeventual + "', " +
  //               "'" + elemento.modificaciontarifapuestoeventual + "', " +
  //               "'" + elemento.fkidplaza + "', " +
  //               "'" + elemento.tarifapuestoeventualactivo + "', " +
  //               "'" + elemento.valorincrementoporcentual + "'); ";
  //           });

  //           console.log("termino de armar archivo tarifapuestoeventual");

  //           this.databaseprovider.fillDatabase(this.sql_tarifapuestoeventual);
  //           resolve(res);
  //         }

  //       }, error => {
  //         console.error(error.message);
  //       });
  //   }).catch(e => {
  //     console.error("Error al descargar tarifapuestoeventual" + e.message)
  //   });
  // }

  /**
   * @loadTarifaVehiculo(): Descarga TarifaVehiculo del REST API
   */
  loadTarifaVehiculo() {

    let parametros = 'authorization=' + this.singleton.TOKEN; 

    return new Promise(resolve => {
      this.http.post(this.API_URL + 'tarifavehiculo/query', parametros, { headers: this.headers })
        .subscribe(res => {
          if (res["status"] != "error") {
            let datosServidor = res['tarifavehiculo']; //"tarifavehiculo" key del Json

            let ContadorLongitud = datosServidor.length;
            console.log("Longitud: " + ContadorLongitud);

            this.sql_tarifavehiculo= '';

            datosServidor.forEach(elemento => {
              this.sql_tarifavehiculo += "INSERT INTO ttarifavehiculo ( pkidtarifavehiculo, valortarifavehiculo, descripciontarifavehiculo, craciontarifavehiculo, modificaciontarifavehiculo, numeroresoluciontarifavehiculo, documentoresoluciontarifavehiculo, fkidtipovehiculo, fkidplaza, tarifavehiculoactivo, valorincrementoporcentual) VALUES (" +
                "" + elemento.pkidtarifavehiculo + ", " +
                "'" + elemento.valortarifavehiculo + "', " +
                "'" + elemento.descripciontarifavehiculo + "', " +
                "'" + elemento.craciontarifavehiculo + "', " +
                "'" + elemento.modificaciontarifavehiculo + "', " +
                "'" + elemento.numeroresoluciontarifavehiculo + "', " +
                "'" + elemento.documentoresoluciontarifavehiculo + "', " +
                "'" + elemento.fkidtipovehiculo + "', " +
                "'" + elemento.fkidplaza + "', " +
                "'" + elemento.tarifavehiculoactivo + "', " +
                "'" + elemento.valorincrementoporcentual + "'); ";
            });

            console.log("termino de armar archivo tarifavehiculo");

            this.databaseprovider.fillDatabase(this.sql_tarifavehiculo);
            resolve(res);
          }

        }, error => {
          console.error(error.message);
        });
    }).catch(e => {
      console.error("Error al descargar tarifavehiculo" + e.message)
    });
  }

  /**
   * @loadFactura(): Descarga factura del REST API
   */
  loadFacturas() {

    let parametros = 'authorization=' + this.singleton.TOKEN;

    return new Promise(resolve => {
      this.http.post(this.API_URL + 'recaudo/query', parametros, { headers: this.headers })
        .subscribe(res => {
          if (res["status"] != "error") {
            let datosServidor = res['factura']; //"factura" key del Json

            let ContadorLongitud = datosServidor.length;
            console.log("Longitud: " + ContadorLongitud);

            this.sql_factura= '';

            datosServidor.forEach(elemento => {
              this.sql_factura += "INSERT INTO tfactura ( pkidfactura, numerofactura, nombrebeneficiario, identificacionbeneficiario, deudatotal, tarifapuesto, numeroacuerdo, valorcuotaacuerdo, valormultas, valorinteres, mesfactura, creacionfactura, modificacionfactura, fkidasignacionpuesto, facturapagada, saldoasignacion, saldomultas, mesfacturaletras, year, saldoacuerdo, nombrepuesto, fkidplaza, fkidzona, fkidsector, nombreplaza, nombrezona, nombresector, totalpagado, mesfacturanumero, fkidpuesto, fkidacuerdo, cuotasincumplidas, cuotaspagadas, totalapagarmes, fechapagototal, saldodeuda, saldodeudaacuerdo, saldoporpagar, debermes, deberyear, facturaactivo, abonototalacuerdo, abonocuotaacuerdo, abonodeudaacuerdo, abonodeuda, abonomultas, abonocuotames) VALUES (" +
                "" + elemento.pkidfactura + ", " +
                "'" + elemento.numerofactura + "', " +
                "'" + elemento.nombrebeneficiario + "', " +
                "'" + elemento.identificacionbeneficiario + "', " +
                "'" + elemento.deudatotal + "', " +
                "'" + elemento.tarifapuesto + "', " +
                "'" + elemento.numeroacuerdo + "', " +
                "'" + elemento.valorcuotaacuerdo + "', " +
                "'" + elemento.valormultas + "', " +
                "'" + elemento.valorinteres + "', " +
                "'" + elemento.mesfactura + "', " +
                "'" + elemento.creacionfactura + "', " +
                "'" + elemento.modificacionfactura + "', " +
                "'" + elemento.fkidasignacionpuesto + "', " +
                "'" + elemento.facturapagada + "', " +
                "'" + elemento.saldoasignacion + "', " +
                "'" + elemento.saldomultas + "', " +
                "'" + elemento.mesfacturaletras + "', " +
                "'" + elemento.year + "', " +
                "'" + elemento.saldoacuerdo + "', " +
                "'" + elemento.nombrepuesto + "', " +
                "'" + elemento.fkidplaza + "', " +
                "'" + elemento.fkidzona + "', " +
                "'" + elemento.fkidsector + "', " +
                "'" + elemento.nombreplaza + "', " +
                "'" + elemento.nombrezona + "', " +
                "'" + elemento.nombresector + "', " +
                "'" + elemento.totalpagado + "', " +
                "'" + elemento.mesfacturanumero + "', " +
                "'" + elemento.fkidpuesto + "', " +
                "'" + elemento.fkidacuerdo + "', " +
                "'" + elemento.cuotasincumplidas + "', " +
                "'" + elemento.cuotaspagadas + "', " +
                "'" + elemento.totalapagarmes + "', " +
                "'" + elemento.fechapagototal + "', " +
                "'" + elemento.saldodeuda + "', " +
                "'" + elemento.saldodeudaacuerdo + "', " +
                "'" + elemento.saldoporpagar + "', " +
                "'" + elemento.debermes + "', " +
                "'" + elemento.deberyear + "', " +
                "'" + elemento.facturaactivo + "', " +
                "'" + elemento.abonototalacuerdo + "', " +
                "'" + elemento.abonocuotaacuerdo + "', " +
                "'" + elemento.abonodeudaacuerdo + "', " +
                "'" + elemento.abonodeuda + "', " +
                "'" + elemento.abonomultas + "', " +
                "'" + elemento.abonocuotames + "'); ";
            });

            console.log("termino de armar archivo factura");

            this.databaseprovider.fillDatabase(this.sql_factura);
            resolve(res);
          }

        }, error => {
          console.error(error.message);
        });
    }).catch(e => {
      console.error("Error al descargar factura" + e.message)
    });
  }

   /**
   * @loadZonas(): Descarga Zonas del REST API
   */
  loadZonas() {

    let parametros = 'authorization=' + this.singleton.TOKEN; //+ "&activo=true";

    return new Promise(resolve => {
      this.http.post(this.API_URL + 'zona/query', parametros, { headers: this.headers })
        .subscribe(res => {
          if (res["status"] != "error") {
            let datosServidor = res['zonas']; //"zonas" key del Json

            let ContadorLongitud = datosServidor.length;
            console.log("Longitud: " + ContadorLongitud);

            this.sql_zonas= '';

            datosServidor.forEach(elemento => {
              this.sql_zonas += "INSERT INTO tzona ( pkidzona, codigozona, nombrezona, zonaactivo, creacionzona, modificacionzona, fkidplaza, fkidusuario) VALUES (" +
                "" + elemento.pkidzona + ", " +
                "'" + elemento.codigozona + "', " +
                "'" + elemento.nombrezona + "', " +
                "'" + elemento.zonaactivo + "', " +
                "'" + elemento.creacionzona + "', " +
                "'" + elemento.modificacionzona + "', " +
                "'" + elemento.fkidplaza + "', " +
                "'" + elemento.fkidusuario + "'); ";
            });

            console.log("termino de armar archivo Zonas");

            this.databaseprovider.fillDatabase(this.sql_zonas);
            resolve(res);
          }

        }, error => {
          console.error(error.message);
        });
    }).catch(e => {
      console.error("Error al descargar Zonas" + e.message)
    });
  }


  /**
   * @loadPuestos(): Descarga Puestos del REST API
   */
  loadTipoPuestos() {

    let parametros = 'authorization=' + this.singleton.TOKEN; //+ "&activo=true";

    return new Promise(resolve => {
      this.http.post(this.API_URL + 'tipopuesto/query', parametros, { headers: this.headers })
        .subscribe(res => {
          if (res["status"] != "error") {
            let datosServidor = res['tipopuesto']; //"tipopuesto" key del Json

            let ContadorLongitud = datosServidor.length;
            console.log("Longitud: " + ContadorLongitud);

            this.sql_tipoPuestos= '';

            datosServidor.forEach(elemento => {
              this.sql_tipoPuestos += "INSERT INTO ttipopuesto ( codigotipopuesto, nombretipopuesto, descripciontipopuesto, tipopuestoactivo, creaciontipopuesto, modificaciontipopuesto, pkidtipopuesto) VALUES (" +
                "" + elemento.codigotipopuesto + ", " +
                "'" + elemento.nombretipopuesto + "', " +
                "'" + elemento.descripciontipopuesto + "', " +
                "'" + elemento.tipopuestoactivo + "', " +
                "'" + elemento.creaciontipopuesto + "', " +
                "'" + elemento.modificaciontipopuesto + "', " +
                "'" + elemento.pkidtipopuesto + "'); ";
            });

            console.log("termino de armar archivo tipopuesto");

            this.databaseprovider.fillDatabase(this.sql_tipoPuestos);
            resolve(res);
          }

        }, error => {
          console.error(error.message);
        });
    }).catch(e => {
      console.error("Error al descargar tipopuesto" + e.message)
    });
  }

  /**
   * @loadCategoriaAnimales(): Descarga Categoria Animal del REST API
   */
  loadCategoriaAnimales() {

    let parametros = 'authorization=' + this.singleton.TOKEN; //+ "&activo=true";

    return new Promise(resolve => {
      this.http.post(this.API_URL + 'categoriaanimal/query', parametros, { headers: this.headers })
        .subscribe(res => {
          if (res["status"] != "error") {
            let datosServidor = res['categoriaanimal']; //"categoriaanimal" key del Json

            let ContadorLongitud = datosServidor.length;
            console.log("Longitud: " + ContadorLongitud);

            this.sql_categoriaAnimal= '';

            datosServidor.forEach(elemento => {
              this.sql_categoriaAnimal += "INSERT INTO tcategoriaanimal ( pkidcategoriaanimal, nombrecategoriaanimal, descripcioncategoriaanimal, creacioncategoriaanimal, modificacioncategoriaanimal, categoriaanimalactivo, codigocategoriaanimal) VALUES (" +
                "" + elemento.pkidcategoriaanimal + ", " +
                "'" + elemento.nombrecategoriaanimal + "', " +
                "'" + elemento.descripcioncategoriaanimal + "', " +
                "'" + elemento.creacioncategoriaanimal + "', " +
                "'" + elemento.modificacioncategoriaanimal + "', " +
                "'" + elemento.categoriaanimalactivo + "', " +
                "'" + elemento.codigocategoriaanimal + "'); ";
            });

            console.log("termino de armar archivo categoria animal");

            this.databaseprovider.fillDatabase(this.sql_categoriaAnimal);
            resolve(res);
          }

        }, error => {
          console.error(error.message);
        });
    }).catch(e => {
      console.error("Error al descargar categoria animal" + e.message)
    });
  }

  
     /**
   * @loadEspecieAnimal(): Descarga especieanimal del REST API
   */
  loadEspecieAnimal() {

    let parametros = 'authorization=' + this.singleton.TOKEN; //+ "&activo=true";

    return new Promise(resolve => {
      this.http.post(this.API_URL + 'especieanimal/query', parametros, { headers: this.headers })
        .subscribe(res => {
          if (res["status"] != "error") {
            let datosServidor = res['especieanimal']; //"especieanimal" key del Json

            let ContadorLongitud = datosServidor.length;
            console.log("Longitud: " + ContadorLongitud);

            this.sql_especieAnimal= '';

            datosServidor.forEach(elemento => {
              this.sql_especieAnimal += "INSERT INTO tespecieanimal ( pkidespecieanimal, codigoespecieanimal, nombreespecieanimal, especieanimalactivo, creacionespecieanimal, modificacionespecieanimal, fkidtipoanimal) VALUES (" +
                "" + elemento.pkidespecieanimal + ", " +
                "'" + elemento.codigoespecieanimal + "', " +
                "'" + elemento.nombreespecieanimal + "', " +
                "'" + elemento.especieanimalactivo + "', " +
                "'" + elemento.creacionespecieanimal + "', " +
                "'" + elemento.modificacionespecieanimal + "', " +
                "'" + elemento.fkidtipoanimal + "'); ";
            });

            console.log("termino de armar archivo especie animal");

            this.databaseprovider.fillDatabase(this.sql_especieAnimal);
            resolve(res);
          }

        }, error => {
          console.error(error.message);
        });
    }).catch(e => {
      console.error("Error al descargar especie animal" + e.message)
    });
  }
  
  


}