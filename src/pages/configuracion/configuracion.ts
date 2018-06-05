import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SugerirCategoriaPage } from '../sugerir-categoria/sugerir-categoria';
import { ContactanosPage } from '../contactanos/contactanos';
import { UserServiceProvider } from '../../providers/user-service/user-service';
// import { InicioDelJuegoPage } from '../inicio-del-juego/inicio-del-juego';
// import { TabsPage } from '../tabs/tabs';
// import { InicioDelJuegoPage } from '../inicio-del-juego/inicio-del-juego';

@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html'
})
export class ConfiguracionPage {
  usuarioActualDelDispositivoConfiguracion: any;
  nombreDelUsuario: any;
  usuarios: any;
  intentarCambiarNombreDeUsuario: any;
  usuarioEnConcretoDeLaAplicacion: any;
  constructor(public navCtrl: NavController, public userService: UserServiceProvider, public alertCtrl: AlertController) {
    // console.log(localStorage.getItem('nickUsuarioAplicacion'));
    this.userService.getUsuarioDelMovilUsando(localStorage.getItem('nickUsuarioAplicacion'))
      .subscribe(
        (data) => { // Success
          this.usuarioEnConcretoDeLaAplicacion = data;

          this.nombreDelUsuario = this.usuarioEnConcretoDeLaAplicacion[0].nickname;
        },
        (error) => {
          console.error(error);
        }
      )
  }
  ionViewDidEnter() {
    // console.log(localStorage.getItem('nickUsuarioAplicacion'));
    this.userService.getUsuarioDelMovilUsando(localStorage.getItem('nickUsuarioAplicacion'))
      .subscribe(
        (data) => { // Success
          this.usuarioEnConcretoDeLaAplicacion = data;

          this.nombreDelUsuario = this.usuarioEnConcretoDeLaAplicacion[0].nickname;
        },
        (error) => {
          console.error(error);
        }
      )
  }

  borrarCuenta() {
    let alert = this.alertCtrl.create({
      title: '¿Quieres eliminarla?',
      message: 'No podrás recuperar tu usuario',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Has cancelado');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            console.log('Has aceptado');
            let idDelUsuarioParaBorrar = this.usuarioEnConcretoDeLaAplicacion[0].id
            this.userService.borrarUsuarioConfiguracion(idDelUsuarioParaBorrar)
              .subscribe(
                (data2) => { // Success
                  // alert("Se ha borrado el usuario correctamente");
                  let alert = this.alertCtrl.create({
                    title: 'Se ha eliminado el usuario',
                    subTitle: '¡Hasta pronto!',
                    buttons: ['Ok']
                  });
                  alert.present();
                  localStorage.clear();
                  let interval = setInterval(function () {
                    console.log("he entrado y estoy esperando 2 segundos");
                    location.reload();
                    console.log("he reiniciado");
                    clearInterval(interval);
                    console.log("he borrado el intervalo");
                  }, 2000);
                },
                (error) => {
                  console.error(error);
                }
              )
          }
        }
      ]
    });
    alert.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracionPage');
  }
  sugerirCategoria() {
    this.navCtrl.push(SugerirCategoriaPage);
  }
  contactanos() {
    this.navCtrl.push(ContactanosPage);
  }

  // doRefresh(refresher) {
  //   console.log('Begin async operation', refresher);
  //   this.userService.getUsuarioDelMovilUsando(localStorage.getItem('nickUsuarioAplicacion'))
  //     .subscribe(
  //       (data) => { // Success
  //         this.usuarioEnConcretoDeLaAplicacion = data;
  //         console.log(this.usuarioEnConcretoDeLaAplicacion[0].nickname);
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     )
  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     refresher.complete();
  //   }, 2000);
  // }

  cambiarNombreUsuario() {
    let alert = this.alertCtrl.create({
      title: '¿Quieres cambiarlo?',
      // subTitle: 'Nuevo nickname',
      inputs: [
        {
          name: 'nickname',
          placeholder: 'Escriba su nuevo nickname'
        }
      ],
      buttons: [
        {
          text: 'Salir',
          role: 'cancel',
          handler: data3 => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data3 => {

            this.userService.getUsuarioDelMovilUsando(data3.nickname)
              .subscribe(
                (data4) => { // Success
                  this.intentarCambiarNombreDeUsuario = data4;
                  // console.log(data4);
                  if (this.intentarCambiarNombreDeUsuario.length == 1) {
                    let alert = this.alertCtrl.create({
                      title: 'Este usuario ya existe',
                      subTitle: 'Introduzca otro nickname',
                      buttons: ['Ok']
                    });
                    alert.present();
                  } else {
                    this.userService.cambiarNicknameDelUsuario(
                      this.usuarioEnConcretoDeLaAplicacion[0].id,
                      data3.nickname,
                      this.usuarioEnConcretoDeLaAplicacion[0].imagenAsociada,
                      this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
                      this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
                      this.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
                      this.usuarioEnConcretoDeLaAplicacion[0].sala,
                      this.usuarioEnConcretoDeLaAplicacion[0].idContrincante,
                      this.usuarioEnConcretoDeLaAplicacion[0].ocupado,
                      this.usuarioEnConcretoDeLaAplicacion[0].IdAsignacionDePregunta,
                      this.usuarioEnConcretoDeLaAplicacion[0].contadorTemporalDeAciertos,
                      this.usuarioEnConcretoDeLaAplicacion[0].respuestasDelUsuarioTemporal,
                      this.usuarioEnConcretoDeLaAplicacion[0].IconosDeRespuestasDelUsuarioTemporal
                    );
                    window.localStorage['nickUsuarioAplicacion'] = data3.nickname;

                    let alert2 = this.alertCtrl.create({
                      title: 'Has cambiado de nickname',
                      subTitle: 'Realizado con éxito',
                      buttons: ['Ok']
                    });
                    alert2.present();
                  }

                },
                (error) => {
                  console.error(error);
                }
              )
          }
        }
      ]
    });
    alert.present();

  }

}
