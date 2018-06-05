import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InicioDelJuegoPage } from './inicio-del-juego';

@NgModule({
  declarations: [
    InicioDelJuegoPage,
  ],
  imports: [
    IonicPageModule.forChild(InicioDelJuegoPage),
  ],
})
export class InicioDelJuegoPageModule {}
