import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
  }
  getUsers() {
    try {
      return this.http.get('http://s613391694.mialojamiento.es/Slim/index.php/obtenerUsuarios');
    } catch (error) {
      console.log(error);
    }

  }

  postDatos(nicknameUsuario) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { nickname: nicknameUsuario, imagenAsociada: 'imagen0', victoriasRondas: '0', derrotasRondas: '0', victoriaPorcentaje: '0', sala:'0', idContrincante:0, ocupado:'0', IdAsignacionDePregunta:'0',contadorTemporalDeAciertos:'0', respuestasDelUsuarioTemporal: '', IconosDeRespuestasDelUsuarioTemporal: '' }
      // console.log(datos);
      // console.log(JSON.stringify(datos));
      var url = 'http://s613391694.mialojamiento.es/Slim/index.php/nuevoUsuario';
      return new Promise(resolve => {
        this.http.post(url, JSON.stringify(datos), httpOptions)
          .subscribe(data => {
            resolve(data);
            // console.log(data);
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.");
            }
          });
      });
     
    } catch (error) {
      console.log(error);
    }

  }

  getUsuariosRanking() {
    try { 
      return this.http.get('http://s613391694.mialojamiento.es/Slim/index.php/obtenerTodosUsuariosRanking');
    } catch (error) {
      console.log(error);
    }
  }

  getUsuarioDelMovilUsandoPorId(id) {
    try {
      return this.http.get('http://s613391694.mialojamiento.es/Slim/index.php/obtenerUsuariosEnConcreto/' + id);
    } catch (error) {
      console.log(error);
    }

  }

  getUsuarioDelMovilUsando(nickname) {
    try {
      return this.http.get('http://s613391694.mialojamiento.es/Slim/index.php/obtenerUsuariosEnConcretoPorNickName/' + nickname);
    } catch (error) {
      console.log(error);
    }

  }

  borrarUsuarioConfiguracion(id) {
    try {
      return this.http.delete('http://s613391694.mialojamiento.es/Slim/index.php/borrarUsuarioConfiguracion/' + id);
    } catch (error) {
      console.log(error);
    }
  }

  enviarSugerenciaDeCategoria(comentario) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { comentario: comentario }
      // console.log(datos);

      // console.log(JSON.stringify(datos));
      var url = 'http://s613391694.mialojamiento.es/Slim/index.php/enviarEmailSugerencias';
      return new Promise(resolve => {
        this.http.post(url, JSON.stringify(datos), httpOptions)
          .subscribe(data => {
            resolve(data);
            // console.log(data);
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.");
            }
          });
      });
    } catch (error) {
      console.log(error);
    }

  }
  enviarEmailDeContactarnos(nombre, email, comentario) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { nombre: nombre, email: email, comentario: comentario }
      // console.log(datos);

      // console.log(JSON.stringify(datos));
      var url = 'http://s613391694.mialojamiento.es/Slim/index.php/enviarEmailContactanos';
      return new Promise(resolve => {
        this.http.post(url, JSON.stringify(datos), httpOptions)
          .subscribe(data => {
            resolve(data);
            // console.log(data);
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.");
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  }
  // http://localhost:80
  cambiarNicknameDelUsuario(id, nickname, imagenAsociada, victoriasRondas, derrotasRondas, victoriaPorcentaje, sala, idContrincante, ocupado, IdAsignacionDePregunta, contadorTemporalDeAciertos, respuestasDelUsuarioTemporal, IconosDeRespuestasDelUsuarioTemporal) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { nickname: nickname, imagenAsociada: imagenAsociada, victoriasRondas: victoriasRondas, derrotasRondas: derrotasRondas, victoriaPorcentaje: victoriaPorcentaje, sala: sala, idContrincante: idContrincante, ocupado: ocupado, IdAsignacionDePregunta: IdAsignacionDePregunta, contadorTemporalDeAciertos: contadorTemporalDeAciertos, respuestasDelUsuarioTemporal: respuestasDelUsuarioTemporal, IconosDeRespuestasDelUsuarioTemporal: IconosDeRespuestasDelUsuarioTemporal }
      // console.log(datos);

      // console.log(JSON.stringify(datos));
      var url = 'http://s613391694.mialojamiento.es/Slim/index.php/cambiarNicknameDelUsuario/' + id;
      return new Promise(resolve => {
        this.http.put(url, JSON.stringify(datos), httpOptions)
          .subscribe(data => {
            resolve(data);
            // console.log(data);
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  getPreguntaAsignada(idSala) {
    try {
      return this.http.get('http://s613391694.mialojamiento.es/Slim/index.php/obtenerLaPreguntaAsignada/' + idSala);
    } catch (error) {
      console.log(error);
    }
  }

  obtenerLaPreguntaDefinitiva(idPregunta) {
    try {
      return this.http.get('http://s613391694.mialojamiento.es/Slim/index.php/obtenerLaPreguntaDefinitiva/' + idPregunta);
    } catch (error) {
      console.log(error);
    }
  }

  cambiarElEstadoDeConectadoDelUsuario(id, nickname, imagenAsociada, victoriasRondas, derrotasRondas, victoriaPorcentaje, sala,idContrincante, ocupado, IdAsignacionDePregunta, contadorTemporalDeAciertos, respuestasDelUsuarioTemporal, IconosDeRespuestasDelUsuarioTemporal) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { nickname: nickname, imagenAsociada: imagenAsociada, victoriasRondas: victoriasRondas, derrotasRondas: derrotasRondas, victoriaPorcentaje: victoriaPorcentaje, sala: sala, idContrincante: idContrincante, ocupado: ocupado, IdAsignacionDePregunta:IdAsignacionDePregunta, contadorTemporalDeAciertos: contadorTemporalDeAciertos, respuestasDelUsuarioTemporal: respuestasDelUsuarioTemporal, IconosDeRespuestasDelUsuarioTemporal: IconosDeRespuestasDelUsuarioTemporal }
      // console.log(datos);

      // console.log(JSON.stringify(datos));
      var url = 'http://s613391694.mialojamiento.es/Slim/index.php/cambiarElEstadoDeConectado/' + id;
      return new Promise(resolve => {
        this.http.put(url, JSON.stringify(datos), httpOptions)
          .subscribe(data => {
            resolve(data);
            // console.log(data);
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  buscarUsuarioDisponibleParaJugar(id) {
    try {
      return this.http.get('http://s613391694.mialojamiento.es/Slim/index.php/buscarUsuarioParaJugar/' + id);
    } catch (error) {
      console.log(error);
    }
  }

  buscandoTeniendoContrincanteYa(id) {
    try {
      return this.http.get('http://s613391694.mialojamiento.es/Slim/index.php/buscarTeniendoContrincanteYa/' + id);
    } catch (error) {
      console.log(error);
    }
  }

  buscarSalaNoOcupada(id) {
    try {
      return this.http.get('http://s613391694.mialojamiento.es/Slim/index.php/buscarSalaNoOcupada/' + id);
    } catch (error) {
      console.log(error);
    }
  }

  esperarAsalaCompleta(idSala,idUsuario) {
    try {
      return this.http.get('http://s613391694.mialojamiento.es/Slim/index.php/esperarAsalaCompleta/'+ idSala + '/'+ idUsuario);
    } catch (error) {
      console.log(error);
    }
  }

  relevarRespuestasDeLaPreguntaJugada(idPregunta) {
    try {
      return this.http.get('http://s613391694.mialojamiento.es/Slim/index.php/relevarRespuestasDeLaPreguntaJugada/'+ idPregunta);
    } catch (error) {
      console.log(error);
    }
  }

  obtenerImagenes() {
    try {
      return this.http.get('http://s613391694.mialojamiento.es/Slim/index.php/obtenerImagenes');
    } catch (error) {
      console.log(error);
    }
  }


  registrarPartida(idUsuario,idUsuarioContrincante,nicknameUsuarioContrincante,imagenUsuarioContrincante,EstadoDePartida,PalabraDelEstadoDeLaPartida,ContadorDelUsuarioAplicacion,ContadorDelUsuarioContrincante,fechaDeLaPartida) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { idUsuario: idUsuario,idUsuarioContrincante: idUsuarioContrincante,nicknameUsuarioContrincante: nicknameUsuarioContrincante,imagenUsuarioContrincante: imagenUsuarioContrincante, EstadoDePartida: EstadoDePartida,PalabraDelEstadoDeLaPartida: PalabraDelEstadoDeLaPartida, ContadorDelUsuarioAplicacion: ContadorDelUsuarioAplicacion, ContadorDelUsuarioContrincante: ContadorDelUsuarioContrincante, fechaDeLaPartida: fechaDeLaPartida}
      // console.log(datos);
      // console.log(JSON.stringify(datos));
      var url = 'http://s613391694.mialojamiento.es/Slim/index.php/registrarPartida';
      return new Promise(resolve => {
        this.http.post(url, JSON.stringify(datos), httpOptions)
          .subscribe(data => {
            resolve(data);
            // console.log(data);
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.");
            }
          });
      });
    } catch (error) {
      console.log(error);
    }

  }

  obtenerTresUltimasPartidas(idUsuarioAplicacion) {
    try {
      return this.http.get('http://s613391694.mialojamiento.es/Slim/index.php/cogerTresUltimasPartidas/'+ idUsuarioAplicacion);
    } catch (error) {
      console.log(error);
    }
  }

  comprobarPalabraIntroducida(idPregunta,RespuestaUsuario) {
    try {
      return this.http.get('http://s613391694.mialojamiento.es/Slim/index.php/comprobarPalabra/' + idPregunta +'/' +RespuestaUsuario);
    } catch (error) {
      console.log(error);
    }

  }
  
}
