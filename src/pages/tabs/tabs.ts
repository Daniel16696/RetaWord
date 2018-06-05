import { Component } from '@angular/core';

import { ConfiguracionPage } from '../configuracion/configuracion';
import { PerfilPage } from '../perfil/perfil';
import { HomePage } from '../home/home';
import { RankingPage } from '../ranking/ranking';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ConfiguracionPage;
  tab3Root = PerfilPage;
  tab4Root = RankingPage;

  constructor() {
    
  }
}
