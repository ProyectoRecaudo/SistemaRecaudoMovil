import { VehiculosPage } from './../pages/vehiculos/vehiculos';
import { MenuConsultasPage } from './../pages/menu-consultas/menu-consultas';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPrincipalPage } from '../pages/menu-principal/menu-principal';
import { MenuRecaudoPage } from '../pages/menu-recaudo/menu-recaudo';
import { RecaudoPuestosFijosPage } from '../pages/recaudo-puestos-fijos/recaudo-puestos-fijos';
import { RecaudoPuestosEventualesPage } from './../pages/recaudo-puestos-eventuales/recaudo-puestos-eventuales';
import { ConfiguracionesPage } from './../pages/configuraciones/configuraciones';

import { PrinterProvider } from '../providers/printer/printer';
import { NumbersToLettersProvider } from '../providers/numbers-to-letters/numbers-to-letters';
import { FechaProvider } from '../providers/fecha/fecha';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { IonicStorageModule } from '@ionic/storage';
import { PlazasPage } from '../pages/plazas/plazas';
import { ConsultaRecaudosPage } from '../pages/consulta-recaudos/consulta-recaudos';
import { DatabaseProvider } from '../providers/database/database';
import { ApiServicesProvider } from '../providers/api-services/api-services';
import { SeparadorMilesProvider } from '../providers/separador-miles/separador-miles';
import { SincGetProvider } from '../providers/sinc-get/sinc-get';
import { Keyboard } from '@ionic-native/Keyboard';
import { SingletonProvider } from '../providers/singleton/singleton';
import { ParqueaderosPage } from '../pages/parqueaderos/parqueaderos';
import { PesajeGanadoPage } from '../pages/pesaje-ganado/pesaje-ganado';
import { SincSetProvider } from '../providers/sinc-set/sinc-set';
import { PrepararReciboProvider } from '../providers/preparar-recibo/preparar-recibo';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPrincipalPage,
    MenuRecaudoPage,
    RecaudoPuestosFijosPage,
    PlazasPage,
    ConsultaRecaudosPage,
    RecaudoPuestosEventualesPage,
    ConfiguracionesPage,
    ParqueaderosPage,
    PesajeGanadoPage,
    VehiculosPage,
    MenuConsultasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPrincipalPage,
    MenuRecaudoPage,
    RecaudoPuestosFijosPage,
    PlazasPage,
    ConsultaRecaudosPage,
    RecaudoPuestosEventualesPage,
    ConfiguracionesPage,
    ParqueaderosPage,
    PesajeGanadoPage,
    VehiculosPage,
    MenuConsultasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLitePorter,
    SQLite,
    PrinterProvider,
    BluetoothSerial,
    NumbersToLettersProvider,
    FechaProvider,
    DatabaseProvider,
    ApiServicesProvider,
    SeparadorMilesProvider,
    SpeechRecognition,
    SincGetProvider,
    Keyboard,
    SingletonProvider,
    SincSetProvider,
    PrepararReciboProvider

  ]
})
export class AppModule {}
