import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehiculosPage } from './vehiculos';

@NgModule({
  declarations: [
    VehiculosPage,
  ],
  imports: [
    IonicPageModule.forChild(VehiculosPage),
  ],
})
export class VehiculosPageModule {}
