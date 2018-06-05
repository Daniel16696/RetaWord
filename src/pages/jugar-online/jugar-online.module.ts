import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JugarOnlinePage } from './jugar-online';

@NgModule({
  declarations: [
    JugarOnlinePage,
  ],
  imports: [
    IonicPageModule.forChild(JugarOnlinePage),
  ],
})
export class JugarOnlinePageModule {}
