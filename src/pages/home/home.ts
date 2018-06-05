import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { JugarOnlinePage } from '../jugar-online/jugar-online';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  static intervaloTiempo: any;
  cargando: any;
  usuarioEnConcretoDeLaAplicacion: any;
  usuarioEnConcretoDeLaAplicacion2: any;
  usuarioEnConcretoDeLaAplicacionPartidas: any;
  usuarioEnCONTRINCANTEDeLaAplicacionPartidas: any;
  ultimasTresPartidasSacadas: any;
  imagenDelUsuarioContrincante: any

  static instancia: any;
  static noEjecutarParte2: any;

  salaNoOcupada: any;
  esperandoSalaParaRellenar: any;
  clickado: number = 0;
  noEjecutarParte2: number = 0;

  numeroRandom: any;

  invisibleElBotonDeCancelar: any;
  invisibleElBotonDeJugar: any;
  cargandoFinalizadas: any = "none";

  idUsuario: any;
  entradoPorPrimeraVez:any = 0;
  constructor(public navCtrl: NavController, public userService: UserServiceProvider, public alertCtrl: AlertController) {
    this.invisibleElBotonDeCancelar = 'none';
    this.invisibleElBotonDeJugar = 'block';
    this.cargando = "none";
    this.clickado = 0;
    HomePage.instancia = this;
    HomePage.noEjecutarParte2 = 0;

    setTimeout(function () {
      HomePage.instancia.userService.getUsuarioDelMovilUsando(localStorage.getItem('nickUsuarioAplicacion'))
        .subscribe(
          (data10) => {

            HomePage.instancia.usuarioEnConcretoDeLaAplicacionPartidas = data10;
            // console.log(HomePage.instancia.usuarioEnConcretoDeLaAplicacionPartidas[0].id);
            HomePage.instancia.idUsuario = HomePage.instancia.usuarioEnConcretoDeLaAplicacionPartidas[0].id;
            HomePage.instancia.ejecutarCodigoParaUltimasPartidas();

            HomePage.instancia.userService.cambiarElEstadoDeConectadoDelUsuario(
              HomePage.instancia.usuarioEnConcretoDeLaAplicacionPartidas[0].id,
              HomePage.instancia.usuarioEnConcretoDeLaAplicacionPartidas[0].nickname,
              HomePage.instancia.usuarioEnConcretoDeLaAplicacionPartidas[0].imagenAsociada,
              HomePage.instancia.usuarioEnConcretoDeLaAplicacionPartidas[0].victoriasRondas,
              HomePage.instancia.usuarioEnConcretoDeLaAplicacionPartidas[0].derrotasRondas,
              HomePage.instancia.usuarioEnConcretoDeLaAplicacionPartidas[0].victoriaPorcentaje,
              0,
              0,
              0,
              0,
              0,
              '',
              ''
            );

          },
          (error) => {
            console.error(error);
          }
        )
    }, 1200);
  }

  ejecutarCodigoParaUltimasPartidas() {

    HomePage.instancia.userService.obtenerTresUltimasPartidas(HomePage.instancia.idUsuario)
      .subscribe(
        (data11) => {
          HomePage.instancia.ultimasTresPartidasSacadas = data11;
          // console.log(HomePage.instancia.ultimasTresPartidasSacadas);
          if (HomePage.instancia.ultimasTresPartidasSacadas.length >= 1) {
            HomePage.instancia.cargandoFinalizadas = "block";
          } else {
            HomePage.instancia.cargandoFinalizadas = "none";
          }

        },
        (error) => {
          console.error(error);
        }
      )
  }

  ionViewDidEnter() {
    setTimeout(function () { HomePage.instancia.ejecutarCodigoParaUltimasPartidas(); }, 1200);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  getNumeroRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  cancelarOnline() {
    this.invisibleElBotonDeCancelar = 'none';
    this.invisibleElBotonDeJugar = 'block';
    this.cargando = "none";
    HomePage.noEjecutarParte2 = 0;
    this.clickado = 0;
    clearInterval(HomePage.intervaloTiempo);

    this.userService.getUsuarioDelMovilUsando(localStorage.getItem('nickUsuarioAplicacion'))
      .subscribe(
        (data5) => {
          this.usuarioEnConcretoDeLaAplicacion = data5;

          this.userService.cambiarElEstadoDeConectadoDelUsuario(
            this.usuarioEnConcretoDeLaAplicacion[0].id,
            this.usuarioEnConcretoDeLaAplicacion[0].nickname,
            this.usuarioEnConcretoDeLaAplicacion[0].imagenAsociada,
            this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
            this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
            this.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
            0,
            0,
            0,
            0,
            0,
            '',
            ''
          );
        },
        (error) => {
          console.error(error);
        }
      )
  }
  buscarSalaYsiHayLoMandoAjugarYsiNoLeAsignoSala() {
    HomePage.noEjecutarParte2 = 0;
    this.clickado = 0;
    // console.log("Estoy dentro de clickado a 0 y clickado está en: " + this.clickado);

    this.userService.getUsuarioDelMovilUsando(localStorage.getItem('nickUsuarioAplicacion'))
      .subscribe(
        (data) => {
          this.usuarioEnConcretoDeLaAplicacion = data;
          // console.log("ESTE ES EL USUARIO DE LA APLICACION " + this.usuarioEnConcretoDeLaAplicacion[0].nickname);

          this.userService.buscarSalaNoOcupada(this.usuarioEnConcretoDeLaAplicacion[0].id)
            .subscribe(
              (data2) => {

                this.salaNoOcupada = data2;
                // console.log("La sala no ocupada del ususario es: " + this.salaNoOcupada[0].sala);
                if (this.salaNoOcupada[0] != null && this.salaNoOcupada.length == 1 && this.entradoPorPrimeraVez == 0) {
                  // console.log(this.salaNoOcupada);
                  // console.log(this.salaNoOcupada.length);
                  this.entradoPorPrimeraVez = 1;
                  HomePage.noEjecutarParte2 = 1;
                  //sala no ocupada que se le va a asignar al usuario para posteriormente mandarlos a partida
                  // console.log(this.salaNoOcupada[0].sala);
                  this.userService.cambiarElEstadoDeConectadoDelUsuario(
                    this.usuarioEnConcretoDeLaAplicacion[0].id,
                    this.usuarioEnConcretoDeLaAplicacion[0].nickname,
                    this.usuarioEnConcretoDeLaAplicacion[0].imagenAsociada,
                    this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
                    this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
                    this.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
                    this.salaNoOcupada[0].sala,
                    this.salaNoOcupada[0].id,
                    1,
                    this.usuarioEnConcretoDeLaAplicacion[0].IdAsignacionDePregunta,
                    this.usuarioEnConcretoDeLaAplicacion[0].contadorTemporalDeAciertos,
                    this.usuarioEnConcretoDeLaAplicacion[0].respuestasDelUsuarioTemporal,
                    this.usuarioEnConcretoDeLaAplicacion[0].IconosDeRespuestasDelUsuarioTemporal
                  );

                  // console.log("He enviado a los jugadores a la partida 1");
                  this.cargando = "none";
                  this.invisibleElBotonDeCancelar = 'none';
                  this.invisibleElBotonDeJugar = 'block';
                  this.navCtrl.push(JugarOnlinePage, {
                    IDusuarioEnConcretoDeLaAplicacion: this.usuarioEnConcretoDeLaAplicacion[0].id,
                    IDUsuarioContrincante: this.salaNoOcupada[0].id,
                    IdSalaAsignadaEnConjunto: this.salaNoOcupada[0].sala
                  });

                } else {
                  this.userService.cambiarElEstadoDeConectadoDelUsuario(
                    this.usuarioEnConcretoDeLaAplicacion[0].id,
                    this.usuarioEnConcretoDeLaAplicacion[0].nickname,
                    this.usuarioEnConcretoDeLaAplicacion[0].imagenAsociada,
                    this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
                    this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
                    this.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
                    this.usuarioEnConcretoDeLaAplicacion[0].id,
                    this.usuarioEnConcretoDeLaAplicacion[0].idContrincante,
                    this.usuarioEnConcretoDeLaAplicacion[0].ocupado,
                    this.usuarioEnConcretoDeLaAplicacion[0].IdAsignacionDePregunta,
                    this.usuarioEnConcretoDeLaAplicacion[0].contadorTemporalDeAciertos,
                    this.usuarioEnConcretoDeLaAplicacion[0].respuestasDelUsuarioTemporal,
                    this.usuarioEnConcretoDeLaAplicacion[0].IconosDeRespuestasDelUsuarioTemporal
                  );
                  console.log("Esperando a que otro usuario se una a la partida");
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



  jugarOnline() {
    this.invisibleElBotonDeJugar = 'none';
    this.invisibleElBotonDeCancelar = 'block';
    this.cargando = "block";
    this.clickado = 0;
    this.entradoPorPrimeraVez = 0;

    if (this.clickado == 0) {
      // console.log("He entrado a clickado 0 y el clickado está en:  " + this.clickado);
      this.buscarSalaYsiHayLoMandoAjugarYsiNoLeAsignoSala();

      HomePage.intervaloTiempo = setInterval(function () { HomePage.instancia.UnaVezAsignadaUnaSalaAntesBuscaSiSeLeUneAlgunaUsuarioAsuSala(); }, 900);

    }
  }


  UnaVezAsignadaUnaSalaAntesBuscaSiSeLeUneAlgunaUsuarioAsuSala() {
    this.userService.getUsuarioDelMovilUsando(localStorage.getItem('nickUsuarioAplicacion'))
      .subscribe(
        (data3) => {
          this.usuarioEnConcretoDeLaAplicacion2 = data3;

          this.userService.esperarAsalaCompleta(this.usuarioEnConcretoDeLaAplicacion2[0].sala, this.usuarioEnConcretoDeLaAplicacion2[0].id)
            .subscribe(
              (data4) => {

                this.esperandoSalaParaRellenar = data4;
                // console.log(this.esperandoSalaParaRellenar[0]);
                if (HomePage.noEjecutarParte2 == 1) {
                  clearInterval(HomePage.intervaloTiempo);
                }
                if (this.esperandoSalaParaRellenar.length > 1 && HomePage.noEjecutarParte2 == 0) {

                  console.log("Te estas colando MAMON");
                  this.userService.cambiarElEstadoDeConectadoDelUsuario(
                    this.usuarioEnConcretoDeLaAplicacion2[0].id,
                    this.usuarioEnConcretoDeLaAplicacion2[0].nickname,
                    this.usuarioEnConcretoDeLaAplicacion2[0].imagenAsociada,
                    this.usuarioEnConcretoDeLaAplicacion2[0].victoriasRondas,
                    this.usuarioEnConcretoDeLaAplicacion2[0].derrotasRondas,
                    this.usuarioEnConcretoDeLaAplicacion2[0].victoriaPorcentaje,
                    this.usuarioEnConcretoDeLaAplicacion2[0].id,
                    0,
                    0,
                    this.usuarioEnConcretoDeLaAplicacion2[0].IdAsignacionDePregunta,
                    this.usuarioEnConcretoDeLaAplicacion2[0].contadorTemporalDeAciertos,
                    this.usuarioEnConcretoDeLaAplicacion2[0].respuestasDelUsuarioTemporal,
                    this.usuarioEnConcretoDeLaAplicacion2[0].IconosDeRespuestasDelUsuarioTemporal
                  );

                }else if (this.esperandoSalaParaRellenar.length == 1 && HomePage.noEjecutarParte2 == 0) {

                  clearInterval(HomePage.intervaloTiempo);

                  // console.log(this.esperandoSalaParaRellenar);
                  // console.log(this.esperandoSalaParaRellenar.length);
                  // console.log("He enviado a los jugadores a la partida 2");

                  this.userService.cambiarElEstadoDeConectadoDelUsuario(
                    this.usuarioEnConcretoDeLaAplicacion2[0].id,
                    this.usuarioEnConcretoDeLaAplicacion2[0].nickname,
                    this.usuarioEnConcretoDeLaAplicacion2[0].imagenAsociada,
                    this.usuarioEnConcretoDeLaAplicacion2[0].victoriasRondas,
                    this.usuarioEnConcretoDeLaAplicacion2[0].derrotasRondas,
                    this.usuarioEnConcretoDeLaAplicacion2[0].victoriaPorcentaje,
                    this.esperandoSalaParaRellenar[0].sala,
                    this.esperandoSalaParaRellenar[0].id,
                    1,
                    this.usuarioEnConcretoDeLaAplicacion2[0].IdAsignacionDePregunta,
                    this.usuarioEnConcretoDeLaAplicacion2[0].contadorTemporalDeAciertos,
                    this.usuarioEnConcretoDeLaAplicacion2[0].respuestasDelUsuarioTemporal,
                    this.usuarioEnConcretoDeLaAplicacion2[0].IconosDeRespuestasDelUsuarioTemporal
                  );

                  if (this.entradoPorPrimeraVez == 0 && this.usuarioEnConcretoDeLaAplicacion2[0].id == this.esperandoSalaParaRellenar[0].idContrincante && this.usuarioEnConcretoDeLaAplicacion2[0].IdAsignacionDePregunta == this.esperandoSalaParaRellenar[0].IdAsignacionDePregunta) {
                    this.entradoPorPrimeraVez = 1;
                    this.cargando = "none";
                    this.invisibleElBotonDeCancelar = 'none';
                    this.invisibleElBotonDeJugar = 'block';
                    this.clickado = 0;
                    this.navCtrl.push(JugarOnlinePage, {
                      IDusuarioEnConcretoDeLaAplicacion: this.usuarioEnConcretoDeLaAplicacion2[0].id,
                      IDUsuarioContrincante: this.esperandoSalaParaRellenar[0].id,
                      IdSalaAsignadaEnConjunto: this.esperandoSalaParaRellenar[0].sala
                    });
                  }


                } else if (this.esperandoSalaParaRellenar[0] == undefined) {
                  console.log("Aún no se ha llenado la sala");
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

