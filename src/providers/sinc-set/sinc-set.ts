import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from '../../providers/database/database';
import { SingletonProvider } from '../singleton/singleton';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { GLOBAL } from '../fecha/globales';

/*
  Generated class for the SincSetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SincSetProvider {

  public API_URL: string;
  public headers;

  recibos: any;

  constructor(
    private databaseprovider: DatabaseProvider,
    private storage: Storage,
    public http: Http,
    private singleton: SingletonProvider

  ) {
    console.log('Hello SincSetProvider Provider');
    this.API_URL = GLOBAL.url;
    this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  }

  uploadReciboEventual() {

    this.databaseprovider.getRecEventuales().then((res) => {
      this.databaseprovider.setOcupado("Cargando información al servidor...");
      this.recibos = [];
      for (var i = 0; i < res.rows.length; i++) {

        this.recibos.push({
          numerorecibopuestoeventual: res.rows.item(i).numerorecibopuestoeventual,
          valorecibopuestoeventual: res.rows.item(i).valorecibopuestoeventual,
          creacionrecibopuestoeventual: res.rows.item(i).creacionrecibopuestoeventual,
          modificacionrecibopuestoeventual: res.rows.item(i).modificacionrecibopuestoeventual,
          fkidtarifapuestoeventual: res.rows.item(i).fkidtarifapuestoeventual,
          nombreterceropuestoeventual: res.rows.item(i).nombreterceropuestoeventual,
          valortarifa: res.rows.item(i).valortarifa,
          nombreplaza: res.rows.item(i).nombreplaza,
          recibopuestoeventualactivo: res.rows.item(i).recibopuestoeventualactivo,
          identificacionterceropuestoeventual: res.rows.item(i).identificacionterceropuestoeventual,
          nombresector: res.rows.item(i).nombresector,
          fkidsector: res.rows.item(i).fkidsector,
          fkidplaza: res.rows.item(i).fkidplaza,
          identificacionrecaudador: res.rows.item(i).identificacionrecaudador,
          nombrerecaudador: res.rows.item(i).nombrerecaudador,
          apellidorecaudador: res.rows.item(i).apellidorecaudador,
          fkidusuariorecaudador: res.rows.item(i).fkidusuariorecaudador

        });

        //this.recibos.push(res.rows.item(i));

      }

      let json = JSON.stringify(this.recibos);
      console.log("JSON: " + json);
      let parametros = "authorization=" + this.singleton.TOKEN + "&json=" + json;

      return new Promise((resolve, reject) => {
        this.http.post(this.API_URL + 'recibopuestoeventual/new', parametros, { headers: this.headers })
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
            console.log("INFORMACIÓN CARGADA");
            this.databaseprovider.setDesocupado();
            this.databaseprovider.actualizarRecEventuales();
          }, error => {
            reject(error);
          })
      }).catch((error) => {
        console.error('API Error: ', error.status);
        console.error('API Error: ', JSON.stringify(error));
      })

    }, (err) => { console.error("Error al subir la información: ", err.message) })
  }





}
