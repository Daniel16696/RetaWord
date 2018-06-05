import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-inicio-del-juego',
  templateUrl: 'inicio-del-juego.html',
})

export class InicioDelJuegoPage {

  nicknameUsuario: FormGroup;
  users: any;
  unclickSolamente: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public userService: UserServiceProvider, public alertCtrl: AlertController) {
    this.nicknameUsuario = this.crearNicknameUsuario();

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad InicioDelJuegoPage');
  }

  guardarNicknameUsuario() {
    if (this.unclickSolamente == false) {
      this.userService.getUsuarioDelMovilUsando(this.nicknameUsuario.value.nickname)
        .subscribe(
          (data) => {
            this.users = data;
            if (this.users.length == 1) {

              let alert = this.alertCtrl.create({
                title: 'Este usuario ya existe',
                subTitle: 'Introduzca otro nickname',
                buttons: ['Ok']
              });
              alert.present();
              this.nicknameUsuario = this.crearNicknameUsuario();

            } else {

              if (this.unclickSolamente == false) {
                this.unclickSolamente == true;
                this.userService.postDatos(this.nicknameUsuario.value.nickname);
                window.localStorage['nickUsuarioAplicacion'] = this.nicknameUsuario.value.nickname;
                this.navCtrl.push(TabsPage);
              }
            }
            
          },
          (error) => {
            console.error(error);

          }
        )
    }
  }

  private crearNicknameUsuario() {
    return this.formBuilder.group({
      nickname: ['', Validators.required],
    });
  }

}
