import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-rondas',
  templateUrl: 'rondas.html',
})
export class RondasPage {

  static instancia: any;
  static intervaloTiempo: any;
  static intervaloTiempo2: any;

  IDusuarioEnConcretoDeLaAplicacion: any;
  IDUsuarioContrincante: any;
  IdSalaAsignadaEnConjunto: any;
  IdDeLaPreguntaJugada: any;
  LapreguntaQueSeHaJugadoEs: any;

  usuarioEnConcretoDeLaAplicacion: any;
  backusuarioEnConcretoDeLaAplicacion:any;
  usuarioContrincanteDeLaAplicacion: any;
  RespuestasDelBotonRevelarRespuestas: any;

  public ARRAYRespuestasDelBotonRevelarRespuestas = [];
  preguntaRevelarRespuesta: any = '';
  messageRevelarRespuesta: any = '';

  public pregunta: any;

  public NombreDelUsuario1: any;
  public NombreDelUsuario2: any;

  public ImagenDelUsuario1: any = "imagen0";
  public ImagenDelUsuario2: any = "imagen0";


  public ResultadoDelUsuario1: any;
  public ResultadoDelUsuario2: any;

  public VictoriasDelUsuario1: any;
  public VictoriasDelUsuario2: any;


  public DerrotasDelUsuario1: any;
  public DerrotasDelUsuario2: any;


  public PorcentajeDeVictoriaDelUsuario1: any;
  public PorcentajeDeVictoriaDelUsuario2: any;

  public now: any;
  public year: any;
  public month: any;
  public day: any;
  public hour: any;
  public minute: any;
  public second: any;

  public fechaActualDeHoy: any;
  public FORMATEADALAfechaActualDeHoy: any;
  public ARRAYRespuestasEscritasDelUsuario1 = [];
  public ARRAYRespuestasEscritasDelUsuario2 = [];

  public RespuestasEscritasDelUsuario1: any = '';
  public RespuestasEscritasDelUsuario2: any = '';

  public ARRAYIconosDeRespuestasEscritasDelUsuario1 = [];
  public ARRAYIconosDeRespuestasEscritasDelUsuario2 = [];

  public IconosDeRespuestasEscritasDelUsuario1: any = '';
  public IconosDeRespuestasEscritasDelUsuario2: any = '';


  public arraygeneral = [];
  public arraygeneralOtro = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public userService: UserServiceProvider, public alertCtrl: AlertController) {
    this.IDusuarioEnConcretoDeLaAplicacion = navParams.get('IDusuarioEnConcretoDeLaAplicacion');
    this.IDUsuarioContrincante = navParams.get('IDUsuarioContrincante');
    this.IdSalaAsignadaEnConjunto = navParams.get('IdSalaAsignadaEnConjunto');
    this.IdDeLaPreguntaJugada = navParams.get('IdDeLaPreguntaJugada');
    this.LapreguntaQueSeHaJugadoEs = navParams.get('LapreguntaQueSeHaJugadoEs');
    // console.log("El usuario contrincante tengo su ID:" + this.IDUsuarioContrincante);

    RondasPage.instancia = this;

    RondasPage.intervaloTiempo = setTimeout(function () { RondasPage.instancia.ejecutarCodigoParaResultado(); }, 1);


  }

  revelarRespuestas() {
    // console.log('la pregunta asignada fue' + this.IdDeLaPreguntaJugada);
    // console.log("entro a la funcion");
    this.preguntaRevelarRespuesta = '';
    this.messageRevelarRespuesta = '';
    this.userService.relevarRespuestasDeLaPreguntaJugada(this.IdDeLaPreguntaJugada)
      .subscribe(
        (data3) => {

          this.RespuestasDelBotonRevelarRespuestas = data3;
          // console.log("asigno todo lo que me devuelve la peticion y lo muestro a continuacion");
          // console.log(this.RespuestasDelBotonRevelarRespuestas);

          this.preguntaRevelarRespuesta = this.RespuestasDelBotonRevelarRespuestas[0].pregunta;

          // console.log(this.preguntaRevelarRespuesta);

          this.ARRAYRespuestasDelBotonRevelarRespuestas = this.RespuestasDelBotonRevelarRespuestas[0].respuesta.split(",");

          // console.log(this.ARRAYRespuestasDelBotonRevelarRespuestas);

          this.messageRevelarRespuesta += '<ul class="listadoRespuestasReveladas">';
          for (let i = 0; i < this.ARRAYRespuestasDelBotonRevelarRespuestas.length; i++) {

            this.messageRevelarRespuesta += '<li class="ContenidoDeLosLiEnRespuestasReveladas">' + this.ARRAYRespuestasDelBotonRevelarRespuestas[i] + '</li>';

          }
          this.messageRevelarRespuesta += '</ul>';
          // console.log(this.messageRevelarRespuesta);

          let alert = this.alertCtrl.create({
            title: this.preguntaRevelarRespuesta,
            message: this.messageRevelarRespuesta,
            buttons: ['Ok']
          });

          alert.present();

        },
        (error) => {
          console.error(error);
        }
      )
  }

  ejecutarCodigoParaResultado() {
    this.userService.getUsuarioDelMovilUsandoPorId(this.IDusuarioEnConcretoDeLaAplicacion)
      .subscribe(
        (data) => { // Success
          this.usuarioEnConcretoDeLaAplicacion = data;
          this.NombreDelUsuario1 = this.usuarioEnConcretoDeLaAplicacion[0].nickname;
          this.ResultadoDelUsuario1 = this.usuarioEnConcretoDeLaAplicacion[0].contadorTemporalDeAciertos;
          this.ImagenDelUsuario1 = this.usuarioEnConcretoDeLaAplicacion[0].imagenAsociada;

          this.VictoriasDelUsuario1 = this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas;
          this.DerrotasDelUsuario1 = this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas;

          this.RespuestasEscritasDelUsuario1 = this.usuarioEnConcretoDeLaAplicacion[0].respuestasDelUsuarioTemporal;
          this.IconosDeRespuestasEscritasDelUsuario1 = this.usuarioEnConcretoDeLaAplicacion[0].IconosDeRespuestasDelUsuarioTemporal;

          this.ARRAYRespuestasEscritasDelUsuario1 = this.RespuestasEscritasDelUsuario1.split(",");
          // console.log(this.ARRAYRespuestasEscritasDelUsuario1);

          this.ARRAYIconosDeRespuestasEscritasDelUsuario1 = this.IconosDeRespuestasEscritasDelUsuario1.split(",");
          // console.log(this.ARRAYIconosDeRespuestasEscritasDelUsuario1);


          // console.log("AQUI ESTOY TESTEANDO 1");
          for (let i = 0; i < this.ARRAYRespuestasEscritasDelUsuario1.length; i++) {

            for (let j = 0; j < this.ARRAYIconosDeRespuestasEscritasDelUsuario1.length; j++) {

              var objeto = { respuesta: this.ARRAYRespuestasEscritasDelUsuario1[i], icono: this.ARRAYIconosDeRespuestasEscritasDelUsuario1[i] };

            }
            this.arraygeneral.push(objeto);
          }
          // console.log(this.arraygeneral);



          this.userService.getUsuarioDelMovilUsandoPorId(this.IDUsuarioContrincante)
            .subscribe(
              (data2) => { // Success
                this.usuarioContrincanteDeLaAplicacion = data2;
                this.NombreDelUsuario2 = this.usuarioContrincanteDeLaAplicacion[0].nickname;
                this.ResultadoDelUsuario2 = this.usuarioContrincanteDeLaAplicacion[0].contadorTemporalDeAciertos;
                this.ImagenDelUsuario2 = this.usuarioContrincanteDeLaAplicacion[0].imagenAsociada;

                this.VictoriasDelUsuario2 = this.usuarioContrincanteDeLaAplicacion[0].victoriasRondas;
                this.DerrotasDelUsuario2 = this.usuarioContrincanteDeLaAplicacion[0].derrotasRondas;

                this.RespuestasEscritasDelUsuario2 = this.usuarioContrincanteDeLaAplicacion[0].respuestasDelUsuarioTemporal;
                this.IconosDeRespuestasEscritasDelUsuario2 = this.usuarioContrincanteDeLaAplicacion[0].IconosDeRespuestasDelUsuarioTemporal;

                this.ARRAYRespuestasEscritasDelUsuario2 = this.RespuestasEscritasDelUsuario2.split(",");
                // console.log(this.ARRAYRespuestasEscritasDelUsuario2);

                this.ARRAYIconosDeRespuestasEscritasDelUsuario2 = this.IconosDeRespuestasEscritasDelUsuario2.split(",");
                // console.log(this.ARRAYIconosDeRespuestasEscritasDelUsuario2);


                // console.log("AQUI ESTOY TESTEANDO 2");
                for (let z = 0; z < this.ARRAYRespuestasEscritasDelUsuario2.length; z++) {

                  for (let x = 0; x < this.ARRAYIconosDeRespuestasEscritasDelUsuario2.length; x++) {

                    var objetoOtro = { respuestaOtro: this.ARRAYRespuestasEscritasDelUsuario2[z], iconoOtro: this.ARRAYIconosDeRespuestasEscritasDelUsuario2[z] };

                  }
                  this.arraygeneralOtro.push(objetoOtro);
                }
                // console.log(this.arraygeneralOtro);


                RondasPage.intervaloTiempo2 = setTimeout(function () {
                  //PARA SACAR AL GANADOR Y SUMARLE UNA VICTORIA DE RONDA
                  RondasPage.instancia.fechaActualDeHoy = new Date();
                  // RondasPage.instancia.FORMATEADALAfechaActualDeHoy = RondasPage.instancia.fechaActualDeHoy.getDate() + '/' + (RondasPage.instancia.fechaActualDeHoy.getMonth() + 1) + '/' + RondasPage.instancia.fechaActualDeHoy.getFullYear();
                  RondasPage.instancia.FORMATEADALAfechaActualDeHoy = RondasPage.instancia.js_yyyy_mm_dd_hh_mm_ss();

                  // console.log("ANTES DE EJECUTAR REGISTRAR PARTIDA 1");
                  // console.log("IdUsuarioAplicacion:" + RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].id);
                  // console.log("IdUsuarioContrincante:" + RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].id);
                  // console.log("NICKNAMEUsuarioContrincante:" + RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].nickname);
                  // console.log("IMAGEN asociada de UsuarioContrincante:" + RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].imagenAsociada);
                  // console.log("Estado de la Partida:" + 'VICTORIA');
                  // console.log("Estado de la Partida:" + 'Ganaste');
                  // console.log("Contador De Respuestas UsuarioAplicacion:" + RondasPage.instancia.ResultadoDelUsuario1);
                  // console.log("Contador De Respuestas Usuario CONTRINCANTE:" + RondasPage.instancia.ResultadoDelUsuario2);
                  // console.log("rescatar la fecha actual:" + RondasPage.instancia.FORMATEADALAfechaActualDeHoy);

                  if (RondasPage.instancia.ResultadoDelUsuario1 > RondasPage.instancia.ResultadoDelUsuario2) {
                    RondasPage.instancia.userService.registrarPartida(
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].id,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].id,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].nickname,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].imagenAsociada,
                      'VICTORIA',
                      'Ganaste',
                      RondasPage.instancia.ResultadoDelUsuario1,
                      RondasPage.instancia.ResultadoDelUsuario2,
                      RondasPage.instancia.FORMATEADALAfechaActualDeHoy);
                  } else if (RondasPage.instancia.ResultadoDelUsuario1 < RondasPage.instancia.ResultadoDelUsuario2) {
                    RondasPage.instancia.userService.registrarPartida(
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].id,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].id,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].nickname,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].imagenAsociada,
                      'DERROTA',
                      'Perdiste',
                      RondasPage.instancia.ResultadoDelUsuario1,
                      RondasPage.instancia.ResultadoDelUsuario2,
                      RondasPage.instancia.FORMATEADALAfechaActualDeHoy);
                  }

                  if (RondasPage.instancia.ResultadoDelUsuario1 > RondasPage.instancia.ResultadoDelUsuario2) {


                    RondasPage.instancia.VictoriasDelUsuario1 = parseInt(RondasPage.instancia.VictoriasDelUsuario1) + 1;
                    // RondasPage.instancia.DerrotasDelUsuario1 = parseInt(RondasPage.instancia.DerrotasDelUsuario1) + 1;


                    RondasPage.instancia.PorcentajeDeVictoriaDelUsuario1 = (100 / (parseInt(RondasPage.instancia.VictoriasDelUsuario1) + parseInt(RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas))) * parseInt(RondasPage.instancia.VictoriasDelUsuario1);

                    RondasPage.instancia.DerrotasDelUsuario2 = parseInt(RondasPage.instancia.DerrotasDelUsuario2) + 1;

                    RondasPage.instancia.PorcentajeDeVictoriaDelUsuario2 = (100 / (parseInt(RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].victoriasRondas) + parseInt(RondasPage.instancia.DerrotasDelUsuario2))) * parseInt(RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].victoriasRondas);

                    RondasPage.instancia.userService.cambiarElEstadoDeConectadoDelUsuario(
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].id,
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].nickname,
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].imagenAsociada,
                      RondasPage.instancia.VictoriasDelUsuario1,
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
                      RondasPage.instancia.PorcentajeDeVictoriaDelUsuario1.toFixed(2),
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].sala,
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].idContrincante,
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].ocupado,
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].IdAsignacionDePregunta,
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].contadorTemporalDeAciertos,
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].respuestasDelUsuarioTemporal,
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].IconosDeRespuestasDelUsuarioTemporal
                    );

                    RondasPage.instancia.userService.cambiarElEstadoDeConectadoDelUsuario(
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].id,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].nickname,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].imagenAsociada,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].victoriasRondas,
                      RondasPage.instancia.DerrotasDelUsuario2,
                      RondasPage.instancia.PorcentajeDeVictoriaDelUsuario2.toFixed(2),
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].sala,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].idContrincante,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].ocupado,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].IdAsignacionDePregunta,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].contadorTemporalDeAciertos,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].respuestasDelUsuarioTemporal,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].IconosDeRespuestasDelUsuarioTemporal
                    );

                  } else if (RondasPage.instancia.ResultadoDelUsuario1 == RondasPage.instancia.ResultadoDelUsuario2) {

                    RondasPage.instancia.userService.cambiarElEstadoDeConectadoDelUsuario(
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].id,
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].nickname,
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].imagenAsociada,
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
                      RondasPage.instancia.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
                      0,
                      0,
                      0,
                      0,
                      0,
                      '',
                      ''
                    );

                    RondasPage.instancia.userService.cambiarElEstadoDeConectadoDelUsuario(
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].id,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].nickname,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].imagenAsociada,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].victoriasRondas,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].derrotasRondas,
                      RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].victoriaPorcentaje,
                      0,
                      0,
                      0,
                      0,
                      0,
                      '',
                      ''
                    );

                  }

                  // FIN DE DAR LA VICTORIA DE RONDA AL JUGADOR Y RESTABLECER TODOS LOS VALORES 
                }, 1000);


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
  ionViewDidLoad() {
    console.log('ionViewDidLoad RondasPage');
  }

  js_yyyy_mm_dd_hh_mm_ss() {
    this.now = new Date();
    this.year = "" + this.now.getFullYear();
    this.month = "" + (this.now.getMonth() + 1); if (this.month.length == 1) { this.month = "0" + this.month; }
    this.day = "" + this.now.getDate(); if (this.day.length == 1) { this.day = "0" + this.day; }
    this.hour = "" + this.now.getHours(); if (this.hour.length == 1) { this.hour = "0" + this.hour; }
    this.minute = "" + this.now.getMinutes(); if (this.minute.length == 1) { this.minute = "0" + this.minute; }
    this.second = "" + this.now.getSeconds(); if (this.second.length == 1) { this.second = "0" + this.second; }
    return this.year + "-" + this.month + "-" + this.day + " " + this.hour + ":" + this.minute + ":" + this.second;
  }

  ngOnDestroy() {
    this.userService.getUsuarioDelMovilUsandoPorId(this.IDusuarioEnConcretoDeLaAplicacion)
      .subscribe(
        (data30) => { // Success
          this.backusuarioEnConcretoDeLaAplicacion = data30;

          RondasPage.instancia.userService.cambiarElEstadoDeConectadoDelUsuario(
            RondasPage.instancia.backusuarioEnConcretoDeLaAplicacion[0].id,
            RondasPage.instancia.backusuarioEnConcretoDeLaAplicacion[0].nickname,
            RondasPage.instancia.backusuarioEnConcretoDeLaAplicacion[0].imagenAsociada,
            RondasPage.instancia.backusuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
            RondasPage.instancia.backusuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
            RondasPage.instancia.backusuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
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

    // RondasPage.instancia.userService.cambiarElEstadoDeConectadoDelUsuario(
    //   RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].id,
    //   RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].nickname,
    //   RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].imagenAsociada,
    //   RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].victoriasRondas,
    //   RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].derrotasRondas,
    //   RondasPage.instancia.usuarioContrincanteDeLaAplicacion[0].victoriaPorcentaje,
    //   0,
    //   0,
    //   0,
    //   0,
    //   0,
    //   '',
    //   ''
    // );


  }
}
