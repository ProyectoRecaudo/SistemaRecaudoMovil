import { GLOBAL } from './../fecha/globales';
import { Injectable } from '@angular/core';
import { Platform, LoadingController, Events } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  database: SQLiteObject;
  public databaseReady: BehaviorSubject<boolean>;
  public crearEstructuraReady: BehaviorSubject<boolean>;
  loading: any;

  fechaCreacion: any = new Date().toLocaleString();
  fechaModificacion: any = new Date().toLocaleString();

  private bdActual: string = "bd1.db"

  constructor(
    public sqlitePorter: SQLitePorter,
    private storage: Storage,
    private sqlite: SQLite,
    private platform: Platform,
    private http: Http,
    public events: Events,
    public loadingCtrl: LoadingController
  ) {
    this.databaseReady = new BehaviorSubject(false);
    this.crearEstructuraReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.storage.get('BDACTIVA').then(val => {
        if (val) {
          this.bdActual = val;
        }
        console.log("val" + val);

        this.crearBD();
      }).catch(() => {
        console.error("error val");

      });
    });
  }

  setOcupado(mensaje: string = 'cargando') {
    this.loading = this.loadingCtrl.create({
      content: mensaje
    });

    this.loading.present();

  }

  setDesocupado() {
    this.loading.dismiss();
  }

  /**
   * Crea la Base de datos y verifica que bd se encuentra activa
   */
  private crearBD() {

    this.platform.ready().then(() => {
      this.sqlite.create({
        name: this.bdActual,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = null;
          this.database = db;
          this.storage.set('BDACTIVA', this.bdActual);
          this.databaseReady.next(true);

          // if(crearEstructura)
          // {
          // this.crearEstructura();
          // }
        }, (error => {
          console.log("Error (1) " + error.message);
        }));
    });
  }

  //Llena la base de datos
  fillDatabase(sql: string = null) {
    //this.setOcupado('Importando BD');
    if (sql != null) {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(data => {
          this.databaseReady.next(true);
          this.storage.set('database_filled', true);
          console.log("terminó de importar");
          //this.setDesocupado();
        })
        .catch(e => { console.error("Error en la Importación " + e.message) });
    }
  }

  //Check al estado de la bd
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

  backup() {
    this.platform.ready().then(() => {
      this.database.abortallPendingTransactions();
      this.database.close().then(() => {
        console.info("bdActual: ", this.bdActual);

        this.bdActual = this.bdActual == "bd1.db" ? "bd2.db" : "bd1.db";
        console.info("bdActual despues: ", this.bdActual);
        this.sqlite.deleteDatabase({
          name: this.bdActual,
          location: 'default'
        }).then(() => {
          console.log("borrada");

          this.crearBD();
        }).catch((e) => {
          console.log("se creara el backup");
          this.crearBD();

        });

      });
    });
  }


  restore() {
    this.platform.ready().then(() => {
      this.database.abortallPendingTransactions();
      this.database.close().then(() => {
        console.info("bdActual: ", this.bdActual);

        this.bdActual = this.bdActual == "bd1.db" ? "bd2.db" : "bd1.db";
        console.info("bdActual despues: ", this.bdActual);
        this.crearBD();

      });
    });
  }

  crearEstructura() {
    this.http.get('assets/database/RecaudoDB.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.crearEstructuraReady.next(true);
            this.crearEstructuraReady.complete(); //se finaliza el evento
            this.crearEstructuraReady = new BehaviorSubject(false); //se reinicia el evento.
          })
          .catch(e => console.error(e));
      });
  }



  /**
   * USUARIOS
   */

  /**
 * Select a la tabla usuario
 */
  getAllUsuarios() {
    return this.database.executeSql("SELECT * FROM tusuario", []).then((data) => {

      let usuarios = [];
      if (data.rows.length > 0) {
        //this.setOcupado('Listando Datos Importados');
        for (var i = 0; i < data.rows.length; i++) {
          usuarios.push({ pkidusuario: data.rows.item(i).pkidusuario, nombreusuario: data.rows.item(i).nombreusuario, contrasenia: data.rows.item(i).contrasenia, apellido: data.rows.item(i).apellido, identificacion: data.rows.item(i).identificacion, codigousuario: data.rows.item(i).codigousuario, rutaimagen: data.rows.item(i).rutaimagen, numerorecibo: data.rows.item(i).numerorecibo, usuarioactivo: data.rows.item(i).usuarioactivo });
        }
        console.log("N° Registros usuarios: " + data.rows.length);
      }
      //this.setDesocupado();
      return usuarios;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }

  getUsuarioId(datoBuscar) {
    return this.database.executeSql("SELECT pkidusuario, identificacion, nombreusuario, apellido, contrasenia, numerorecibo FROM tusuario WHERE identificacion='" + datoBuscar + "'", []).then((data) => {

      let usuario;
      if (data.rows.length > 0) {
        usuario = { pkidusuario: data.rows.item(0).pkidusuario, nombreusuario: data.rows.item(0).nombreusuario, contrasenia: data.rows.item(0).contrasenia, apellido: data.rows.item(0).apellido, identificacion: data.rows.item(0).identificacion, codigousuario: data.rows.item(0).codigousuario, rutaimagen: data.rows.item(0).rutaimagen, numerorecibo: data.rows.item(0).numerorecibo, usuarioactivo: data.rows.item(0).usuarioactivo };
      }
      return usuario;
    }, err => {
      console.error('Error: ', err.message);
      return {};
    });
  }

  actualizarNumeroRecibo(idUsuario, nuevoValor) {
    return this.database.executeSql("UPDATE tusuario SET numerorecibo=" + nuevoValor + " WHERE identificacion='" + idUsuario + "'", []).then((data) => {

      return true;
    }, err => {
      console.error('Error: ', err.message);
      return false;
    });
  }

  getNumReciboE(idUsuario) {

    let sql = "SELECT numerorecibo FROM tusuario  WHERE identificacion='" + idUsuario + "'";
    return this.database.executeSql(sql, []);

  }

  numeroregistrosUsuarios() {
    //select pkidusuario from tusuario limit 1


    return this.database.executeSql("SELECT pkidsqlite FROM tusuario limit 1", []).then((data) => {

      let numreg = [];
      if (data.rows.length > 0) {
        numreg = data.rows.length;

      } else {
        numreg = data.rows.length;
      }
      console.log("registros: ", numreg);
      return numreg;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });


  }




  /**
   * TERCEROS
   */

  /**
  * Select a la tabla tercero
  */
  getAllTerceros() {
    return this.database.executeSql("SELECT * FROM ttercero", []).then((data) => {

      let terceros = [];
      if (data.rows.length > 0) {
        // this.setOcupado('Listando Datos Importados');
        for (var i = 0; i < data.rows.length; i++) {
          terceros.push({ pkidsqlite: data.rows.item(i).pkidsqlite, nombretercero: data.rows.item(i).nombretercero, identificaciontercero: data.rows.item(i).identificaciontercero, telefonotercero: data.rows.item(i).telefonotercero, creaciontercero: data.rows.item(i).creaciontercero, modificaciontercero: data.rows.item(i).modificaciontercero, pkidtercero: data.rows.item(i).pkidtercero, tipotercero: data.rows.item(i).tipotercero });
          //console.log("DATOS TERCERO: ", data.rows.item(i).nombretercero);
        }
        console.log("N° Registros terceros: " + data.rows.length);

      } else {
        console.log("No existe, hay que agregarlo!");
      }

      //this.setDesocupado();
      return terceros;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }

  getTercero(datoBuscar) {
    return this.database.executeSql("SELECT pkidsqlite, nombretercero, identificaciontercero, telefonotercero FROM ttercero WHERE identificaciontercero='" + datoBuscar + "'", []).then((data) => {

      let terceros: any;
      if (data.rows.length > 0) {
        // this.setOcupado('Listando Datos Importados');
        terceros = { pkidsqlite: data.rows.item(0).pkidsqlite, nombretercero: data.rows.item(0).nombretercero, identificaciontercero: data.rows.item(0).identificaciontercero, telefonotercero: data.rows.item(0).telefonotercero };
        console.log("N° Registros: " + data.rows.length);

      } else {
        console.log("No existe, hay que agregarlo!");
      }

      // this.setDesocupado();
      return terceros;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }


  addTercero(nombretercero, identificaciontercero, telefonotercero, creaciontercero, modificaciontercero, pkidtercero, tipotercero) {
    let data = [nombretercero, identificaciontercero, telefonotercero, creaciontercero, modificaciontercero, -1, tipotercero]
    return this.database.executeSql("INSERT INTO ttercero (nombretercero, identificaciontercero, telefonotercero, creaciontercero, modificaciontercero, pkidtercero, tipotercero) VALUES (?, ?, ?, ?, ?, ?, ?)", data).then(data => {
      console.log("Guardado!");
      return data;
    }, err => {
      console.log('Error add: ', err.message, 'NO GUARDADO!');
      return err;
    })
      .catch((error) => {
        console.log('Error catch: ', error.message);
      })
  }

  updateTercero(nombretercero, telefonotercero, modificaciontercero, identificacion) {
    let data = [nombretercero, telefonotercero, modificaciontercero]
    return this.database.executeSql("UPDATE ttercero SET nombretercero = ?,  telefonotercero = ?,  modificaciontercero = ? WHERE identificaciontercero = '" + identificacion + "'", data).then(data => {
      console.log("Actualizado!");
      return data;
    }, err => {
      console.log('Error update: ', err.message, 'NO ACTUALIZADO!');
      return err;
    })
      .catch((error) => {
        console.log('Error catch: ', error.message);
      })
  }


  /**
   * PLAZA
   */

  /**
* Select a la tabla plaza
*/

  existenPlazas() {
    return this.database.executeSql("SELECT pkidsqlite FROM tplaza limit 1", []).then((data) => {

      return data.rows.length > 0;

    }, err => {
      console.log('Error: ', err.message);
      return false;
    });


  }

  getAllPlazas() {
    return this.database.executeSql("SELECT pkidplaza, nombreplaza FROM tplaza ORDER BY nombreplaza", []).then((data) => {

      let plazas = [];
      if (data.rows.length > 0) {
        //  this.setOcupado('Listando Datos Importados');
        for (var i = 0; i < data.rows.length; i++) {
          plazas.push({ pkidsqlite: data.rows.item(i).pkidsqlite, pkidplaza: data.rows.item(i).pkidplaza, nombreplaza: data.rows.item(i).nombreplaza });
        }
        console.log("N° Registros Plazas: " + data.rows.length);

      } else {
        console.log("No hay datos plazas!");
      }

      // this.setDesocupado();
      return plazas;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }

  /**
   * SECTOR
   */
  /**
  * Select a la tabla Sector
  */

  getAllSectores() {
    return this.database.executeSql("SELECT pkidsqlite,pkidsector,nombresector,fkidplaza,fkidtiposector FROM tsector;", []).then((data) => {

      let sectores = [];
      if (data.rows.length > 0) {
        // this.setOcupado('Listando Datos Importados');
        for (var i = 0; i < data.rows.length; i++) {
          sectores.push({ pkidsqlite: data.rows.item(i).pkidsqlite, pkidsector: data.rows.item(i).pkidsector, nombresector: data.rows.item(i).nombresector, fkidplaza: data.rows.item(i).fkidplaza, fkidtiposector: data.rows.item(i).fkidtiposector });
        }
        console.log("N° Registros Sectores: " + data.rows.length);
      } else {
        console.log("No hay datos sectores!");
      }

      // this.setDesocupado();
      return sectores;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }

  getSectoresByPlaza(idPlaza) {
    return this.database.executeSql("SELECT pkidsqlite,pkidsector,nombresector,fkidplaza,fkidtiposector FROM tsector WHERE fkidplaza=" + idPlaza + ";", []).then((data) => {

      let sectores = [];
      if (data.rows.length > 0) {
        // this.setOcupado('Listando Datos Importados');
        for (var i = 0; i < data.rows.length; i++) {
          sectores.push({ pkidsqlite: data.rows.item(i).pkidsqlite, pkidsector: data.rows.item(i).pkidsector, nombresector: data.rows.item(i).nombresector, fkidplaza: data.rows.item(i).fkidplaza, fkidtiposector: data.rows.item(i).fkidtiposector });
        }
        console.log("N° Registros Sectores: " + data.rows.length);
      } else {
        console.log("No hay datos sectoresbyplaza!");
      }

      // this.setDesocupado();
      return sectores;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }

  /**
   * RECIBO
   */
  addReciboEventual(pkidrecibopuestoeventual,
    numerorecibopuestoeventual,
    valorecibopuestoeventual,
    creacionrecibopuestoeventual,
    modificacionrecibopuestoeventual,
    identificacionterceropuestoeventual,
    fkidtarifapuestoeventual,
    fkidplaza,
    valortarifa,
    nombreplaza,
    nombreterceropuestoeventual,
    recibopuestoeventualactivo,
    nombresector,
    fkidsector,
    identificacionrecaudador,
    nombrerecaudador,
    apellidorecaudador,
    fkidusuariorecaudador,
    sincronizado) {
    let data = [pkidrecibopuestoeventual, numerorecibopuestoeventual, valorecibopuestoeventual, creacionrecibopuestoeventual, modificacionrecibopuestoeventual, identificacionterceropuestoeventual, fkidtarifapuestoeventual, fkidplaza, valortarifa, nombreplaza, nombreterceropuestoeventual, recibopuestoeventualactivo, nombresector, fkidsector, identificacionrecaudador, nombrerecaudador, apellidorecaudador, fkidusuariorecaudador, sincronizado]
    return this.database.executeSql("INSERT INTO trecibopuestoeventual (pkidrecibopuestoeventual, numerorecibopuestoeventual,valorecibopuestoeventual,creacionrecibopuestoeventual,modificacionrecibopuestoeventual,identificacionterceropuestoeventual,fkidtarifapuestoeventual,fkidplaza,valortarifa,nombreplaza,nombreterceropuestoeventual,recibopuestoeventualactivo,nombresector,fkidsector,identificacionrecaudador,nombrerecaudador,apellidorecaudador,fkidusuariorecaudador,sincronizado) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?)", data)
      .then(data => {
        console.log("Recibo Eventual Guardado!");
        return data;
      }, err => {
        console.log('Error add recibo eventual: ', err.message, 'NO GUARDADO!');
        throw err;
      })
      .catch((error) => {
        console.log('Error catch RE: ', error.message);
        throw error;
      })
  }

  getAllRecibosEventuales() {
    return this.database.executeSql("SELECT * FROM trecibopuestoeventual", []).then((data) => {

      let recibos = [];
      if (data.rows.length > 0) {
        this.setOcupado('Listando Datos Importados');
        for (var i = 0; i < data.rows.length; i++) {          
          recibos.push(data.rows.item(i))
        }
        console.log("N° Registros Recibos eventuales: " + data.rows.length);

      } else {
        console.log("No hay datos rec.eventuales!");
      }

      this.setDesocupado();
      return recibos;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }

  getRecEventuales() {
    let sql = "SELECT * FROM trecibopuestoeventual WHERE sincronizado=0";
    return this.database.executeSql(sql, []);
  }

  actualizarRecEventuales() {
    let sql = "UPDATE trecibopuestoeventual  SET sincronizado = 1 WHERE sincronizado = 0";
    return this.database.executeSql(sql, []);
  }

  /**
   * Tarifa parqueaderos
   */
  getAllTarifaParqueadero() {
    return this.database.executeSql("SELECT * FROM ttarifaparqueadero", []).then((data) => {

      let tarifaparqueadero = [];
      if (data.rows.length > 0) {
        // this.setOcupado('Listando Datos Importados');
        for (var i = 0; i < data.rows.length; i++) {
          tarifaparqueadero.push(data.rows.item(i))
        }
        console.log("N° Registros tarifaparqueadero: " + data.rows.length);

      } else {
        console.log("No hay datos tarifaparqueadero!");
      }

      //this.setDesocupado();
      return tarifaparqueadero;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }

  /**
   * Tarifa pesaje
   */
  getAllTarifaPesaje() {
    return this.database.executeSql("SELECT * FROM ttarifapesaje", []).then((data) => {

      let tarifapesaje = [];
      if (data.rows.length > 0) {
        // this.setOcupado('Listando Datos Importados');
        for (var i = 0; i < data.rows.length; i++) {
          tarifapesaje.push(data.rows.item(i))
        }
        console.log("N° Registros tarifapesaje: " + data.rows.length);

      } else {
        console.log("No hay datos tarifapesaje!");
      }

      //this.setDesocupado();
      return tarifapesaje;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }

  /**
   * Tarifa puesto
   */
  getAllTarifaPuesto() {
    return this.database.executeSql("SELECT * FROM ttarifapuesto", []).then((data) => {

      let tarifapuesto = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          tarifapuesto.push(data.rows.item(i))
        }
        console.log("N° Registros tarifapuesto: " + data.rows.length);

      } else {
        console.log("No hay datos tarifapuesto!");
      }

      //this.setDesocupado();
      return tarifapuesto;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }

  /**
   * Tarifa puesto eventual
   */
  getAllTarifaPuestoEventual() {
    return this.database.executeSql("SELECT * FROM ttarifapuestoeventual", []).then((data) => {

      let tarifapuestoeventual = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          tarifapuestoeventual.push(data.rows.item(i))
        }
        console.log("N° Registros tarifapuestoeventual: " + data.rows.length);

      } else {
        console.log("No hay datos tarifapuestoeventual!");
      }

      //this.setDesocupado();
      return tarifapuestoeventual;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }

  /**
   * Tarifa vehiculo
   */
  getAllTarifaVehiculo() {
    return this.database.executeSql("SELECT * FROM ttarifavehiculo", []).then((data) => {

      let tarifavehiculo = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          tarifavehiculo.push(data.rows.item(i))
        }
        console.log("N° Registros tarifavehiculo: " + data.rows.length);

      } else {
        console.log("No hay datos tarifavehiculo!");
      }

      //this.setDesocupado();
      return tarifavehiculo;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }

  /**
   * Tarifa zonas
   */
  getAllZonas() {
    return this.database.executeSql("SELECT * FROM tzona", []).then((data) => {

      let zonas = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          zonas.push(data.rows.item(i))
        }
        console.log("N° Registros zonas: " + data.rows.length);

      } else {
        console.log("No hay datos zonas!");
      }

      //this.setDesocupado();
      return zonas;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }

  /**
   * Tarifa Tipo Puesto
   */
  getAllTipoPuesto() {
    return this.database.executeSql("SELECT * FROM ttipopuesto", []).then((data) => {

      let tipopuesto = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          tipopuesto.push(data.rows.item(i))
        }
        console.log("N° Registros tipopuesto: " + data.rows.length);

      } else {
        console.log("No hay datos tipopuesto!");
      }

      //this.setDesocupado();
      return tipopuesto;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }

  /**
   * Tarifa Tipo categoria animal
   */
  getAllCategoriaAnimal() {
    return this.database.executeSql("SELECT * FROM tcategoriaanimal", []).then((data) => {

      let categoriaanimal = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          categoriaanimal.push(data.rows.item(i))
        }
        console.log("N° Registros categoriaanimal: " + data.rows.length);

      } else {
        console.log("No hay datos categoriaanimal!");
      }

      //this.setDesocupado();
      return categoriaanimal;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }

  /**
   * Tarifa Tipo categoria animal
   */
  getAllEspecieAnimal() {
    return this.database.executeSql("SELECT * FROM tespecieanimal", []).then((data) => {

      let especieanimal = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          especieanimal.push(data.rows.item(i))
        }
        console.log("N° Registros especieanimal: " + data.rows.length);

      } else {
        console.log("No hay datos especieanimal!");
      }

      //this.setDesocupado();
      return especieanimal;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }



  /**
   * Facturas
   */
  getAllFacturas() {
    return this.database.executeSql("SELECT * FROM tfactura", []).then((data) => {

      let facturas = [];
      if (data.rows.length > 0) {
        // this.setOcupado('Listando Datos Importados');
        for (var i = 0; i < data.rows.length; i++) {
          facturas.push(data.rows.item(i))
        }
        console.log("N° Registros facturas: " + data.rows.length);

      } else {
        console.log("No hay datos facturas!");
      }

      //this.setDesocupado();
      return facturas;

    }, err => {
      console.log('Error: ', err.message);
      return [];
    });
  }



  /******************************************************************************************/
  /******************************************************************************************/
  /******************************************************************************************/

  anularReciboEventual(idsqlite) {
    return this.database.executeSql("UPDATE trecibopuestoeventual SET recibopuestoeventualactivo = 0 WHERE pkidsqlite=" + idsqlite + ";").then((data) => { return data }).catch((e) => { throw e; });
  }
  consultaReciboEventual(idplaza, numRecibo, identificacion) {

    //return this.database.executeSql("SELECT pkidsqlite,pkidplaza,nombreplaza, 1 as sincronizado FROM tplaza;", []).then((data) => {
    return this.database.executeSql("SELECT pkidsqlite,pkidrecibopuestoeventual,numerorecibopuestoeventual,valorecibopuestoeventual,creacionrecibopuestoeventual,modificacionrecibopuestoeventual,identificacionterceropuestoeventual,fkidtarifapuestoeventual,fkidplaza,valortarifa,nombreplaza,nombreterceropuestoeventual,recibopuestoeventualactivo,nombresector,fkidsector,identificacionrecaudador,nombrerecaudador,apellidorecaudador,fkidusuariorecaudador,sincronizado FROM trecibopuestoeventual "
      + "WHERE (" + idplaza + "=-1 OR fkidplaza = " + idplaza + ") AND ('" + numRecibo + "'='' OR numerorecibopuestoeventual LIKE '" + numRecibo + "') AND ('" + identificacion + "' = '' OR identificacionterceropuestoeventual LIKE '" + identificacion + "');"
      , []).then((data) => {
        let recibos = [];
        if (data.rows.length > 0) {
          this.setOcupado('Cargando datos');
          console.log("listando recibos ", data.rows.length);

          let primary = true;
          for (var i = 0; i < data.rows.length; i++) {

            let aux = {
              pkidsqlite: data.rows.item(i).pkidsqlite,
              norecibo: data.rows.item(i).numerorecibopuestoeventual,
              nombre: data.rows.item(i).nombreterceropuestoeventual,
              valor: data.rows.item(i).valorecibopuestoeventual,
              fecha: data.rows.item(i).creacionrecibopuestoeventual,
              extra: data.rows.item(i).identificacionterceropuestoeventual,
              color: primary ? "rojo" : "azul",
              estado: data.rows.item(i).recibopuestoeventualactivo == 1 ? "" : "ANULADO",
              sincronizado: data.rows.item(i).sincronizado == 1 ? "Sincronizado" : "Sin sincronizar",
              completo: data.rows.item(i) //se guarda todo el recibo.
            };

            primary = !primary;

            recibos.push(aux);
          }
        }
        this.setDesocupado();
        return recibos;
      });
  }
}
