import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SingletonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SingletonProvider {

  public usuario = {};
  public plaza = {};
  public sector = {};
  public plazas = [];
  public sectoresPlaza = [];
  public TOKEN = '';


  /*****************************************************************************************************/
  /***************************************** AUXILIARES ************************************************/
  /*****************************************************************************************************/

  public primeraVez: boolean = false;

  constructor(public http: HttpClient) {
    console.log('Hello SingletonProvider Provider');
  }

}
