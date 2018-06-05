import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-sugerir-categoria',
  templateUrl: 'sugerir-categoria.html',
})
export class SugerirCategoriaPage {

  formularioSugerirCategoria: FormGroup;
  usuariosConSusComentarios: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public userService: UserServiceProvider, public alertCtrl: AlertController) {
    this.formularioSugerirCategoria = this.crearFormularioDeSugerirCategoria();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SugerirCategoriaPage');
  }

  guardarConsultaDeSugerirCategoria() {
    try {
      console.log(this.formularioSugerirCategoria.value);
      console.log(this.formularioSugerirCategoria.value.comentario);
      this.userService.enviarSugerenciaDeCategoria(this.formularioSugerirCategoria.value.comentario);
      let alert = this.alertCtrl.create({
        title: 'Ha sido enviado el mensaje',
        subTitle: '¡Gracias por colaborar!',
        buttons: ['Ok']
      });
      this.navCtrl.pop();
      alert.present();
      this.formularioSugerirCategoria = this.crearFormularioDeSugerirCategoria();
    } catch (error) {
      console.log(error);
    }
  }

  private crearFormularioDeSugerirCategoria() {
    return this.formBuilder.group({
      comentario: ['', Validators.required],
    });
  }

}
