import { NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// los cuatro tabs del menú
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { RankingPage } from '../pages/ranking/ranking';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
// fin de los cuatro tabs del menú



import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SugerirCategoriaPage } from '../pages/sugerir-categoria/sugerir-categoria';
import { ContactanosPage } from '../pages/contactanos/contactanos';
import { InicioDelJuegoPage } from '../pages/inicio-del-juego/inicio-del-juego';

import { HttpClientModule } from '@angular/common/http';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { JugarOnlinePage } from '../pages/jugar-online/jugar-online';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { RondasPage } from '../pages/rondas/rondas';
import { ElegirImagenPage } from '../pages/elegir-imagen/elegir-imagen';




@NgModule({
  declarations: [
    MyApp,
    ConfiguracionPage,
    PerfilPage,
    HomePage,
    TabsPage,
    RankingPage,
    SugerirCategoriaPage,
    ContactanosPage,
    InicioDelJuegoPage,
    JugarOnlinePage,
    ProgressBarComponent,
    RondasPage,
    ElegirImagenPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'bottom',tabsHideOnSubPages: true})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ConfiguracionPage,
    PerfilPage,
    HomePage,
    TabsPage,
    RankingPage,
    SugerirCategoriaPage,
    ContactanosPage,
    InicioDelJuegoPage,
    JugarOnlinePage,
    RondasPage,
    ElegirImagenPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
