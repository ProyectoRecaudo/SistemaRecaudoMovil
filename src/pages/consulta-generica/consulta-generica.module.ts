import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultaGenericaPage } from './consulta-generica';

@NgModule({
  declarations: [
    ConsultaGenericaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultaGenericaPage),
  ],
})
export class ConsultaGenericaPageModule {}
