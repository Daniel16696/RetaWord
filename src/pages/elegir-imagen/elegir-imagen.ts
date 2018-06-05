import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-elegir-imagen',
  templateUrl: 'elegir-imagen.html',
})
export class ElegirImagenPage {
  usuariosActualDelDispositivo: any;
  imagenesDisponiblesParaElUsuario: any;
  idDelUsuarioQueVaAQuererCambiarDeImagen: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider) {
    this.idDelUsuarioQueVaAQuererCambiarDeImagen = navParams.get('IDusuarioEnConcretoDeLaAplicacion');
    // console.log(this.idDelUsuarioQueVaAQuererCambiarDeImagen);
    this.userService.obtenerImagenes()
      .subscribe(
        (data) => { // Success
          this.imagenesDisponiblesParaElUsuario = data;
          // console.log(this.imagenesDisponiblesParaElUsuario);


        },
        (error) => {
          console.error(error);
        }
      )

  }

  EscogerImagen(NombreDeLaImagenElegida) {

    // console.log(NombreDeLaImagenElegida);

    this.userService.getUsuarioDelMovilUsandoPorId(this.idDelUsuarioQueVaAQuererCambiarDeImagen)
      .subscribe(
        (data) => { // Success
          this.usuariosActualDelDispositivo = data;
          // console.log(this.usuariosActualDelDispositivo);

          this.userService.cambiarElEstadoDeConectadoDelUsuario(
            this.usuariosActualDelDispositivo[0].id,
            this.usuariosActualDelDispositivo[0].nickname,
            NombreDeLaImagenElegida,
            this.usuariosActualDelDispositivo[0].victoriasRondas,
            this.usuariosActualDelDispositivo[0].derrotasRondas,
            this.usuariosActualDelDispositivo[0].victoriaPorcentaje,
            0,
            0,
            0,
            0,
            0,
            '',
            ''
          );

          this.navCtrl.pop();
          
        },
        (error) => {
          console.error(error);
        }
      )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElegirImagenPage');
  }

}
