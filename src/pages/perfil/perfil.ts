import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ElegirImagenPage } from '../elegir-imagen/elegir-imagen';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
  usuariosActualDelDispositivo: any;


  idDelUsuario: any;
  nombreDelUsuario: any;
  imagenAsociadaAlUsuario: any = "imagen0";
  victoriasDeRondasDeLUsuario: any;
  derrotasDeRondasDeLUsuario: any;
  victoriaDePorcentajeDelUsuario: any;

  usuariosRankingPosicion: any;
  posicionRanking: any;

  constructor(public navCtrl: NavController, public userService: UserServiceProvider) {
    // console.log(localStorage.getItem('nickUsuarioAplicacion'));
    this.userService.getUsuarioDelMovilUsando(localStorage.getItem('nickUsuarioAplicacion'))
      .subscribe(
        (data) => { // Success
          this.usuariosActualDelDispositivo = data;

          this.idDelUsuario = this.usuariosActualDelDispositivo[0].id;
          this.nombreDelUsuario = this.usuariosActualDelDispositivo[0].nickname;
          this.imagenAsociadaAlUsuario = this.usuariosActualDelDispositivo[0].imagenAsociada;
          // console.log(this.imagenAsociadaAlUsuario);
          this.victoriasDeRondasDeLUsuario = this.usuariosActualDelDispositivo[0].victoriasRondas;
          this.derrotasDeRondasDeLUsuario = this.usuariosActualDelDispositivo[0].derrotasRondas;
          this.victoriaDePorcentajeDelUsuario = this.usuariosActualDelDispositivo[0].victoriaPorcentaje;


          this.userService.getUsuariosRanking()
            .subscribe(
              (data2) => { // Success
                this.usuariosRankingPosicion = data2;
                // console.log(this.usuariosRankingPosicion);

                for (let i = 0; i < this.usuariosRankingPosicion.length; i++) {

                  if (this.usuariosRankingPosicion[i].nickname == this.nombreDelUsuario) {
                    this.posicionRanking = i + 1;
                    // console.log(this.posicionRanking);

                  }
                }
              },
              (error) => {
                console.error(error);
              }
            )

        },
        (error) => {
          console.error(error);
        }
      )
  }

  cambiarImagenAsociada() {
    this.navCtrl.push(ElegirImagenPage, {
      IDusuarioEnConcretoDeLaAplicacion: this.idDelUsuario
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }
  
  ionViewDidEnter() {
    // console.log(localStorage.getItem('nickUsuarioAplicacion'));
    this.userService.getUsuarioDelMovilUsando(localStorage.getItem('nickUsuarioAplicacion'))
      .subscribe(
        (data) => { // Success
          this.usuariosActualDelDispositivo = data;

          this.idDelUsuario = this.usuariosActualDelDispositivo[0].id;
          this.nombreDelUsuario = this.usuariosActualDelDispositivo[0].nickname;
          this.imagenAsociadaAlUsuario = this.usuariosActualDelDispositivo[0].imagenAsociada;
          // console.log(this.imagenAsociadaAlUsuario);
          this.victoriasDeRondasDeLUsuario = this.usuariosActualDelDispositivo[0].victoriasRondas;
          this.derrotasDeRondasDeLUsuario = this.usuariosActualDelDispositivo[0].derrotasRondas;
          this.victoriaDePorcentajeDelUsuario = this.usuariosActualDelDispositivo[0].victoriaPorcentaje;


          this.userService.getUsuariosRanking()
            .subscribe(
              (data2) => { // Success
                this.usuariosRankingPosicion = data2;
                // console.log(this.usuariosRankingPosicion);

                for (let i = 0; i < this.usuariosRankingPosicion.length; i++) {

                  if (this.usuariosRankingPosicion[i].nickname == this.nombreDelUsuario) {
                    this.posicionRanking = i + 1;
                    // console.log(this.posicionRanking);

                  }
                }
              },
              (error) => {
                console.error(error);
              }
            )

        },
        (error) => {
          console.error(error);
        }
      )
  }

}
