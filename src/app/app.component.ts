import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { InicioDelJuegoPage } from '../pages/inicio-del-juego/inicio-del-juego';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  // rootPage:any = TabsPage;
  rootPage: any = InicioDelJuegoPage;



  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      if (!localStorage.getItem('nickUsuarioAplicacion')) {
        this.rootPage = InicioDelJuegoPage; // user can user this.nav.setRoot(TutorialPage);
      } else {
        this.rootPage = TabsPage; // user can user this.nav.setRoot(LoginPage);
      }

      splashScreen.hide();
    });
  }
}
