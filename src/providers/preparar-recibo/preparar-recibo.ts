import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NumbersToLettersProvider } from '../numbers-to-letters/numbers-to-letters';

/*
  Generated class for the PrepararReciboProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrepararReciboProvider {



  //Separador de miles
  DECIMAL_SEPARATOR = ",";
  GROUP_SEPARATOR = ".";
  budget = 0;

  constructor(public http: HttpClient,     private conversion: NumbersToLettersProvider,
    ) {
    console.log('Hello PrepararReciboProvider Provider');
  }

  armarReciboEventual(recibo)
  {
    let objetoCompleto={};
    objetoCompleto["norecibo"]=recibo["numerorecibopuestoeventual"];
    objetoCompleto["estado"]=recibo["recibopuestoeventualactivo"] == 1? '':'ANULADO';
    objetoCompleto["fecha"]=recibo["creacionrecibopuestoeventual"];
    let datos = [];
    let numeroEnLetras = this.conversion.numeroALetras(this.unFormat(""+recibo["valorecibopuestoeventual"]), 0);
    
    datos.push({ "E": "Tarifa:", "V": this.format(""+recibo["valortarifa"]) });
    datos.push({ "E": "Valor pagado:", "V": this.format(""+recibo["valorecibopuestoeventual"]) });
    datos.push({ "E": "En letras:", "V": numeroEnLetras });
    datos.push({ "E": "Usuario:", "V": recibo['nombreterceropuestoeventual'] });
    datos.push({ "E": "Recaudador:", "V": recibo["nombrerecaudador"] });
    objetoCompleto["datosRecibo"]=datos;
    return objetoCompleto;
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

}
