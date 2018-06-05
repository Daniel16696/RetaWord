import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {
  usuariosRanking: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider) {

    this.userService.getUsuariosRanking()
      .subscribe(
        (data) => { // Success
          this.usuariosRanking = data;
          // console.log(this.usuariosRanking);
        },
        (error) => {
          console.error(error);
        }
      )

  }

  ionViewDidEnter() {

    this.userService.getUsuariosRanking()
      .subscribe(
        (data) => { // Success
          this.usuariosRanking = data;
          // console.log(this.usuariosRanking);
        },
        (error) => {
          console.error(error);
        }
      )
      
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.userService.getUsuariosRanking()
      .subscribe(
        (data) => { // Success
          this.usuariosRanking = data;
          console.log(this.usuariosRanking);
        },
        (error) => {
          console.error(error);
        }
      )
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RankingPage');

  }

}
